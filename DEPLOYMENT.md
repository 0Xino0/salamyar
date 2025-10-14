# Deployment Guide

## Environment Configuration

### Development
The app uses `.env.development` for local development:
```
VITE_API_URL=http://localhost:8000/api/v1
```

### Production
Update `.env.production` with your actual backend URL:
```
VITE_API_URL=https://your-backend-domain.com/api/v1
```

## Common Issues

### ERR_CONNECTION_REFUSED
This error occurs when the frontend can't reach the backend. Check:

1. **Backend URL is correct** - Update `VITE_API_URL` in `.env.production`
2. **Backend is running** - Ensure your backend server is deployed and accessible
3. **CORS is configured** - Backend must allow requests from your frontend domain
4. **Firewall/Network** - Ensure no firewall is blocking the connection

### Steps to Fix in Production:

1. Update `.env.production` with your actual backend URL:
   ```bash
   VITE_API_URL=https://api.yourdomain.com/api/v1
   ```

2. Rebuild your frontend:
   ```bash
   npm run build
   ```

3. Ensure your backend CORS settings allow your frontend domain

4. Deploy the new build

## Backend CORS Configuration

Make sure your backend (`salamyar-backend/app/main.py`) has CORS configured:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-frontend-domain.com"],  # Update this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
