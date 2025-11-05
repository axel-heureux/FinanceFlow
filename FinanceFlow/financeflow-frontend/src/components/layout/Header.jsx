import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm bg-white">
      <div className="container py-2">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <i className="bi bi-wallet2 text-primary fs-4 me-2"></i>
          <span className="fw-bold">FinanceFlow</span>
        </Link>
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <i className="bi bi-list fs-4"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2">
              <Link to="/" className="nav-link d-flex align-items-center">
                <i className="bi bi-house me-2"></i>
                Dashboard
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/transactions" className="nav-link d-flex align-items-center">
                <i className="bi bi-receipt me-2"></i>
                Transactions
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/add-transaction" className="nav-link d-flex align-items-center">
                <i className="bi bi-plus-circle me-2"></i>
                Nouvelle Transaction
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
