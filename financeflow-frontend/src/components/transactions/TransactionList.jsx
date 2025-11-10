import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <div className="text-center py-5">
          <div className="text-muted mb-3">
            <i className="bi bi-receipt fs-1"></i>
          </div>
          <h5 className="text-muted">Aucune transaction trouvée</h5>
          <p className="text-muted mb-0">
            Essayez de modifier vos filtres ou ajoutez une nouvelle transaction.
          </p>
        </div>
      ) : (
        transactions.map(transaction => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default TransactionList;