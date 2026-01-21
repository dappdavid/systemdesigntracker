# System Design Master - Local Setup Guide (Windows)

Follow these steps to launch the project locally on your Windows machine.

## Prerequisites

1.  **Node.js**: Download and install the latest LTS version from [nodejs.org](https://nodejs.org/).
2.  **Gemini API Key**: Obtain your API key from [Google AI Studio](https://aistudio.google.com/).

## Steps to Launch

1.  **Open PowerShell or Command Prompt**:
    *   Press the `Windows` key, type `PowerShell`, and select it.

2.  **Navigate to the Project Folder**:
    *   Type `cd` followed by the path to your project folder.
    ```powershell
    cd path\to\your\project-folder
    ```

3.  **Install Dependencies**:
    *   Run the following command to install required packages:
    ```powershell
    npm install
    ```

4.  **Set Up API Key**:
    *   Create a new file named `.env` in the root directory of the project.
    *   Open it with a text editor (like Notepad) and paste your API key in this format:
    ```text
    API_KEY=your_actual_api_key_here
    ```

5.  **Start the Application**:
    *   Run the development server:
    ```powershell
    npm run dev
    ```

6.  **Open in Browser**:
    *   Check the terminal output for the local URL (usually `http://localhost:5173`).
    *   Open that link in your web browser to use the app.
