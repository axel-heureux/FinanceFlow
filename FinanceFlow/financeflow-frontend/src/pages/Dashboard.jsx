import React from 'react';
import TransactionList from '../components/transactions/TransactionList';
import { useTransactions } from '../context/TransactionContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { balance, transactions, deleteTransaction } = useTransactions();
  // Affiche les 5 dernières transactions
  const recentTransactions = transactions.slice(0, 5);

  // Fonction pour formatter le montant avec le signe et la couleur
  const formatAmount = (amount) => {
    const formatted = Math.abs(amount).toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    });
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Tableau de bord</h1>
        <Link to="/add-transaction" className="btn btn-primary shadow-sm">
          <i className="bi bi-plus-circle me-2"></i>
          Nouvelle Transaction
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 bg-gradient h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="card-title h5 mb-0">Solde actuel</h2>
                <i className="bi bi-wallet2 text-primary fs-4"></i>
              </div>
              <p className={`display-4 fw-bold mb-2 ${balance >= 0 ? 'text-success' : 'text-danger'}`}>
                {formatAmount(balance)}
              </p>
              <p className="text-success mb-0">
                <small><i className="bi bi-piggy-bank me-1"></i>Solde initial : 1 000,00 €</small>
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-lg-6 mt-4 mt-lg-0">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h5 mb-0">Transactions récentes</h2>
                <Link to="/transactions" className="btn btn-sm btn-outline-primary">
                  Voir tout
                </Link>
              </div>
              <TransactionList
                transactions={recentTransactions}
                onDelete={deleteTransaction}
              />
              {recentTransactions.length === 0 && (
                <div className="text-center text-muted py-4">
                  <i className="bi bi-receipt fs-1"></i>
                  <p className="mt-2">Aucune transaction</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;