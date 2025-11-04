import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">FinanceFlow</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link to="/transactions" className="nav-link">Transactions</Link>
            </li>
            <li className="nav-item">
              <Link to="/add-transaction" className="nav-link">Nouvelle Transaction</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
