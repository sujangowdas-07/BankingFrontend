# 🚀 Quick Start Guide

## Get Started in 3 Simple Steps

### Step 1: Install Dependencies
```bash
cd banking-app
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Open your browser and go to: **http://localhost:5173**

---

## 🎭 Demo Login Credentials

### User 1 (Recommended for Demo)
```
Customer ID: CUST001
Password: password123
```

**Account Details:**
- Account Number: 1234567890
- Account Type: Savings Account
- Balance: $50,000
- Pre-loaded with sample transactions

### User 2
```
Customer ID: CUST002
Password: password123
```

**Account Details:**
- Account Number: 1234567891
- Account Type: Current Account
- Balance: $75,000

### User 3
```
Customer ID: CUST003
Password: password123
```

**Account Details:**
- Account Number: 1234567892
- Account Type: Savings Account
- Balance: $100,000

---

## ✨ Features to Demonstrate

### 1. **Dashboard** 📊
- View account balance
- See recent transactions
- Interactive balance chart
- Quick action buttons

### 2. **Deposit Money** 💵
- Navigate to Deposit page
- Enter amount (e.g., $1000)
- Add description
- See updated balance

### 3. **Withdraw Money** 💰
- Navigate to Withdraw page
- Enter amount (e.g., $500)
- Add description
- Balance updates automatically

### 4. **Transfer Money** 💸
- Navigate to Transfer page
- Enter beneficiary account: `1234567891` or `1234567892`
- Enter amount (e.g., $200)
- Add remarks
- Confirm transfer
- Both accounts update

### 5. **Transaction History** 📜
- View all transactions
- Filter by type (Deposit, Withdrawal, Transfer)
- Search transactions
- Filter by date range
- Export to CSV

### 6. **Profile Management** 👤
- View account details
- Edit personal information
- Change password
- See account security info

---

## 🎨 UI Features to Highlight

✅ **Responsive Design** - Works on mobile, tablet, desktop  
✅ **Dark Navy Theme** - Professional banking colors  
✅ **Smooth Animations** - Fade-in and slide-in effects  
✅ **Interactive Charts** - Balance trend visualization  
✅ **Toast Notifications** - User-friendly feedback  
✅ **Confirmation Modals** - Safe transaction confirmations  
✅ **Loading States** - Clear progress indicators  
✅ **Icon Integration** - Beautiful Lucide icons  
✅ **Form Validation** - Real-time validation  
✅ **Color Coding** - Green (deposit), Red (withdrawal), Blue (transfer)

---

## 🔧 Switching to Real Backend

### 1. Edit `.env` file:
```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://your-backend-url:port/api
```

### 2. Restart development server:
```bash
# Stop server (Ctrl+C)
npm run dev
```

### 3. Required Backend Endpoints:
- POST `/api/auth/login`
- GET `/api/accounts/balance`
- POST `/api/transactions/deposit`
- POST `/api/transactions/withdraw`
- POST `/api/transactions/transfer`
- GET `/api/transactions/history`
- GET `/api/customers/profile`
- PUT `/api/customers/profile`
- POST `/api/customers/change-password`

See README.md for complete API documentation.

---

## 📱 Test on Mobile

### Option 1: Use Network IP
1. Find your IP address:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig
   ```

2. Open on mobile:
   ```
   http://YOUR_IP_ADDRESS:5173
   ```

### Option 2: Use Vite Host
1. Update `vite.config.js`:
   ```javascript
   export default {
     server: {
       host: true
     }
   }
   ```

2. Restart server and use the network URL shown

---

## 🎯 Presentation Tips

### Opening (1 minute)
- Show login page
- Explain the banking system purpose
- Login with CUST001

### Dashboard Tour (2 minutes)
- Show balance card with hide/show feature
- Explain quick action buttons
- Show recent transactions
- Point out the balance trend chart

### Transaction Demo (3 minutes)
- **Deposit:** Add $1000, show success notification
- **Withdraw:** Take out $500, show balance update
- **Transfer:** Send $200 to another account, confirm modal
- Show transaction history updates

### Advanced Features (2 minutes)
- Transaction filtering and search
- CSV export functionality
- Profile editing
- Responsive design (resize browser)

### Technical Overview (2 minutes)
- Explain React component structure
- Show Context API for state management
- Highlight Tailwind CSS styling
- Mention API integration ready

### Closing
- Emphasize mock mode for demo
- Ready to connect to backend
- Professional UI/UX
- Complete banking features

---

## ⚡ Common Issues

### Port already in use?
```bash
# The app will automatically use another port
# Or specify a different port in vite.config.js
```

### Dependencies error?
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Page not loading?
- Check if dev server is running
- Clear browser cache
- Try incognito/private mode

---

## 📦 Project Structure Explained

```
banking-app/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React Context for state management
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   ├── services/         # API and mock data services
│   └── App.jsx           # Main app with routing
├── public/               # Static assets
├── .env                  # Environment configuration
└── package.json          # Dependencies
```

---

## 🎓 For Your Project Report

**Technologies Used:**
- React.js 18.3 - Frontend library
- Vite 6.0 - Build tool
- Tailwind CSS 3.4 - Styling
- React Router DOM 7 - Routing
- Axios - HTTP client
- Recharts - Data visualization
- Lucide React - Icons

**Key Features:**
- Authentication with protected routes
- Real-time balance updates
- Transaction management (Deposit, Withdraw, Transfer)
- Transaction history with filtering
- Profile management
- Responsive design
- Mock API for demonstration
- Backend integration ready

**Architecture:**
- Component-based architecture
- Context API for state management
- Service layer for API calls
- Protected and public routes
- Reusable components
- Utility-first CSS with Tailwind

---

## 📞 Need Help?

Check these files:
- **README.md** - Complete documentation
- **QUICKSTART.md** - This file
- **.env.example** - Environment configuration example

Happy Banking! 🏦✨
