# Sign-in Debugging Guide

## Current Status
✅ Backend is running on port 5000  
✅ MongoDB is connected  
✅ Frontend is running on port 5173  
✅ API URL is configured: `http://localhost:5000`

## Issue: Nothing Happens After Sign-in

### Quick Checks

1. **Open Browser Console** (F12 or Right-click → Inspect → Console)
   - Look for any error messages in red
   - Check the Network tab for failed API calls

2. **Test Sign-in Flow**
   - Go to: `http://localhost:5173`
   - Click "Sign In" or "Login"
   - Try logging in with any credentials
   - Watch the console for errors

### Common Issues & Solutions

#### Issue 1: CORS Error
**Symptom:** Console shows "CORS policy" error  
**Solution:** Backend CORS is already configured for `http://localhost:5173`

#### Issue 2: Network Error / API Not Reachable
**Symptom:** Console shows "Network Error" or "Failed to fetch"  
**Fix:**
```bash
# Make sure backend is running
cd backend
npm start
```

#### Issue 3: 404 Not Found on API Endpoints
**Symptom:** Console shows 404 errors for `/api/auth/login`  
**Check:** Backend routes are properly configured

#### Issue 4: No User Account Exists
**Symptom:** Login fails with "Invalid credentials"  
**Solution:** Try signing up first:
1. Click "Sign Up" or "Get Started"
2. Create a new account
3. Then try logging in

#### Issue 5: Token Not Being Saved
**Symptom:** Login succeeds but doesn't redirect to dashboard  
**Check:** Browser localStorage for `auth_token` and `auth_user`

### Manual Testing Steps

1. **Create Account:**
   ```
   Name: Test User
   Email: test@example.com
   Password: password123
   ```

2. **Login:**
   ```
   Email: test@example.com
   Password: password123
   ```

3. **Expected Behavior:**
   - Toast notification: "Login successful!"
   - Automatic redirect to `/dashboard`
   - Dashboard page loads with your books

4. **If Nothing Happens:**
   - Check browser console (F12)
   - Check Network tab for API calls
   - Look for error messages
   - Copy any error messages and share them

### Debug Commands

**Check if backend is responding:**
```bash
# In PowerShell or Command Prompt
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2026-01-30T..."
}
```

**Check frontend environment:**
```bash
cd frontend
cat .env
```

Should show:
```
VITE_API_URL=http://localhost:5000
```

### What to Report

If the issue persists, please share:
1. **Console errors** (screenshot or copy-paste)
2. **Network tab** - any failed requests (status code, URL)
3. **What happens** when you click login:
   - Does the button show loading state?
   - Any toast notifications appear?
   - Does the page stay on login or redirect somewhere?

### Quick Fix: Test Backend Directly

Open a new terminal and test the backend:

```bash
# Test health endpoint
curl http://localhost:5000/health

# Test registration (create account)
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"

# Test login
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

If these work, the backend is fine and the issue is in the frontend.
