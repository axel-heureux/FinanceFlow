import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, onDelete }) => {
  return (
    <div className="space-y-4">
      {transactions.length === 0 ? (
        <p className="text-center text-gray-500">Aucune transaction trouvée</p>
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