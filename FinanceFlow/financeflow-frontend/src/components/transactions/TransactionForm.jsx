import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelector from '../categories/CategorySelector';
import { useTransactions } from '../../context/TransactionContext';

const TransactionForm = () => {
  const navigate = useNavigate();
  // Use snake_case keys that backend expects: category_id, subcategory_id
  const [transaction, setTransaction] = useState({
    title: '',
    amount: '',
    date: '',
    location: '',
    description: '',
    category_id: '',
    subcategory_id: '',
    type: 'expense' // Par défaut c'est une dépense
  });

  const { addTransaction } = useTransactions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Copie la transaction pour modification
      const transactionToSend = { ...transaction };
      
      // Convertit le montant en nombre
      const amount = parseFloat(transaction.amount);
      
      // Si c'est une dépense, rend le montant négatif, sinon garde le positif
      if (transaction.type === 'expense') {
        transactionToSend.amount = -Math.abs(amount); // Dépense = négatif
      } else {
        transactionToSend.amount = Math.abs(amount);  // Ajout = positif
      }

      await addTransaction(transactionToSend);
      navigate('/'); // Redirige vers Dashboard après ajout
    } catch (error) {
      console.error('Error creating transaction:', error);
      // Optionnel: afficher un message d'erreur à l'utilisateur
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container py-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h2 className="card-title h4 mb-4">Nouvelle Transaction</h2>
          <form onSubmit={handleSubmit} className="max-width-500 mx-auto">
            <div className="mb-4">
              <label className="form-label">Type de transaction</label>
              <div className="d-flex gap-3">
                <button
                  type="button"
                  className={`btn flex-grow-1 ${
                    transaction.type === 'expense'
                      ? 'btn-danger'
                      : 'btn-outline-danger'
                  }`}
                  onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
                >
                  <i className="bi bi-arrow-up-circle me-2"></i>
                  Dépense
                </button>
                <button
                  type="button"
                  className={`btn flex-grow-1 ${
                    transaction.type === 'income'
                      ? 'btn-success'
                      : 'btn-outline-success'
                  }`}
                  onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
                >
                  <i className="bi bi-arrow-down-circle me-2"></i>
                  Ajout
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">
                <i className="bi bi-pencil me-2"></i>
                Titre
              </label>
              <input
                type="text"
                name="title"
                value={transaction.title}
                onChange={handleChange}
                className="form-control form-control-lg shadow-sm"
                placeholder="Ex: Courses au supermarché"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                <i className="bi bi-currency-euro me-2"></i>
                Montant
              </label>
              <div className="input-group input-group-lg shadow-sm">
                <input
                  type="number"
                  name="amount"
                  value={transaction.amount}
                  onChange={handleChange}
                  className="form-control"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
                <span className="input-group-text">€</span>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label">
                  <i className="bi bi-calendar-event me-2"></i>
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={transaction.date}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <i className="bi bi-geo-alt me-2"></i>
                  Lieu
                </label>
                <input
                  type="text"
                  name="location"
                  value={transaction.location}
                  onChange={handleChange}
                  className="form-control shadow-sm"
                  placeholder="Ex: Carrefour"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label">
                <i className="bi bi-tag me-2"></i>
                Catégorie
              </label>
              <CategorySelector
                selectedCategory={transaction.category_id}
                selectedSubcategory={transaction.subcategory_id}
                onCategoryChange={(categoryId) => handleChange({ target: { name: 'category_id', value: categoryId }})}
                onSubcategoryChange={(subcategoryId) => handleChange({ target: { name: 'subcategory_id', value: subcategoryId }})}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                <i className="bi bi-text-paragraph me-2"></i>
                Description
              </label>
              <textarea
                name="description"
                value={transaction.description}
                onChange={handleChange}
                rows="3"
                className="form-control shadow-sm"
                placeholder="Détails supplémentaires (optionnel)"
              />
            </div>

            <div className="d-flex gap-3">
              <button 
                type="button" 
                className="btn btn-outline-secondary flex-grow-1"
                onClick={() => navigate('/')}
              >
                <i className="bi bi-x-circle me-2"></i>
                Annuler
              </button>
              <button type="submit" className="btn btn-primary flex-grow-1 shadow">
                <i className="bi bi-check-circle me-2"></i>
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;