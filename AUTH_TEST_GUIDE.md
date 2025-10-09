# Authentication Flow Test Guide

## ✅ What Was Fixed

### Backend Changes:

1. **Added cookie-parser** - Middleware to read HttpOnly cookies
2. **Updated auth middleware** - Now checks cookies FIRST, then Authorization header
3. **Updated login route** - Sets HttpOnly cookie with token
4. **Updated signup route** - Sets HttpOnly cookie with token
5. **Added logout route** - Clears the cookie
6. **Fixed /me route** - Returns proper user data with authentication check

### How Authentication Now Works:

```
User Signs Up/Logs In
    ↓
Backend creates JWT token
    ↓
Backend sets HttpOnly cookie: "token=<jwt>"
    ↓
Browser stores cookie automatically
    ↓
Every request sends cookie automatically (credentials: 'include')
    ↓
Auth middleware reads cookie, verifies JWT
    ↓
Sets req.user = { _id, role }
    ↓
Protected routes can access req.user
```

## 🧪 Testing Steps

### Step 1: Test Signup Flow

1. Open your app: `http://localhost:5173`
2. Go to Signup page
3. Fill in the form:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
4. Click "Create Account"

**Expected Result:**

- ✅ You should be redirected to `/home`
- ✅ Check browser DevTools → Application → Cookies → You should see a cookie named `token`

### Step 2: Test Add to Cart (While Logged In)

1. Navigate to Store page
2. Click "Add to Cart" on any product
3. Check the browser console and network tab

**Expected Result:**

- ✅ Success toast: "Added to cart successfully! ✓"
- ✅ Network tab shows: `POST /cart/add` → Status 200
- ✅ Backend console shows: "User authenticated with ID: <user_id>"

### Step 3: Test Duplicate Add

1. Click "Add to Cart" on the SAME product again

**Expected Result:**

- ⚠️ Warning toast: "Product is already in your cart!"
- ⚠️ Network tab shows: `POST /cart/add` → Status 409

### Step 4: Test Cart Page

1. Navigate to `/cart`

**Expected Result:**

- ✅ Cart page fetches from database
- ✅ Shows all products you added
- ✅ Backend console shows: "User authenticated with ID: <user_id>" for GET /cart

### Step 5: Test Persistence

1. Refresh the page (F5)
2. Check if you're still logged in

**Expected Result:**

- ✅ Still authenticated (cookie persists)
- ✅ Cart items still visible
- ✅ No need to login again

### Step 6: Test Logout

1. Add a logout button (or use browser DevTools to clear the cookie)
2. Click logout

**Expected Result:**

- ✅ Cookie cleared
- ✅ Redirected to login page
- ✅ Can't access protected routes

## 🔍 Debugging

### If you get "Please login!" error:

**Check 1: Is the cookie being set?**

```
1. Open DevTools → Application → Cookies
2. Look for cookie named "token" under localhost:5173
3. If missing, check backend logs during login/signup
```

**Check 2: Is the cookie being sent?**

```
1. Open DevTools → Network
2. Click on any API request to /cart/add
3. Check Request Headers → Should see: Cookie: token=<value>
```

**Check 3: Is the token valid?**

```
1. Copy the token value from cookie
2. Go to https://jwt.io
3. Paste the token
4. Check if it contains: { "sub": "<user_id>", "role": "user" }
```

### Backend Debug Logs:

If you get errors, check backend console for:

```
✅ "User authenticated with ID: <id>" → Auth working
❌ "No user or user._id found" → Token not being read/verified
❌ "Auth middleware error" → Invalid token
```

### Common Issues:

**Issue 1: "req.user is undefined"**

- Solution: Make sure cookie-parser is imported and used BEFORE auth middleware

**Issue 2: Cookie not being sent**

- Solution: Verify `credentials: 'include'` in fetch options (already done in ProductProvider)

**Issue 3: CORS errors**

- Solution: Backend already has `credentials: true` in CORS config

## 📝 Quick Test Commands

### Test Login via curl:

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  -c cookies.txt

# This should return token and save cookie to cookies.txt
```

### Test Add to Cart with cookie:

```bash
curl -X POST http://localhost:8000/cart/add \
  -H "Content-Type: application/json" \
  -d '{"productId":"123"}' \
  -b cookies.txt

# This should return success if cookie is valid
```

## ✅ Success Checklist

- [ ] Signup creates account and sets cookie
- [ ] Login sets cookie
- [ ] Cookie visible in DevTools
- [ ] Add to Cart works (200 response)
- [ ] Duplicate add shows warning (409 response)
- [ ] Cart page shows items from database
- [ ] Refresh keeps user logged in
- [ ] Backend logs show "User authenticated with ID"

---

**If all steps pass, your authentication is working correctly! 🎉**
