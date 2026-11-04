# SecureBank - Banking Transaction Management System

A modern, professional, and responsive banking web application frontend built with React.js, Vite, JavaScript, and Tailwind CSS.

![SecureBank](https://img.shields.io/badge/SecureBank-Banking%20App-blue)
![React](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-6.0-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

## 🎯 Project Overview

This is a complete frontend implementation of a banking transaction management system with a beautiful, intuitive user interface. The application allows customers to manage their bank accounts, perform transactions (deposit, withdrawal, transfer), view transaction history, and manage their profile.

## ✨ Features

### 🔐 Authentication
- Secure login system with form validation
- Remember me functionality
- Session management
- Protected routes

### 📊 Dashboard
- Welcome message with customer name
- Account balance card with show/hide toggle
- Quick action buttons (Deposit, Withdraw, Transfer, History)
- Recent transactions table
- Income and expense summary cards
- Interactive balance trend chart
- Refresh balance functionality

### 💰 Account Management
- View account details
- Account information display
- Balance information
- Account type and status
- Security information

### 💵 Transactions
#### Deposit
- Add funds to account
- Transaction description
- Real-time balance update
- Transaction confirmation

#### Withdrawal
- Withdraw funds from account
- Insufficient balance validation
- Transaction description
- Transaction confirmation

#### Transfer
- Send money to another account
- Beneficiary validation
- Transfer confirmation modal
- Real-time balance update
- Transaction receipt

### 📜 Transaction History
- View all transactions
- Filter by transaction type (All, Deposit, Withdrawal, Transfer)
- Search by transaction ID or description
- Date range filtering
- Export to CSV functionality
- Color-coded transactions (Green: Deposit, Red: Withdrawal, Blue: Transfer)
- Pagination support

### 👤 Profile Management
- View personal information
- Edit profile (name, email, phone)
- Change password
- View account details
- Account security information

## 🛠️ Technology Stack

- **React.js 18.3** - UI library
- **Vite 6.0** - Build tool and dev server
- **JavaScript (ES6+)** - Programming language
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **React Router DOM 7** - Client-side routing
- **Axios 1.7** - HTTP client for API calls
- **Lucide React 0.468** - Beautiful icon library
- **Recharts 2.15** - Charting library for data visualization

## 📁 Project Structure

```
banking-app/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── BalanceCard.jsx
│   │   ├── ConfirmationModal.jsx
│   │   ├── DashboardCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotificationToast.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TransactionForm.jsx
│   │   └── TransactionTable.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── BankingContext.jsx
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   ├── pages/
│   │   ├── Account.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Deposit.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── Transfer.jsx
│   │   ├── TransactionHistory.jsx
│   │   └── Withdraw.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── bankingService.js
│   │   └── mockData.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd banking-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

## 🎭 Demo Mode

The application runs in **demo mode** by default with mock data. You can login with these credentials:

### Demo User 1
- **Customer ID:** `CUST001`
- **Password:** `password123`
- **Account:** 1234567890 (Savings)
- **Balance:** $50,000

### Demo User 2
- **Customer ID:** `CUST002`
- **Password:** `password123`
- **Account:** 1234567891 (Current)
- **Balance:** $75,000

### Demo User 3
- **Customer ID:** `CUST003`
- **Password:** `password123`
- **Account:** 1234567892 (Savings)
- **Balance:** $100,000

## 🔌 Connecting to Backend API

### Step 1: Update Environment Variables

Edit the `.env` file in the root directory:

```env
# Set to false to use real API
VITE_USE_MOCK_API=false

# Your backend API URL
VITE_API_BASE_URL=http://localhost:8080/api
```

### Step 2: Backend API Endpoints

Your backend should implement these endpoints:

#### Authentication
```
POST /api/auth/login
Body: { customerId: string, password: string }
Response: { user: object, token: string }
```

#### Account Operations
```
GET /api/accounts/balance?accountNumber={accountNumber}
Response: { accountNumber, accountType, balance, availableBalance, status }
```

#### Transactions
```
POST /api/transactions/deposit
Body: { accountNumber: string, amount: number, description: string }
Response: { transaction: object, newBalance: number }

POST /api/transactions/withdraw
Body: { accountNumber: string, amount: number, description: string }
Response: { transaction: object, newBalance: number }

POST /api/transactions/transfer
Body: { senderAccount: string, beneficiaryAccount: string, amount: number, remarks: string }
Response: { transaction: object, newBalance: number, beneficiaryName: string }

GET /api/transactions/history?accountNumber={accountNumber}&type={type}&startDate={date}&endDate={date}
Response: [ { id, accountNumber, type, amount, description, date, status, openingBalance, closingBalance } ]
```

#### Customer Profile
```
GET /api/customers/profile?customerId={customerId}
Response: { customerId, name, email, phone, accountNumber, accountType, balance, status }

PUT /api/customers/profile
Body: { customerId: string, name: string, email: string, phone: string }
Response: { updated user object }

POST /api/customers/change-password
Body: { customerId: string, oldPassword: string, newPassword: string }
Response: { success: boolean, message: string }
```

### Step 3: Authentication Token

The frontend automatically sends the authentication token in the Authorization header:
```
Authorization: Bearer {token}
```

Configure your backend to validate this token for protected routes.

### Step 4: CORS Configuration

Make sure your backend allows requests from the frontend origin:
```javascript
// Example for Express.js
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🎨 Design Features

- **Modern Banking UI** - Clean and professional design
- **Responsive Layout** - Works on desktop, tablet, and mobile
- **Navy Blue & Light Blue Theme** - Professional banking colors
- **Smooth Animations** - Fade-in and slide-in transitions
- **Hover Effects** - Interactive elements with visual feedback
- **Rounded Cards** - Modern card-based layout
- **Professional Typography** - Clear and readable fonts
- **Icon Integration** - Beautiful Lucide React icons
- **Data Visualization** - Interactive charts for balance trends
- **Toast Notifications** - User-friendly feedback system
- **Loading States** - Clear loading indicators
- **Form Validation** - Client-side validation with error messages
- **Confirmation Modals** - Safety confirmation for critical actions

## 🔒 Security Features

- Protected routes with authentication
- Token-based authentication
- Password show/hide toggle
- Session management
- Secure API communication
- Input validation
- Transaction confirmation
- Auto logout on token expiration

## 🌟 Key Highlights for Presentation

1. **Professional UI/UX** - Modern banking interface that looks production-ready
2. **Complete Feature Set** - All banking operations implemented
3. **Mock Data System** - Works standalone without backend
4. **Easy Backend Integration** - Clear API structure and documentation
5. **Responsive Design** - Works on all devices
6. **Interactive Charts** - Visual data representation
7. **Transaction History** - Complete transaction management with filters
8. **Export Functionality** - Download transactions as CSV
9. **Profile Management** - Complete user profile CRUD operations
10. **Real-time Updates** - Balance updates after each transaction

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
# Kill the process using port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or change the port in vite.config.js
```

### Dependencies Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Issues
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

## 📦 Production Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Deploy to Netlify
1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Deploy to Vercel
1. Connect your repository to Vercel
2. Framework: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

## 🤝 Contributing

This is a college project for educational purposes.

## 📄 License

This project is created for educational purposes as part of a college project.

## 👨‍💻 Author

**College Project**  
Banking Transaction Management System Frontend

## 🙏 Acknowledgments

- React.js Team
- Vite Team
- Tailwind CSS Team
- Lucide Icons
- Recharts Library

## 📞 Support

For questions or issues regarding this project, please contact your project supervisor or team members.

---

**Note:** This is a frontend-only application currently running with mock data. To use with a real backend, update the `.env` file and ensure your backend implements the required API endpoints as documented above.

**Happy Banking! 🏦**
