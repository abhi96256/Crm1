# 🚀 Deployment Checklist

## ✅ Backend (Render) - COMPLETED
- [x] Backend deployed to: https://crmbackend-fahc.onrender.com/
- [x] API base URL updated in frontend
- [x] CORS configuration updated
- [x] Environment variables configured

## ✅ Frontend (Vercel) - COMPLETED
- [x] Frontend deployed to: https://crm1-abhisheks-projects-d0a471cd.vercel.app/
- [x] CORS origin updated in backend
- [x] Frontend-backend connection established

## 🔄 Frontend Deployment (Next Steps)

### **Option 1: Vercel (Recommended)**
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Deploy automatically
4. Update CORS origin in backend with your Vercel domain

### **Option 2: Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Deploy automatically
4. Update CORS origin in backend

### **Option 3: GitHub Pages**
1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Update CORS origin in backend

## 🔧 Environment Variables to Set

### **Backend (Render Dashboard):**
```env
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-strong-jwt-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
ADMIN_EMAIL=admin@yourcompany.com
```

### **Frontend (if needed):**
```env
REACT_APP_API_URL=https://crmbackend-fahc.onrender.com/api
```

## 🗄️ Database Setup

### **Option 1: PlanetScale (Free MySQL)**
1. Go to [planetscale.com](https://planetscale.com)
2. Create free account
3. Create new database
4. Get connection details
5. Update backend environment variables

### **Option 2: Supabase (Free PostgreSQL)**
1. Go to [supabase.com](https://supabase.com)
2. Create free account
3. Create new project
4. Get connection details
5. Update backend environment variables

## 🔒 Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials are secure
- [ ] CORS origins are properly configured
- [ ] Environment variables are not exposed in code
- [ ] HTTPS is enabled (Render provides this)

## 🧪 Testing After Deployment

1. **Backend Health Check:**
   - Visit: https://crmbackend-fahc.onrender.com/api/health
   - Should return: `{"message": "CRM Backend is running!"}`

2. **Frontend Connection:**
   - Test login functionality
   - Test API calls
   - Check for CORS errors in browser console

3. **Database Connection:**
   - Test user registration/login
   - Check if data is being saved/retrieved

## 📱 WhatsApp Bot Deployment

If you want to deploy the WhatsApp bot:
1. Deploy to Railway or Render
2. Set up environment variables
3. Configure webhook URLs
4. Test bot functionality

## 🆘 Troubleshooting

### **Common Issues:**
1. **CORS Error:** Update CORS origin in backend
2. **Database Connection:** Check environment variables
3. **JWT Error:** Verify JWT_SECRET is set
4. **Email Error:** Check SMTP configuration

### **Support:**
- Check Render logs for backend errors
- Check browser console for frontend errors
- Verify all environment variables are set correctly

