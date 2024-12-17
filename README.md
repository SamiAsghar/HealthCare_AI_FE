
---

# **HealthCare AI: Medical Translation and Transcription App**

This project is a full-stack web application that allows users to record speech, transcribe it, translate it into a target language, and then play the translation as audio. The application consists of a **frontend** (NextJS, TailwindCSS) and a **backend** (NestJS (Node)). The backend is responsible for handling audio processing, transcription, translation, and text-to-speech (TTS).

## **Table of Contents**
1. [Code Documentation](#code-documentation)
   - [Frontend Structure](#frontend-structure)
   - [Security Considerations](#security-considerations)
2. [User Guide](#user-guide)
   - [Features](#features)
   - [Running the Application](#running-the-application)

---

## **Code Documentation**

### **Frontend Structure**
The frontend handles user interactions, such as starting and stopping the recording, displaying transcriptions and translations, and playing the audio translation.

- **index.tsx**: Contains the structure of the webpage, including input fields for transcriptions, translations, and buttons for interaction (Record, Stop, Speak).
- **Serverless Functions (playTranslation.ts, uploadAudio.ts)**: Contains code for getting data from FE and request to BE for processing.

### **Security Considerations**
- **Audio File Handling**: Securely handle the audio files processed by the backend to avoid memory issues or security vulnerabilities.

---

## **User Guide**

### **Features**
- **Recording Audio**: Users can record their voice by clicking the "Start Recording" button and end it by clicking the "Stop Recording" Button. The audio is captured using the browser’s built-in microphone access.
- **Transcription**: User can submit audio for transcription using "Upload Audio" button. App sends the audio to the backend, where it is transcribed using OpenAI’s Whisper model.
- **Translation**: The transcribed text is then translated into the selected target language using OpenAI models.
- **Speak Translation**: The translated text can be converted into speech and played back to the user through the "Speak" button.

### **Running the Application**

#### **Set Up the Frontend**
1. Clone the repo
2. To install the dependencies, run: 
   ```bash
   npm run install
   ```
3. To start the fronten app, run:
   ```bash
   npm run dev
   ```
4. The Frontend app will run on `http://127.0.0.1:3000`, and you’ll be able to interact with the frontend from this address.

#### **Test the App**
1. Click **Start Recording** to record your voice.
2. After stopping the recording, the transcription and translation will appear in their respective sections.
3. Click **Speak** to play the translated text as audio.

### **Interacting with the App**
- **Record**: Click the "Start Recording" button to begin recording audio. When you are done, click "Stop Recording".
- **Transcription and Translation**: After the recording stops, the transcribed text is displayed, followed by the translated text.
- **Speak**: After the translation is displayed, click the "Speak" button to hear the translation in audio form.
