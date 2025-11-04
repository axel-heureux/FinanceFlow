const API_BASE_URL = 'http://localhost/FinanceFlow/api';

const api = {
  // Transactions
  async getTransactions(filters = {}) {
    const response = await fetch(`${API_BASE_URL}/transactions?${new URLSearchParams(filters)}`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
  },

  async getRecentTransactions() {
    const response = await fetch(`${API_BASE_URL}/transactions/recent`);
    if (!response.ok) throw new Error('Failed to fetch recent transactions');
    return response.json();
  },

  async createTransaction(data) {
    const response = await fetch(`${API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create transaction');
    return response.json();
  },

  async deleteTransaction(id) {
    const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete transaction');
    return response.json();
  },

  // Categories
  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  async getSubcategories(categoryId) {
    const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/subcategories`);
    if (!response.ok) throw new Error('Failed to fetch subcategories');
    return response.json();
  },

  // Balance
  async getBalance() {
    const response = await fetch(`${API_BASE_URL}/balance`);
    if (!response.ok) throw new Error('Failed to fetch balance');
    return response.json();
  },
};

export default api;