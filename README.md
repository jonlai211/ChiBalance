# PennApps_ChiBalance

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

healthcare

## Prizes

We're submitting for the following prizes:

Most Creative Hack
Best use of defang
Best Use of Computer Vision (Sponsored by Roboflow)
Most Technically Complex Hack
Best Design
Best Hardware Hack
Best Next-Gen LLM-Powered Application (Sponsored by Tune)

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

# defang

# React & Node.js & PostgreSQL

[![1-click-deploy](https://defang.io/deploy-with-defang.png)](https://portal.defang.dev/redirect?url=https%3A%2F%2Fgithub.com%2Fnew%3Ftemplate_name%3Dsample-nodejs-react-postgres-template%26template_owner%3DDefangSamples)`

This sample project demonstrates how to deploy a full-stack application using React for the frontend, Node.js for the backend, and PostgreSQL for the database. The project uses Docker to containerize the services, making it easy to run in both development and production environments.

In this sample, we have set up the essential files you need to deploy in production using [Neon](https://neon.tech/) to host your database. We use a connection string to connect Neon to your code. By replacing the pre-configured connection string at .env and at the compose file to yours, you will be ready to deploy this sample with Neon.

## Essential Setup Files

1. Download [Defang CLI] (https://github.com/defang-io/defang)
2. (optional) If you are using [Defang BYOC] (https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html) authenticated your AWS account.
3. (optional for local development) [Docker CLI] (https://docs.docker.com/engine/install/)

## Development

To start the development environment, run `docker compose -f ./compose.yaml -f ./compose.dev.yaml up`. This will start the Postgres container, the React container, and the NodeJS container. The development container (compose.dev.yaml) will override the production container (compose.yaml).

Or run without using Docker by doing the following:

1. run npm install to install the nodejs dependencies in both the `client` directory and the `server` directory
2. create or modify the .env file in both the `client` directory and the `server` directory with localhost, or create a .env.local to override the .env file.
3. run npm start

## Deploying

1. Open the terminal and type `defang login`
2. Add your connection string as a defang config value by typing `defang config set DATABASE_URL` and pasting your connection string (which should be in the format `postgres://username:password@host:port/dbname`)
3. Update your `compose.yaml` file to replace `<YOUR_USERNAME>` with your username (which you can get by running `defang whoami`. "Tenant" is your username.)
4. Type `defang compose up` in the CLI.
5. Your app will be running within a few minutes.

---

Title: React & Node.js & PostgreSQL

Short Description: A full-stack to-do list application.

Tags: React, Node.js, Full-stack, PostgreSQL, JavaScript, SQL

Languages: nodejs
