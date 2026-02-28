#!/bin/bash
echo "Starting FastAPI Backend..."
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 2

echo "Starting LocalTunnel..."
npx --yes localtunnel --port 8000 > /tmp/lt.log 2>&1 &
LT_PID=$!

echo "Waiting for LocalTunnel URL..."
sleep 3
LT_URL=$(grep -o 'https://[^ ]*' /tmp/lt.log)

echo "LocalTunnel URL: $LT_URL"

echo "Updating React Native API_URL..."
sed -i "s|const API_URL = '.*';|const API_URL = '$LT_URL';|g" ../components/Login.jsx
sed -i "s|const API_URL = '.*';|const API_URL = '$LT_URL';|g" ../components/Register.jsx

echo ""
echo "=================================================="
echo "✅ Backend is running securely!"
echo "🔗 URL: $LT_URL"
echo ""
echo "IMPORTANT: Open the URL in your browser and enter"
echo "this password to unlock the tunnel:"
curl -s https://loca.lt/mytunnelpassword
echo ""
echo "=================================================="
echo ""
echo "Press Ctrl+C to stop the backend and tunnel."

trap 'kill $BACKEND_PID $LT_PID; echo "Stopped."; exit' INT
wait
