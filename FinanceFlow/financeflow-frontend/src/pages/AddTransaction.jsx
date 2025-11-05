import React from 'react';
import TransactionForm from '../components/transactions/TransactionForm';

const AddTransaction = () => {
  return (
    <div className="container py-4">
      <h1 className="mb-4">Nouvelle Transaction</h1>
      <TransactionForm />
    </div>
  );
};

export default AddTransaction;