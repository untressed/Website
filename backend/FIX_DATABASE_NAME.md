# Fix: Change Database from 'test' to 'prits-website'

## Current Situation
Your MongoDB connection is using the **"test"** database (default) instead of **"prits-website"**.

## Why This Happened
When a MongoDB connection string doesn't specify a database name, MongoDB defaults to the "test" database.

---

## How to Fix

### Step 1: Update Your `.env` File

Open `backend/.env` and find your `MONGO_URI` line. It currently looks something like this:

**❌ Current (connects to 'test' database):**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/
```
OR
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
```

**✅ Change it to (connects to 'prits-website' database):**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/prits-website?retryWrites=true&w=majority
```

**Key Change:** Add `/prits-website` before the `?` in the connection string.

---

## MongoDB URI Format Explained

```
mongodb+srv://username:password@cluster.mongodb.net/DATABASE_NAME?options
                                                        ↑
                                                  Add this part!
```

---

## Step 2: Restart Your Backend Server

After updating the `.env` file:

```powershell
# Stop the current server (Ctrl+C if running)
# Then restart it
cd backend
node server.js
```

You should see:
```
✅ MongoDB Connected Successfully
📡 Connected to Cloud Cluster (Atlas)
```

---

## Step 3: Verify the Database Name

Run the verification script again:

```powershell
cd backend
node verify_database.js
```

You should now see:
```
📡 Database Name: prits-website
```
Instead of:
```
📡 Database Name: test
```

---

## What Will Happen to Your Data?

### Option 1: Start Fresh (Recommended)
- The 'prits-website' database will be empty
- You'll have a clean slate
- Old test data stays in 'test' database (not deleted)

### Option 2: Migrate Data from 'test' to 'prits-website'
If you want to keep the 8 orders and 84 contacts from the 'test' database, you can:

1. **Using MongoDB Compass (GUI):**
   - Connect to your cluster
   - Copy collections from 'test' to 'prits-website'

2. **Using mongodump/mongorestore (CLI):**
   ```powershell
   # Export from 'test' database
   mongodump --uri="your-mongo-uri/test" --out=./backup
   
   # Import to 'prits-website' database
   mongorestore --uri="your-mongo-uri/prits-website" ./backup/test
   ```

---

## Common MongoDB URI Examples

### MongoDB Atlas (Cloud)
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/prits-website?retryWrites=true&w=majority
```

### Local MongoDB
```
mongodb://localhost:27017/prits-website
```

### MongoDB Atlas with IP Whitelist
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/prits-website?retryWrites=true&w=majority&authSource=admin
```

---

## Troubleshooting

### "Authentication failed" error
- Check your username and password in the URI
- Make sure there are no special characters that need URL encoding
- Verify database user has permissions

### Still connecting to 'test' database
- Make sure you saved the `.env` file
- Restart the backend server completely
- Check for typos in the database name
- Ensure no spaces around the `=` sign in `.env`

### "Database not found" error
- This is normal! MongoDB creates databases automatically
- The database will be created when you insert the first document

---

## Quick Check

After making the change, your connection should show:

**Before:**
```
✅ MongoDB Connection: SUCCESS
📡 Database Name: test          ← Wrong database
```

**After:**
```
✅ MongoDB Connection: SUCCESS
📡 Database Name: prits-website  ← Correct database!
```

---

## Security Note

⚠️ **Never commit your `.env` file to Git!**
- The `.env` file contains sensitive credentials
- It should always be in `.gitignore`
- Share connection strings securely (encrypted channels only)
