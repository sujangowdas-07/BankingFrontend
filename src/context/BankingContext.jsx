import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { bankingService } from '../services/bankingService';

const BankingContext = createContext(null);

export const useBanking = () => {
  const context = useContext(BankingContext);
  if (!context) {
    throw new Error('useBanking must be used within a BankingProvider');
  }
  return context;
};

export const BankingProvider = ({ children }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(user?.balance || 0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshBalance = async () => {
    if (!user?.accountNumber) return;
    
    try {
      setLoading(true);
      const response = await bankingService.getAccountBalance(user.accountNumber);
      setBalance(response.data.balance);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deposit = async (amount, description) => {
    if (!user?.accountNumber) throw new Error('No account found');
    
    try {
      setLoading(true);
      const response = await bankingService.deposit(user.accountNumber, amount, description);
      setBalance(response.data.newBalance);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async (amount, description) => {
    if (!user?.accountNumber) throw new Error('No account found');
    
    try {
      setLoading(true);
      const response = await bankingService.withdraw(user.accountNumber, amount, description);
      setBalance(response.data.newBalance);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const transfer = async (beneficiaryAccount, amount, remarks) => {
    if (!user?.accountNumber) throw new Error('No account found');
    
    try {
      setLoading(true);
      const response = await bankingService.transfer(
        user.accountNumber,
        beneficiaryAccount,
        amount,
        remarks
      );
      setBalance(response.data.newBalance);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getTransactionHistory = async (filters) => {
    if (!user?.accountNumber) throw new Error('No account found');
    
    try {
      setLoading(true);
      const response = await bankingService.getTransactionHistory(user.accountNumber, filters);
      setTransactions(response.data);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    balance,
    transactions,
    loading,
    refreshBalance,
    deposit,
    withdraw,
    transfer,
    getTransactionHistory
  };

  return <BankingContext.Provider value={value}>{children}</BankingContext.Provider>;
};
