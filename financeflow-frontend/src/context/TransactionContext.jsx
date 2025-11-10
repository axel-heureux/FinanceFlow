import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const TransactionContext = createContext();

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [initialBalance, setInitialBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await api.getTransactions();
      if (response.success) {
        setTransactions(response.data);
      }
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error(err);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await api.getBalance();
      if (response.success) {
        setBalance(response.data);
        setInitialBalance(response.initial_balance);
      }
      setError(null);
    } catch (err) {
      setError('Failed to fetch balance');
      console.error(err);
    }
  };

  const updateInitialBalance = async (newInitialBalance) => {
    try {
      const response = await api.updateInitialBalance(newInitialBalance);
      if (response.success) {
        setInitialBalance(response.data.initial_balance);
        setBalance(response.data.current_balance);
        setError(null);
        return response;
      }
      throw new Error(response.message);
    } catch (err) {
      setError('Failed to update initial balance');
      console.error(err);
      throw err;
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const response = await api.createTransaction(transactionData);
      // Si la transaction a été créée, on recharge toute la liste pour éviter les incohérences
      if (response.success) {
        await fetchTransactions();
        await fetchBalance();
      }
      setError(null);
    } catch (err) {
      setError('Failed to add transaction');
      console.error(err);
      throw err;
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await api.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
      await fetchBalance();
      setError(null);
    } catch (err) {
      setError('Failed to delete transaction');
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchTransactions(), fetchBalance()]);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  const value = {
    transactions,
    balance,
    initialBalance,
    loading,
    error,
    addTransaction,
    deleteTransaction,
    updateInitialBalance,
    refreshTransactions: fetchTransactions,
    refreshBalance: fetchBalance,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContext;