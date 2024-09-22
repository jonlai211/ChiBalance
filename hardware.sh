#!/bin/bash

# Set project name
PROJECT_NAME="hardware_server"

# Create project directory
mkdir $PROJECT_NAME
cd $PROJECT_NAME

# Set up virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Flask
pip install Flask

# Freeze requirements
pip freeze > requirements.txt

# Initialize Git repository
git init

# Create .gitignore file
echo "venv/" > .gitignore
echo "__pycache__/" >> .gitignore
echo "*.pyc" >> .gitignore

# Create a basic Flask app
cat <<EOL > app.py
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
EOL

# Create README.md file
cat <<EOL > README.md
# My Flask Project

This is a simple Flask project.

## Setup

1. **Clone the repository**:
    \`\`\`bash
    git clone https://github.com/yourusername/$PROJECT_NAME.git
    cd $PROJECT_NAME
    \`\`\`

2. **Create and activate a virtual environment**:
    \`\`\`bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use \`venv\\Scripts\\activate\`
    \`\`\`

3. **Install the dependencies**:
    \`\`\`bash
    pip install -r requirements.txt
    \`\`\`

4. **Run the application**:
    \`\`\`bash
    python app.py
    \`\`\`

## Usage

- Navigate to \`http://127.0.0.1:5000/\` to see the "Hello, World!" message.

## Contributing

- Fork the repository
- Create a new branch (\`git checkout -b feature-branch\`)
- Commit your changes (\`git commit -am 'Add new feature'\`)
- Push to the branch (\`git push origin feature-branch\`)
- Create a new Pull Request
EOL

# Add and commit files to Git
git add .
git commit -m "Initial commit"

echo "Setup complete. Don't forget to push your code to GitHub!"

