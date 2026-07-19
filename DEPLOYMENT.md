# University ERP Deployment Guide

## Backend (Render)

1. Create a new Web Service on Render.
2. Connect the server folder as the service root.
3. Set the build command:
   - npm install
4. Set the start command:
   - npm start
5. Add these environment variables:
   - MONGODB_URI: your MongoDB Atlas connection string
   - JWT_SECRET: a strong secret string
   - NODE_ENV: production
   - PORT: 5000

## Frontend (Vercel)

1. Create a new Vercel project.
2. Connect the client folder as the project root.
3. Set the build command:
   - npm run build
4. Set the output directory:
   - dist
5. Add this environment variable:
   - VITE_API_URL: your Render backend URL (for example https://your-backend.onrender.com)

## MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Whitelist 0.0.0.0/0 for Render and Vercel access.
4. Copy the connection string into MONGODB_URI.

## Notes

- The frontend uses a shared Axios instance with withCredentials enabled.
- The backend uses CORS with credentials enabled and trust proxy enabled for production hosting.
- The student registration and login flow is preserved.
