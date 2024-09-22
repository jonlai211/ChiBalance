import argparse
import cv2
import mediapipe as mp
import numpy as np
import torch
import torch.nn as nn
import torch.nn.functional as F
from PIL import Image
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from torchvision import transforms
import warnings
import json

# Load description mapping from JSON file
with open('src/map_predict.json', 'r', encoding='utf-8') as f:
    description_mapping = json.load(f)

# Suppress specific warnings
warnings.filterwarnings("ignore", category=UserWarning, module='torch')
warnings.filterwarnings("ignore", category=FutureWarning, module='torch')
warnings.filterwarnings("ignore", category=UserWarning, module='google.protobuf.symbol_database')

base_options = python.BaseOptions(model_asset_path='src/model/face_landmarker_v2_with_blendshapes.task')
options = vision.FaceLandmarkerOptions(base_options=base_options, output_face_blendshapes=True,
                                       output_facial_transformation_matrixes=True, num_faces=1)
detector = vision.FaceLandmarker.create_from_options(options)


def draw_parts(image, detection_result, landmark_indices):
    image_np = image.numpy_view()
    landmarks = detection_result.face_landmarks[0]
    image_height, image_width, _ = image_np.shape
    selected_landmarks = [(int(landmarks[idx].x * image_width), int(landmarks[idx].y * image_height)) for idx in
                          landmark_indices]
    mask = np.zeros(image_np.shape[:2], dtype=np.uint8)
    cv2.fillPoly(mask, [np.array(selected_landmarks, dtype=np.int32)], 255)
    extracted_region = cv2.bitwise_and(image_np, image_np, mask=mask)
    x, y, w, h = cv2.boundingRect(np.array(selected_landmarks, dtype=np.int32))
    cropped_region = extracted_region[y:y + h, x:x + w]
    cropped_region_bgr = cv2.cvtColor(cropped_region, cv2.COLOR_RGB2BGR)
    return cropped_region_bgr


left_eye_landmarks_ids = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
right_eye_landmarks_ids = [263, 249, 390, 373, 374, 380, 381, 382, 362, 398, 384, 385, 386, 387, 388, 466]
upper_lip_landmarks_ids = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 310, 311, 312, 12, 38, 41, 42, 78]
lower_lip_landmarks_ids = [178, 87, 14, 317, 402, 318, 324, 308, 292, 306, 291, 375, 321, 405, 314, 17]
left_cheek_landmarks_ids = [117, 118, 101, 36, 206, 216, 207, 187, 123]
right_check_landmarks_ids = [347, 346, 352, 411, 427, 436, 426, 266, 330]

eyes_categories = ['red', 'yellow', 'white', 'normal']
lips_categories = ['red', 'black', 'white', 'normal']
cheeks_categories = ['red', 'cyan', 'white', 'normal', 'yellow']

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])


class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2, padding=0)
        self.fc1 = nn.Linear(64 * 56 * 56, 512)
        self.fc2 = nn.Linear(512, 4)  # 4个类别

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 56 * 56)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x


class SimpleCNN_5(nn.Module):
    def __init__(self):
        super(SimpleCNN_5, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2, padding=0)
        self.fc1 = nn.Linear(64 * 56 * 56, 512)
        self.fc2 = nn.Linear(512, 5)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 64 * 56 * 56)
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x


eyes_model = SimpleCNN()
eyes_model.load_state_dict(torch.load('src/model/eyes_cnn.pth', map_location=torch.device('cpu')))
eyes_model.eval()

lips_model = SimpleCNN()
lips_model.load_state_dict(torch.load('src/model/lips_cnn.pth', map_location=torch.device('cpu')))
lips_model.eval()

cheeks_model = SimpleCNN_5()
cheeks_model.load_state_dict(torch.load('src/model/cheeks_cnn.pth', map_location=torch.device('cpu')))
cheeks_model.eval()

device = torch.device("cpu")
eyes_model.to(device)
lips_model.to(device)
cheeks_model.to(device)


def preprocess_image(image_path):
    image = Image.open(image_path).convert('RGB')
    image = transform(image)
    image = image.unsqueeze(0)
    return image


def predict(model, image_path, categories):
    image = preprocess_image(image_path).to(device)
    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
        return categories[predicted.item()]


def main(image_path):
    image = mp.Image.create_from_file(image_path)
    detection_result = detector.detect(image)

    results = []

    if detection_result.face_landmarks:
        left_eye_image = draw_parts(image, detection_result, left_eye_landmarks_ids)
        cv2.imwrite('left_eye.png', left_eye_image)
        left_eye_prediction = predict(eyes_model, 'left_eye.png', eyes_categories)
        results.append({
            "object": "left_eye",
            "label": left_eye_prediction,
            "description": description_mapping[f"eye_{left_eye_prediction}"]
        })

        right_eye_image = draw_parts(image, detection_result, right_eye_landmarks_ids)
        cv2.imwrite('right_eye.png', right_eye_image)
        right_eye_prediction = predict(eyes_model, 'right_eye.png', eyes_categories)
        results.append({
            "object": "right_eye",
            "label": right_eye_prediction,
            "description": description_mapping[f"eye_{right_eye_prediction}"]
        })

        upper_lip_image = draw_parts(image, detection_result, upper_lip_landmarks_ids)
        cv2.imwrite('upper_lip.png', upper_lip_image)
        upper_lip_prediction = predict(lips_model, 'upper_lip.png', lips_categories)
        results.append({
            "object": "upper_lip",
            "label": upper_lip_prediction,
            "description": description_mapping[f"lip_{upper_lip_prediction}"]
        })

        lower_lip_image = draw_parts(image, detection_result, lower_lip_landmarks_ids)
        cv2.imwrite('lower_lip.png', lower_lip_image)
        lower_lip_prediction = predict(lips_model, 'lower_lip.png', lips_categories)
        results.append({
            "object": "lower_lip",
            "label": lower_lip_prediction,
            "description": description_mapping[f"lip_{lower_lip_prediction}"]
        })

        left_cheek_image = draw_parts(image, detection_result, left_cheek_landmarks_ids)
        cv2.imwrite('left_cheek.png', left_cheek_image)
        left_cheek_prediction = predict(cheeks_model, 'left_cheek.png', cheeks_categories)
        results.append({
            "object": "left_cheek",
            "label": left_cheek_prediction,
            "description": description_mapping[f"cheek_{left_cheek_prediction}"]
        })

        right_cheek_image = draw_parts(image, detection_result, right_check_landmarks_ids)
        cv2.imwrite('right_cheek.png', right_cheek_image)
        right_cheek_prediction = predict(cheeks_model, 'right_cheek.png', cheeks_categories)
        results.append({
            "object": "right_cheek",
            "label": right_cheek_prediction,
            "description": description_mapping[f"cheek_{right_cheek_prediction}"]
        })
    else:
        results.append({
            "error": "No face landmarks detected."
        })

    print(json.dumps(results, ensure_ascii=False, indent=4))


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Predict from an face image.')
    parser.add_argument('image_path', type=str, help='Path to the input image')
    args = parser.parse_args()
    main(args.image_path)