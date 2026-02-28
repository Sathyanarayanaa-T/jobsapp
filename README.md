# JobsApp

A comprehensive job-portal application inspired by Naukri.com, featuring modern Dark/Light mode, clean navigation using Expo Router, and a secure backend.

## 🎥 Video Demo
You can view a complete video demonstration of the app's features and flow below:

<video src="./screenshots/Record_2026-02-28-12-21-51_f73b71075b1de7323614b647fe394240.mp4" controls="controls" muted="muted" playsinline="playsinline" width="320"></video>

*(Note: The player may take a second to load depending on connection)*

---

## 🛠️ Tech Stack
- **Frontend**
  - React Native (Expo SDK 52)
  - `@react-navigation/bottom-tabs` & `@react-navigation/native-stack`
  - Push Notifications (Expo Notifications)
- **Backend**
  - Python / FastAPI
  - SQLite (database)
  - `localtunnel` (exposes backend to Expo app during development)

---

## 🚀 Running the Application Locally

The app requires both the backend API and the frontend Expo bundler to be running simultaneously.

### 1. Zero-Config Start (Recommended for Linux/macOS)
We have included a startup script that perfectly synchronizes the backend and a localtunnel server, and maps it directly to the React Native app.

Run from the root directory:
```bash
./start-dev.sh
```
The script will tell you an output URL and a password. Enter the password in your browser at the given URL to unblock the tunnel, which allows the mobile app to hit your API!


### 2. Manual Startup

If you prefer starting things manually or are on Windows without a bash terminal:

#### 🟢 Run the Backend (FastAPI)
```bash
cd backend
# Enable your virtual environment if you have one configured
# source venv/bin/activate 

# Install requirements if not done: 
# pip install fastapi uvicorn sqlite3

uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
This starts the local SQL database and authentication API.

*Note for mobile testing: You must use `localtunnel` or `ngrok` so your physical device can hit your `localhost` API, then update the `API_URL` variable inside `components/Login.jsx` and `components/Register.jsx`.*

#### 🔵 Run the Frontend App (Expo)
Open a separate terminal window at the project root (`/hexaware`).

```bash
# Clear the cache and start the metro bundler
npx expo start --clear
```

- Scan the generated QR code using the **Expo Go** app on your physical iPhone/Android.
- The app will natively load! Enjoy switching between Light and Dark mode using the sun/moon icon on the top right!
