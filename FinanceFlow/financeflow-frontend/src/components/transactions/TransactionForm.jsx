import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelector from '../categories/CategorySelector';

const TransactionForm = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({
    title: '',
    amount: '',
    date: '',
    location: '',
    description: '',
    categoryId: '',
    subcategoryId: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to save transaction
    try {
      // await api.createTransaction(transaction);
      navigate('/transactions');
    } catch (error) {
      console.error('Error creating transaction:', error);
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
      <form onSubmit={handleSubmit} className="max-width-500 mx-auto">
        <div className="mb-3">
          <label className="form-label">Titre</label>
          <input
            type="text"
            name="title"
            value={transaction.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Montant</label>
          <input
            type="number"
            name="amount"
            value={transaction.amount}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            value={transaction.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Lieu</label>
          <input
            type="text"
            name="location"
            value={transaction.location}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <CategorySelector
          selectedCategory={transaction.categoryId}
          selectedSubcategory={transaction.subcategoryId}
          onCategoryChange={(categoryId) => handleChange({ target: { name: 'categoryId', value: categoryId }})}
          onSubcategoryChange={(subcategoryId) => handleChange({ target: { name: 'subcategoryId', value: subcategoryId }})}
        />

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={transaction.description}
            onChange={handleChange}
            rows="3"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Enregistrer la transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;