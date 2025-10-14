# Production Fix - ERR_CONNECTION_REFUSED

## ✅ Configuration Complete

Your environment is now configured:

- **Backend URL**: `https://salamyar-backend-production.up.railway.app/api/v1`
- **Frontend URL**: `https://chipper-mandazi-abc7b9.netlify.app`
- **CORS**: Already configured correctly

## 🚀 Deploy Steps

### 1. Rebuild Frontend
```bash
cd salamyar
npm run build
```

### 2. Deploy to Netlify

**Option A: Drag & Drop**
- Go to Netlify dashboard
- Drag the `dist` folder to deploy

**Option B: Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Option C: Git Push (if connected)**
- Just push to your repository
- Netlify will auto-deploy

### 3. Test Your Production Site

After deployment, test these endpoints:

1. **Health Check**: https://chipper-mandazi-abc7b9.netlify.app
2. **Search**: Try searching for products
3. **Select Products**: Try adding products to cart
4. **Confirm Cart**: Test the cart confirmation

## 🔍 Verify Backend is Running

Test your backend directly:
```bash
curl https://salamyar-backend-production.up.railway.app/health
```

Should return:
```json
{
  "status": "healthy",
  "service": "Salamyar Product Search API",
  "version": "1.0.0"
}
```

## 🐛 Troubleshooting

If you still get errors:

1. **Check browser console** - Look for the actual API URL being called
2. **Verify environment variables** - In Netlify, check if `VITE_API_URL` is set
3. **Check Railway logs** - Make sure backend is running
4. **Test CORS** - Open browser console and check for CORS errors

## 📝 Environment Variables in Netlify

If using Netlify environment variables (instead of .env.production):

1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://salamyar-backend-production.up.railway.app/api/v1`
3. Redeploy

## ✨ What Was Fixed

1. Created `.env.production` with correct backend URL
2. Added fallback in `api.ts` for missing env vars
3. Verified CORS configuration
4. Created deployment documentation
