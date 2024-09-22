# PennApps_24f Tongue Analyzer

![Tongue Analyzer](/images/0.png)

## Project Description

We analyze tongue condition through a combination of visual inspection and data collection. Our application allows users to upload images of their tongues, which are then processed using advanced AI algorithms to assess various conditions. The analysis includes identifying color, texture, and other features that may indicate health issues. Additionally, users can provide information about their symptoms, which helps in generating a comprehensive report on their tongue health.

## Demo Video

[Insert link to your demo video here]

## Team Members

- Xinran Liu
- Kaijie Lai
- Chloe Yun
- Ho Lok Cheung

## Submission Track

[Specify the ONE track you're submitting to]

## Prizes

We're submitting for the following prizes:

- [Prize 1]
- [Prize 2]
- [Prize 3]

## Technologies Used

- Frontend: React.js
  1. Other: axios, crypto-js, react, react-dom, react-markdown, react-router-dom, react-scripts, react-webcam, web-vitals, webcam
- Backend: Node.js, Express.js
  1. Other: Axios, Multer, CORS, dotenv, body-parser, express, fs, nodemon, openai, path
- AI/ML: Pretrained Tongue Vision, GPT-4 Vision

## External Resources

- [Resource 1]: [Brief description and link]
- [Resource 2]: [Brief description and link]
- [Resource 3]: [Brief description and link]

## Setup Instructions

### 1. Frontend Setup

```bash
cd client && npm i && npm run start
```

### 2. Backend Setup

#### 2.1 Environment Configuration

Create a `.env` file in the server folder:

```bash
cd server
cp .env.example .env
```

Then add the following credentials to the `.env` file:

```
OLLAMA_HOST=
PROMPT=
OPENAI_API_KEY=
PORT=
SYSTEM_PROMPT=
```

#### 2.2 Start the Backend Server

```bash
cd server && npm i && npm run server
```

## Additional Information

- This project utilizes a microservices architecture, allowing for scalability and maintainability.
- The frontend is built using React.js, providing a dynamic user interface and a responsive experience.
- The backend is powered by Node.js and Express.js, ensuring efficient handling of requests and data processing.
- The application integrates with OpenAI's GPT-4 Vision for advanced AI capabilities, enhancing user interactions.
- Ensure that all dependencies are installed correctly to avoid runtime errors.
- For any issues, refer to the documentation of the respective libraries and frameworks used in this project.

## Shell script automation:

```
bash ./run.sh
```
