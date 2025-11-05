import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-top py-4 mt-auto">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <i className="bi bi-wallet2 text-primary fs-4 me-2"></i>
              <span className="text-dark fw-bold">FinanceFlow</span>
            </div>
            <p className="text-muted small mb-0 mt-2">
              Gérez vos finances en toute simplicité
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <p className="text-muted mb-0">
              &copy; {new Date().getFullYear()} FinanceFlow. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
