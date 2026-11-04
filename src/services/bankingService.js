import api from './api';
import { mockUsers, mockTransactions, generateTransactionId } from './mockData';

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const bankingService = {
  async getAccountBalance(accountNumber) {
    if (USE_MOCK_API) {
      await delay(500);
      
      const user = mockUsers.find(u => u.accountNumber === accountNumber);
      if (!user) {
        throw new Error('Account not found');
      }
      
      return {
        success: true,
        data: {
          accountNumber: user.accountNumber,
          accountType: user.accountType,
          balance: user.balance,
          availableBalance: user.balance,
          status: user.status
        }
      };
    } else {
      try {
        const response = await api.get(`/accounts/balance?accountNumber=${accountNumber}`);
        return { success: true, data: response.data };
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch balance');
      }
    }
  },

  async deposit(accountNumber, amount, description) {
    if (USE_MOCK_API) {
      await delay(1000);
      
      const user = mockUsers.find(u => u.accountNumber === accountNumber);
      if (!user) {
        throw new Error('Account not found');
      }
      
      if (amount <= 0) {
        throw new Error('Amount must be greater than zero');
      }
      
      const openingBalance = user.balance;
      user.balance += amount;
      const closingBalance = user.balance;
      
      const transaction = {
        id: generateTransactionId(),
        accountNumber,
        type: 'DEPOSIT',
        amount,
        description: description || 'Cash Deposit',
        date: new Date().toISOString(),
        status: 'SUCCESS',
        openingBalance,
        closingBalance
      };
      
      mockTransactions.unshift(transaction);
      
      return {
        success: true,
        data: {
          transaction,
          newBalance: user.balance
        }
      };
    } else {
      try {
        const response = await api.post('/transactions/deposit', {
          accountNumber,
          amount,
          description
        });
        return { success: true, data: response.data };
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Deposit failed');
      }
    }
  },

  async withdraw(accountNumber, amount, description) {
    if (USE_MOCK_API) {
      await delay(1000);
      
      const user = mockUsers.find(u => u.accountNumber === accountNumber);
      if (!user) {
        throw new Error('Account not found');
      }
      
      if (amount <= 0) {
        throw new Error('Amount must be greater than zero');
      }
      
      if (amount > user.balance) {
        throw new Error('Insufficient balance');
      }
      
      const openingBalance = user.balance;
      user.balance -= amount;
      const closingBalance = user.balance;
      
      const transaction = {
        id: generateTransactionId(),
        accountNumber,
        type: 'WITHDRAWAL',
        amount,
        description: description || 'Cash Withdrawal',
        date: new Date().toISOString(),
        status: 'SUCCESS',
        openingBalance,
        closingBalance
      };
      
      mockTransactions.unshift(transaction);
      
      return {
        success: true,
        data: {
          transaction,
          newBalance: user.balance
        }
      };
    } else {
      try {
        const response = await api.post('/transactions/withdraw', {
          accountNumber,
          amount,
          description
        });
        return { success: true, data: response.data };
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Withdrawal failed');
      }
    }
  },

  async transfer(senderAccount, beneficiaryAccount, amount, remarks) {
    if (USE_MOCK_API) {
      await delay(1200);
      
      const sender = mockUsers.find(u => u.accountNumber === senderAccount);
      const beneficiary = mockUsers.find(u => u.accountNumber === beneficiaryAccount);
      
      if (!sender) {
        throw new Error('Sender account not found');
      }
      
      if (!beneficiary) {
        throw new Error('Beneficiary account not found');
      }
      
      if (senderAccount === beneficiaryAccount) {
        throw new Error('Cannot transfer to the same account');
      }
      
      if (amount <= 0) {
        throw new Error('Amount must be greater than zero');
      }
      
      if (amount > sender.balance) {
        throw new Error('Insufficient balance');
      }
      
      // Debit sender
      const senderOpeningBalance = sender.balance;
      sender.balance -= amount;
      const senderClosingBalance = sender.balance;
      
      // Credit beneficiary
      const beneficiaryOpeningBalance = beneficiary.balance;
      beneficiary.balance += amount;
      const beneficiaryClosingBalance = beneficiary.balance;
      
      const transactionId = generateTransactionId();
      const date = new Date().toISOString();
      
      const senderTransaction = {
        id: transactionId,
        accountNumber: senderAccount,
        type: 'TRANSFER',
        amount,
        description: remarks || `Transfer to ${beneficiaryAccount}`,
        date,
        status: 'SUCCESS',
        openingBalance: senderOpeningBalance,
        closingBalance: senderClosingBalance,
        beneficiaryAccount,
        beneficiaryName: beneficiary.name
      };
      
      const beneficiaryTransaction = {
        id: generateTransactionId(),
        accountNumber: beneficiaryAccount,
        type: 'TRANSFER',
        amount,
        description: remarks || `Transfer from ${senderAccount}`,
        date,
        status: 'SUCCESS',
        openingBalance: beneficiaryOpeningBalance,
        closingBalance: beneficiaryClosingBalance,
        senderAccount,
        senderName: sender.name
      };
      
      mockTransactions.unshift(senderTransaction);
      mockTransactions.unshift(beneficiaryTransaction);
      
      return {
        success: true,
        data: {
          transaction: senderTransaction,
          newBalance: sender.balance,
          beneficiaryName: beneficiary.name
        }
      };
    } else {
      try {
        const response = await api.post('/transactions/transfer', {
          senderAccount,
          beneficiaryAccount,
          amount,
          remarks
        });
        return { success: true, data: response.data };
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Transfer failed');
      }
    }
  },

  async getTransactionHistory(accountNumber, filters = {}) {
    if (USE_MOCK_API) {
      await delay(600);
      
      let transactions = mockTransactions.filter(
        t => t.accountNumber === accountNumber
      );
      
      // Apply filters
      if (filters.type && filters.type !== 'ALL') {
        transactions = transactions.filter(t => t.type === filters.type);
      }
      
      if (filters.startDate) {
        transactions = transactions.filter(t => new Date(t.date) >= new Date(filters.startDate));
      }
      
      if (filters.endDate) {
        transactions = transactions.filter(t => new Date(t.date) <= new Date(filters.endDate));
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        transactions = transactions.filter(t => 
          t.id.toLowerCase().includes(searchLower) ||
          t.description.toLowerCase().includes(searchLower)
        );
      }
      
      return {
        success: true,
        data: transactions
      };
    } else {
      try {
        const params = new URLSearchParams();
        params.append('accountNumber', accountNumber);
        
        if (filters.type) params.append('type', filters.type);
        if (filters.startDate) params.append('startDate', filters.startDate);
        if (filters.endDate) params.append('endDate', filters.endDate);
        
        const response = await api.get(`/transactions/history?${params.toString()}`);
        return { success: true, data: response.data };
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch transactions');
      }
    }
  },

  async getProfile(customerId) {
    if (USE_MOCK_API) {
      await delay(500);
      
      const user = mockUsers.find(u => u.customerId === customerId);
      if (!user) {
        throw new Error('User not found');
      }
      
      const { password: _, ...userWithoutPassword } = user;
      return {
        success: true,
        data: userWithoutPassword
      };
    } else {
      try {
        const response = await api.get(`/customers/profile?customerId=${customerId}`);
        return { success: true, data: response.data };
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch profile');
      }
    }
  },

  async updateProfile(customerId, updates) {
    if (USE_MOCK_API) {
      await delay(800);
      
      const user = mockUsers.find(u => u.customerId === customerId);
      if (!user) {
        throw new Error('User not found');
      }
      
      Object.assign(user, updates);
      
      const { password: _, ...userWithoutPassword } = user;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return {
        success: true,
        data: userWithoutPassword
      };
    } else {
      try {
        const response = await api.put('/customers/profile', { customerId, ...updates });
        
        if (response.data) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        
        return { success: true, data: response.data };
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update profile');
      }
    }
  },

  async changePassword(customerId, oldPassword, newPassword) {
    if (USE_MOCK_API) {
      await delay(800);
      
      const user = mockUsers.find(u => u.customerId === customerId);
      if (!user) {
        throw new Error('User not found');
      }
      
      if (user.password !== oldPassword) {
        throw new Error('Current password is incorrect');
      }
      
      user.password = newPassword;
      
      return {
        success: true,
        message: 'Password changed successfully'
      };
    } else {
      try {
        const response = await api.post('/customers/change-password', {
          customerId,
          oldPassword,
          newPassword
        });
        return { success: true, data: response.data };
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to change password');
      }
    }
  }
};
