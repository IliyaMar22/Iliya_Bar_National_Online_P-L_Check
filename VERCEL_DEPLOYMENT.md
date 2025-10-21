# 🚀 Vercel Deployment Guide for Bar National Financial

This guide will walk you through deploying your Bar National Financial application to Vercel.

---

## ✅ Prerequisites

Before deploying, make sure you have:

1. ✅ **MongoDB Atlas** account with a cluster set up
2. ✅ **Vercel** account (free tier works perfectly)
3. ✅ **GitHub** account (optional but recommended)
4. ✅ **MongoDB connection string** (you already have this)

---

## 🎯 Deployment Steps

### **Step 1: Prepare Your MongoDB Atlas**

1. **Go to MongoDB Atlas** → https://cloud.mongodb.com/
2. **Network Access** → Make sure `0.0.0.0/0` is allowed
3. **Database Access** → Verify your user `BarNational` exists and has permissions
4. **Copy your connection string:**
   ```
   mongodb+srv://BarNational:IliyaMarkovski@markovski.uhjxb6u.mongodb.net/bar-national-financial?retryWrites=true&w=majority&appName=Markovski
   ```

---

### **Step 2: Sign Up for Vercel**

1. **Go to** https://vercel.com/signup
2. **Sign up** with GitHub, GitLab, or Bitbucket (GitHub recommended)
3. **Complete** the verification process

---

### **Step 3: Install Vercel CLI (Optional but Recommended)**

Open your terminal and run:

```bash
npm install -g vercel
```

Then login:

```bash
vercel login
```

---

### **Step 4: Deploy from Local Machine**

#### **Option A: Using Vercel CLI (Recommended)**

1. **Navigate to your project:**
   ```bash
   cd /Users/bilyana/Downloads/.github-main/profile/bar-national-financial
   ```

2. **Run the deployment command:**
   ```bash
   vercel
   ```

3. **Answer the prompts:**
   ```
   ? Set up and deploy "bar-national-financial"? [Y/n] Y
   ? Which scope do you want to deploy to? [Your account]
   ? Link to existing project? [y/N] N
   ? What's your project's name? bar-national-financial
   ? In which directory is your code located? ./
   ```

4. **Set environment variable when prompted:**
   ```
   MONGODB_URI=mongodb+srv://BarNational:IliyaMarkovski@markovski.uhjxb6u.mongodb.net/bar-national-financial?retryWrites=true&w=majority&appName=Markovski
   ```

5. **Wait for deployment** (usually takes 1-2 minutes)

6. **You'll get a URL** like: `https://bar-national-financial.vercel.app`

#### **Option B: Using Vercel Dashboard**

1. **Go to** https://vercel.com/dashboard
2. **Click** "Add New..." → "Project"
3. **Click** "Continue with GitHub" (or your preferred Git provider)
4. **Import** your repository (or upload files manually)
5. **Configure project:**
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. **Add Environment Variables:**
   - Click **"Environment Variables"**
   - Add variable:
     - Name: `MONGODB_URI`
     - Value: `mongodb+srv://BarNational:IliyaMarkovski@markovski.uhjxb6u.mongodb.net/bar-national-financial?retryWrites=true&w=majority&appName=Markovski`
     - Environment: **Production**, **Preview**, **Development** (select all)
7. **Click** "Deploy"
8. **Wait** for deployment to complete

---

### **Step 5: Configure Environment Variables (If Not Done During Setup)**

1. **Go to** your project dashboard on Vercel
2. **Click** "Settings" → "Environment Variables"
3. **Add the following variable:**
   
   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | `mongodb+srv://BarNational:IliyaMarkovski@markovski.uhjxb6u.mongodb.net/bar-national-financial?retryWrites=true&w=majority&appName=Markovski` |

4. **Make sure** to add it for **Production**, **Preview**, and **Development**
5. **Redeploy** if necessary

---

### **Step 6: Test Your Deployment**

1. **Open** your Vercel deployment URL (e.g., `https://bar-national-financial.vercel.app`)
2. **Test the app:**
   - Add a daily report
   - Check if data saves
   - View the calendar
   - Check reports
3. **Verify in MongoDB Atlas:**
   - Go to Atlas → Browse Collections
   - Check if `bar-national-financial` database exists
   - Check if `dailyreports` collection has data

---

## 🔧 Troubleshooting

### **Issue: "Authentication Failed" Error**

**Solution:**
- Check MongoDB Atlas → Database Access
- Verify username: `BarNational`
- Verify password: `IliyaMarkovski`
- Check Network Access allows `0.0.0.0/0`

### **Issue: "Build Failed" Error**

**Solution:**
- Check Vercel logs for specific error
- Make sure `package.json` has all dependencies
- Try rebuilding: `vercel --prod --force`

### **Issue: Environment Variables Not Working**

**Solution:**
- Go to Vercel → Settings → Environment Variables
- Make sure `MONGODB_URI` is added for all environments
- Redeploy the project

### **Issue: API Routes Not Working**

**Solution:**
- Check Vercel logs under "Functions" tab
- Make sure API routes are in `pages/api/` directory
- Verify MongoDB connection string is correct

---

## 🎯 Custom Domain (Optional)

### **Add Your Own Domain:**

1. **Go to** Vercel dashboard → Your project
2. **Click** "Settings" → "Domains"
3. **Add** your domain (e.g., `financial.barnational.com`)
4. **Follow** the DNS configuration instructions
5. **Wait** for DNS propagation (can take up to 24 hours)

---

## 🔄 Continuous Deployment

### **Using GitHub (Recommended):**

1. **Create a GitHub repository:**
   ```bash
   cd /Users/bilyana/Downloads/.github-main/profile/bar-national-financial
   git init
   git add .
   git commit -m "Initial commit"
   gh repo create bar-national-financial --public
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to Vercel dashboard
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-deploy on every push!

---

## 📊 Monitoring

### **Check Your Deployment:**

1. **Vercel Dashboard** → Your project
2. **View:**
   - Deployments (history)
   - Analytics (traffic, performance)
   - Functions (API logs)
   - Speed Insights

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** (already in `.gitignore`)
2. **Use strong passwords** for MongoDB
3. **Regularly rotate** database credentials
4. **Monitor** MongoDB Atlas security alerts
5. **Keep dependencies updated:**
   ```bash
   npm update
   npm audit fix
   ```

---

## ✅ Post-Deployment Checklist

- [ ] App loads correctly at Vercel URL
- [ ] Can add daily reports
- [ ] Data saves to MongoDB Atlas
- [ ] Calendar displays correctly
- [ ] Reports generate properly
- [ ] BGN/EUR conversion works
- [ ] Mobile responsive
- [ ] No console errors

---

## 🎉 Success!

Your Bar National Financial app is now live on Vercel!

**Share your deployment URL:**
- `https://bar-national-financial.vercel.app` (or your custom domain)

---

## 📞 Support

If you encounter any issues:

1. **Check Vercel logs** → Dashboard → Functions
2. **Check MongoDB Atlas** → Metrics
3. **Review this guide** for common solutions
4. **Contact support** if needed

---

**Built with ❤️ for Bar National**

