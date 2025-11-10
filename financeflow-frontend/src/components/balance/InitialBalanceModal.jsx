import React, { useState } from 'react';

const InitialBalanceModal = ({ show, onClose, currentInitialBalance, onUpdate }) => {
  const [initialBalance, setInitialBalance] = useState(currentInitialBalance);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (initialBalance === '') {
      setError('Veuillez entrer un montant');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onUpdate(parseFloat(initialBalance));
      onClose();
    } catch (err) {
      setError('Erreur lors de la mise à jour du solde initial');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setInitialBalance(currentInitialBalance);
    setError('');
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              <i className="bi bi-piggy-bank me-2"></i>
              Modifier le solde initial
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={handleClose}
              disabled={loading}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}
              
              <div className="mb-3">
                <label htmlFor="initialBalance" className="form-label">
                  Nouveau solde initial (€)
                </label>
                <div className="input-group">
                  <span className="input-group-text">€</span>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    id="initialBalance"
                    value={initialBalance}
                    onChange={(e) => setInitialBalance(e.target.value)}
                    placeholder="0.00"
                    disabled={loading}
                    autoFocus
                  />
                </div>
              </div>

              <div className="alert alert-info" role="alert">
                <i className="bi bi-info-circle me-2"></i>
                <strong>Attention :</strong> Modifier le solde initial ajustera automatiquement 
                votre solde actuel en fonction de la différence.
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleClose}
                disabled={loading}
              >
                Annuler
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Mise à jour...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Mettre à jour
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InitialBalanceModal;