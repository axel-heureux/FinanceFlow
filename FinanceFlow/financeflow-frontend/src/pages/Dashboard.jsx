import React, { useState, useEffect } from 'react';
import TransactionList from '../components/transactions/TransactionList';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  useEffect(() => {
    // TODO: Fetch balance and recent transactions from API
    const fetchDashboardData = async () => {
      try {
        // const balanceResponse = await api.getBalance();
        // const transactionsResponse = await api.getRecentTransactions();
        // setBalance(balanceResponse.data);
        // setRecentTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Tableau de bord</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">Solde actuel</h2>
          <p className={`display-4 ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
            {balance.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
      </div>

      <div>
        <h2 className="mb-3">Transactions récentes</h2>
        <TransactionList
          transactions={recentTransactions}
          onDelete={async (id) => {
            try {
              // await api.deleteTransaction(id);
              setRecentTransactions(prev => prev.filter(t => t.id !== id));
            } catch (error) {
              console.error('Error deleting transaction:', error);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;