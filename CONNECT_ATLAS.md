# 🔗 Connect to MongoDB Atlas

## Your Connection String:
```
mongodb+srv://<db_username>:<db_password>@markovski.uhjxb6u.mongodb.net/?retryWrites=true&w=majority&appName=Markovski
```

## ⚠️ Important: Replace `<db_username>` and `<db_password>`

You need to replace these placeholders with your actual MongoDB Atlas database user credentials.

### Example:
If your username is: `admin`
And your password is: `MySecurePass123`

The connection string becomes:
```
mongodb+srv://admin:MySecurePass123@markovski.uhjxb6u.mongodb.net/?retryWrites=true&w=majority&appName=Markovski
```

---

## 🔐 Where to Find Your Credentials

1. In MongoDB Atlas dashboard
2. Go to "Database Access" (left sidebar)
3. You should see your database user
4. If you forgot the password, click "Edit" and set a new password

**Note:** This is NOT your Atlas account login! It's a separate database user.

---

## ✅ Update Your App

Once you have your username and password, update `.env.local`:

```bash
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@markovski.uhjxb6u.mongodb.net/?retryWrites=true&w=majority&appName=Markovski
NODE_ENV=development
```

Replace `YOUR_USERNAME` and `YOUR_PASSWORD` with your actual credentials.

---

## 🚀 Then Restart Your App

```bash
cd /Users/bilyana/Downloads/.github-main/profile/bar-national-financial
npm run dev
```

---

## 🎉 Success!

Your app will now use MongoDB Atlas (cloud) instead of local MongoDB!

This means:
✅ Your data is in the cloud
✅ Accessible from anywhere
✅ Ready for Vercel deployment
✅ Automatic backups
✅ Free 512MB storage

