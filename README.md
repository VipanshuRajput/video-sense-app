# 🎬 VideoSense — Full Stack Video Streaming & Analysis Platform

A full stack application that allows users to upload videos, process them for sensitivity analysis, and stream them using HTTP Range requests (Netflix-style streaming).

## 🚀 Features

- JWT Authentication & Role-Based Access
- Video Upload using Multer
- MongoDB metadata storage
- Real-time processing updates with Socket.io
- Sensitivity analysis simulation (safe / flagged)
- HTTP Range video streaming
- Multi-tenant user isolation
- React + Tailwind modern UI

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- Socket.io-client

**Backend**
- Node.js
- Express.js
- MongoDB
- Multer
- Socket.io
- JWT

## 📦 Setup Instructions

### Backend
```bash
cd backend
npm install
npm run dev
