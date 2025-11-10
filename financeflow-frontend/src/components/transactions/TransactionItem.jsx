import React from 'react';

const TransactionItem = ({ transaction, onDelete }) => {
  const { id, title, amount, date, location, category_name, subcategory_name } = transaction;

  // Format le montant avec signe + ou -
  const formatAmount = (amount) => {
    const formatted = Math.abs(amount).toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    });
    return amount >= 0 ? `+${formatted}` : `-${formatted}`;
  };

  return (
    <div className="card border-0 shadow-sm mb-3 position-relative overflow-hidden">
      <div className="position-absolute h-100" style={{
        width: '4px',
        left: 0,
        top: 0,
        backgroundColor: amount >= 0 ? 'var(--bs-success)' : 'var(--bs-danger)'
      }}></div>
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="rounded-circle p-2 me-2" style={{
              backgroundColor: amount >= 0 ? 'rgba(25, 135, 84, 0.1)' : 'rgba(220, 53, 69, 0.1)'
            }}>
              <i className={`bi ${amount >= 0 ? 'bi-arrow-down-circle' : 'bi-arrow-up-circle'} fs-5 ${
                amount >= 0 ? 'text-success' : 'text-danger'
              }`}></i>
            </div>
          </div>
          <div className="col">
            <h5 className="card-title h6 mb-1">{title}</h5>
            <div className="d-flex align-items-center gap-2">
              <small className="text-muted">
                <i className="bi bi-calendar-event me-1"></i>
                {new Date(date).toLocaleDateString()}
              </small>
              {location && (
                <>
                  <span className="text-muted">•</span>
                  <small className="text-muted">
                    <i className="bi bi-geo-alt me-1"></i>
                    {location}
                  </small>
                </>
              )}
            </div>
            {(category_name || subcategory_name) && (
              <div className="mt-1">
                <span className="badge bg-light text-secondary">
                  <i className="bi bi-tag me-1"></i>
                  {category_name} {subcategory_name ? `/ ${subcategory_name}` : ''}
                </span>
              </div>
            )}
          </div>
          <div className="col-auto text-end">
            <div className="d-flex align-items-center gap-3">
              <h5 className={`h6 mb-0 ${amount >= 0 ? 'text-success' : 'text-danger'}`}>
                {formatAmount(amount)}
              </h5>
              <button
                onClick={() => onDelete(id)}
                className="btn btn-outline-danger btn-sm"
                title="Supprimer la transaction"
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;