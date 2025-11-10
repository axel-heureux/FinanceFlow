// Backend API base URL (point to the PHP backend)
const API_BASE_URL = 'http://localhost/FinanceFlow/backend/api';

const api = {
  // Transactions
  async getTransactions(filters = {}) {
    const response = await fetch(`${API_BASE_URL}/transactions?${new URLSearchParams(filters)}`);
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return response.json();
  },

  async getRecentTransactions() {
    // backend currently returns all transactions; frontend can slice if needed
    const response = await fetch(`${API_BASE_URL}/transactions`);
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
    // backend expects subcategories with query param ?category_id=ID
    const response = await fetch(`${API_BASE_URL}/subcategories?category_id=${encodeURIComponent(categoryId)}`);
    if (!response.ok) throw new Error('Failed to fetch subcategories');
    return response.json();
  },

  // Balance
  async getBalance() {
    const response = await fetch(`${API_BASE_URL}/balance`);
    if (!response.ok) throw new Error('Failed to fetch balance');
    return response.json();
  },

  async updateInitialBalance(initialBalance) {
    const response = await fetch(`${API_BASE_URL}/balance`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ initial_balance: initialBalance }),
    });
    if (!response.ok) throw new Error('Failed to update initial balance');
    return response.json();
  },
};

export default api;