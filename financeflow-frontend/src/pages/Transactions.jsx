import React, { useState, useEffect } from 'react';
import TransactionList from '../components/transactions/TransactionList';
import api from '../services/api';

const Transactions = () => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: ''
  });

  // Charger toutes les transactions au démarrage
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getTransactions();
        if (response.success) {
          setAllTransactions(response.data);
          setFilteredTransactions(response.data);
        } else {
          setError(response.message || 'Erreur lors du chargement des transactions');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Erreur lors du chargement des transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Appliquer les filtres
  useEffect(() => {
    let filtered = [...allTransactions];

    // Filtrer par date de début
    if (filters.dateFrom) {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const fromDate = new Date(filters.dateFrom);
        return transactionDate >= fromDate;
      });
    }

    // Filtrer par date de fin
    if (filters.dateTo) {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const toDate = new Date(filters.dateTo);
        return transactionDate <= toDate;
      });
    }

    // Filtrer par montant minimum
    if (filters.amountMin !== '') {
      filtered = filtered.filter(transaction => {
        return parseFloat(transaction.amount) >= parseFloat(filters.amountMin);
      });
    }

    // Filtrer par montant maximum
    if (filters.amountMax !== '') {
      filtered = filtered.filter(transaction => {
        return parseFloat(transaction.amount) <= parseFloat(filters.amountMax);
      });
    }

    // Filtrer par catégorie (si vous implémentez cette fonctionnalité plus tard)
    if (filters.category) {
      filtered = filtered.filter(transaction => {
        return transaction.category_id === parseInt(filters.category);
      });
    }

    setFilteredTransactions(filtered);
  }, [allTransactions, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      dateFrom: '',
      dateTo: '',
      amountMin: '',
      amountMax: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const setQuickFilter = (days) => {
    const today = new Date();
    const fromDate = new Date();
    fromDate.setDate(today.getDate() - days);
    
    setFilters(prev => ({
      ...prev,
      dateFrom: fromDate.toISOString().split('T')[0],
      dateTo: today.toISOString().split('T')[0]
    }));
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Transactions</h1>
        <div className="text-muted">
          {!loading && (
            <span>
              {filteredTransactions.length} transaction{filteredTransactions.length > 1 ? 's' : ''} 
              {hasActiveFilters && ` sur ${allTransactions.length}`}
            </span>
          )}
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="card-title mb-0">Filtres</h2>
            {hasActiveFilters && (
              <button 
                onClick={clearFilters}
                className="btn btn-outline-secondary btn-sm"
              >
                <i className="bi bi-x-circle me-1"></i>
                Effacer les filtres
              </button>
            )}
          </div>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label">Filtres rapides</label>
              <div className="d-flex gap-2 flex-wrap">
                <button 
                  onClick={() => setQuickFilter(7)}
                  className="btn btn-outline-primary btn-sm"
                >
                  7 derniers jours
                </button>
                <button 
                  onClick={() => setQuickFilter(30)}
                  className="btn btn-outline-primary btn-sm"
                >
                  30 derniers jours
                </button>
                <button 
                  onClick={() => setQuickFilter(90)}
                  className="btn btn-outline-primary btn-sm"
                >
                  3 derniers mois
                </button>
              </div>
            </div>

            <div className="col-md-6 col-lg-4">
              <label className="form-label">Catégorie</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Toutes les catégories</option>
                {/* TODO: Add categories */}
              </select>
            </div>

            <div className="col-md-6 col-lg-4">
              <label className="form-label">Date début</label>
              <input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 col-lg-4">
              <label className="form-label">Date fin</label>
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 col-lg-4">
              <label className="form-label">Montant min (€)</label>
              <input
                type="number"
                step="0.01"
                name="amountMin"
                value={filters.amountMin}
                onChange={handleFilterChange}
                className="form-control"
                placeholder="0.00"
              />
            </div>

            <div className="col-md-6 col-lg-4">
              <label className="form-label">Montant max (€)</label>
              <input
                type="number"
                step="0.01"
                name="amountMax"
                value={filters.amountMax}
                onChange={handleFilterChange}
                className="form-control"
                placeholder="1000.00"
              />
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && (
        <TransactionList
          transactions={filteredTransactions}
          onDelete={async (id) => {
            try {
              await api.deleteTransaction(id);
              setAllTransactions(prev => prev.filter(t => t.id !== id));
            } catch (error) {
              console.error('Error deleting transaction:', error);
              setError('Erreur lors de la suppression de la transaction');
            }
          }}
        />
      )}
    </div>
  );
};

export default Transactions;