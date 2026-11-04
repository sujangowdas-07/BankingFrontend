// Mock users for demo
export const mockUsers = [
  {
    id: 'CUST001',
    customerId: 'CUST001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    password: 'password123',
    accountNumber: '1234567890',
    accountType: 'Savings Account',
    balance: 50000.00,
    status: 'Active'
  },
  {
    id: 'CUST002',
    customerId: 'CUST002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 234 567 8901',
    password: 'password123',
    accountNumber: '1234567891',
    accountType: 'Current Account',
    balance: 75000.00,
    status: 'Active'
  },
  {
    id: 'CUST003',
    customerId: 'CUST003',
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    phone: '+1 234 567 8902',
    password: 'password123',
    accountNumber: '1234567892',
    accountType: 'Savings Account',
    balance: 100000.00,
    status: 'Active'
  }
];

// Mock transactions
export const mockTransactions = [
  {
    id: 'TXN001',
    accountNumber: '1234567890',
    type: 'DEPOSIT',
    amount: 5000,
    description: 'Salary Credit',
    date: '2026-11-01T10:30:00',
    status: 'SUCCESS',
    openingBalance: 45000,
    closingBalance: 50000
  },
  {
    id: 'TXN002',
    accountNumber: '1234567890',
    type: 'WITHDRAWAL',
    amount: 2000,
    description: 'ATM Withdrawal',
    date: '2026-11-02T14:20:00',
    status: 'SUCCESS',
    openingBalance: 50000,
    closingBalance: 48000
  },
  {
    id: 'TXN003',
    accountNumber: '1234567890',
    type: 'DEPOSIT',
    amount: 3000,
    description: 'Cash Deposit',
    date: '2026-11-03T09:15:00',
    status: 'SUCCESS',
    openingBalance: 48000,
    closingBalance: 51000
  },
  {
    id: 'TXN004',
    accountNumber: '1234567890',
    type: 'TRANSFER',
    amount: 1000,
    description: 'Transfer to 1234567891',
    date: '2026-11-03T16:45:00',
    status: 'SUCCESS',
    openingBalance: 51000,
    closingBalance: 50000,
    beneficiaryAccount: '1234567891',
    beneficiaryName: 'Jane Smith'
  },
  {
    id: 'TXN005',
    accountNumber: '1234567891',
    type: 'TRANSFER',
    amount: 1000,
    description: 'Transfer from 1234567890',
    date: '2026-11-03T16:45:00',
    status: 'SUCCESS',
    openingBalance: 74000,
    closingBalance: 75000,
    senderAccount: '1234567890',
    senderName: 'John Doe'
  },
  {
    id: 'TXN006',
    accountNumber: '1234567891',
    type: 'DEPOSIT',
    amount: 10000,
    description: 'Business Income',
    date: '2026-10-30T11:00:00',
    status: 'SUCCESS',
    openingBalance: 65000,
    closingBalance: 75000
  },
  {
    id: 'TXN007',
    accountNumber: '1234567892',
    type: 'DEPOSIT',
    amount: 50000,
    description: 'Initial Deposit',
    date: '2026-10-28T10:00:00',
    status: 'SUCCESS',
    openingBalance: 50000,
    closingBalance: 100000
  },
  {
    id: 'TXN008',
    accountNumber: '1234567892',
    type: 'DEPOSIT',
    amount: 25000,
    description: 'Investment Returns',
    date: '2026-10-29T15:30:00',
    status: 'SUCCESS',
    openingBalance: 75000,
    closingBalance: 100000
  }
];

let transactionCounter = 9;

export const generateTransactionId = () => {
  const id = `TXN${String(transactionCounter).padStart(3, '0')}`;
  transactionCounter++;
  return id;
};
