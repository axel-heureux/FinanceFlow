import React from 'react';

const TransactionItem = ({ transaction, onDelete }) => {
  const { id, title, amount, date, location, category, subcategory } = transaction;

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <h5 className="card-title">{title}</h5>
            <p className="card-text text-muted">{new Date(date).toLocaleDateString()}</p>
            {location && <p className="card-text small text-muted">{location}</p>}
          </div>
          <div className="col text-end">
            <h5 className={`card-title ${amount >= 0 ? 'text-success' : 'text-danger'}`}>
              {amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
            </h5>
            <p className="card-text text-muted small">
              {category?.name} {subcategory?.name ? `/ ${subcategory.name}` : ''}
            </p>
          </div>
        </div>
        <div className="text-end mt-2">
          <button
            onClick={() => onDelete(id)}
            className="btn btn-outline-danger btn-sm"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;