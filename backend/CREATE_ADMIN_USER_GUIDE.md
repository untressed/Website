# Quick Fix Guide: Creating Your First User

## The Problem
❌ **No users exist in the database** → Nobody can login

## The Solution
✅ **Create an admin user** → Enable login functionality

---

## Method 1: Interactive Script (Recommended)

Run this command in your terminal:

```powershell
cd backend
node create_admin_user.js
```

You'll be prompted to enter:
- Admin name
- Admin email
- Admin password (minimum 6 characters)
- Contact number (optional)

The script will:
1. Validate your input
2. Check if the email already exists
3. Hash the password securely
4. Create the admin user
5. Display the user details

---

## Method 2: Quick Test User

If you just want to test quickly, you can create a test admin user by running:

```powershell
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); const User = require('./models/User'); mongoose.connect(process.env.MONGO_URI).then(async () => { const user = await User.create({ name: 'Admin', email: 'admin@pritsit.com', password: 'admin123', role: 'admin' }); console.log('✅ Test admin created:', user.email); process.exit(0); });"
```

**Test Credentials:**
- Email: `admin@pritsit.com`
- Password: `admin123`

⚠️ **Remember to change this password after first login!**

---

## Method 3: MongoDB Compass (GUI)

If you prefer a graphical interface:

1. Open MongoDB Compass
2. Connect to your database
3. Navigate to the `users` collection
4. Click "Insert Document"
5. Paste this (replace with your details):

```json
{
  "name": "Your Name",
  "email": "your.email@example.com",
  "password": "$2a$10$YourHashedPasswordHere",
  "role": "admin",
  "createdAt": { "$date": "2026-01-02T07:40:00.000Z" },
  "updatedAt": { "$date": "2026-01-02T07:40:00.000Z" }
}
```

⚠️ **Note:** You'll need to hash the password first using bcrypt.

---

## After Creating the User

1. **Test the login:**
   - Go to your website
   - Click the login button
   - Enter your credentials
   - You should see "Login Successful!"

2. **Verify in database:**
   ```powershell
   cd backend
   node verify_database.js
   ```
   You should now see 1 user in the report.

3. **Check user status:**
   - The user will be stored in localStorage after login
   - You can check it in browser DevTools → Application → Local Storage

---

## Troubleshooting

### "User already exists" error
- Someone already created a user with that email
- Try a different email or check existing users

### "Invalid credentials" error after creating user
- Make sure you're using the exact email and password you created
- Passwords are case-sensitive
- Check for extra spaces

### "MONGO_URI not found" error
- Make sure you're in the `backend` directory
- Check that `.env` file exists in the backend folder
- Verify MONGO_URI is set in the .env file

---

## Security Reminders

✅ **DO:**
- Use strong passwords (mix of letters, numbers, symbols)
- Change default passwords immediately
- Keep admin credentials secure
- Use unique emails for each user

❌ **DON'T:**
- Share admin credentials
- Use simple passwords like "123456"
- Store passwords in plain text
- Reuse passwords from other sites
