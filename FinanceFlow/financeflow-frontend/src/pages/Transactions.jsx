import React, { useState, useEffect } from 'react';
import TransactionList from '../components/transactions/TransactionList';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: ''
  });

  useEffect(() => {
    // TODO: Fetch transactions with filters from API
    const fetchTransactions = async () => {
      try {
        // const response = await api.getTransactions(filters);
        // setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Transactions</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">Filtres</h2>
          <div className="row g-3">
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
              <label className="form-label">Montant min</label>
              <input
                type="number"
                name="amountMin"
                value={filters.amountMin}
                onChange={handleFilterChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6 col-lg-4">
              <label className="form-label">Montant max</label>
              <input
                type="number"
                name="amountMax"
                value={filters.amountMax}
                onChange={handleFilterChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>

      <TransactionList
        transactions={transactions}
        onDelete={async (id) => {
          try {
            // await api.deleteTransaction(id);
            setTransactions(prev => prev.filter(t => t.id !== id));
          } catch (error) {
            console.error('Error deleting transaction:', error);
          }
        }}
      />
    </div>
  );
};

export default Transactions;