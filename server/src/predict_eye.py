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

# Suppress specific warnings
warnings.filterwarnings("ignore", category=UserWarning, module='torch')
warnings.filterwarnings("ignore", category=FutureWarning, module='torch')
warnings.filterwarnings("ignore", category=UserWarning, module='google.protobuf.symbol_database')

categories = ['red', 'yellow', 'white', 'normal']

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


model = SimpleCNN()
# model.load_state_dict(torch.load('server/src/model/cnn.pth'))
model.load_state_dict(torch.load('src/model/cnn.pth', map_location=torch.device('cpu')))

model.eval()

device = torch.device("cpu")
model.to(device)


def preprocess_image(image_path):
    image = Image.open(image_path).convert('RGB')
    image = transform(image)
    image = image.unsqueeze(0)
    return image


def predict(image_path):
    image = preprocess_image(image_path).to(device)
    with torch.no_grad():
        outputs = model(image)
        _, predicted = torch.max(outputs, 1)
        return categories[predicted.item()]


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


def main(image_path):
    image = mp.Image.create_from_file(image_path)
    detection_result = detector.detect(image)

    if detection_result.face_landmarks:
        left_eye_image = draw_parts(image, detection_result, left_eye_landmarks_ids)
        cv2.imwrite('left_eye.png', left_eye_image)
        left_eye_prediction = predict('left_eye.png')
        print(f'Predicted label for left eye: {left_eye_prediction}')

        right_eye_image = draw_parts(image, detection_result, right_eye_landmarks_ids)
        cv2.imwrite('right_eye.png', right_eye_image)
        right_eye_prediction = predict('right_eye.png')
        print(f'Predicted label for right eye: {right_eye_prediction}')
    else:
        print("No face landmarks detected.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Predict eye color from an image.')
    parser.add_argument('image_path', type=str, help='Path to the input image')
    args = parser.parse_args()
    main(args.image_path)
