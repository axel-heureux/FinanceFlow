import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        <p className="mb-0">&copy; {new Date().getFullYear()} FinanceFlow. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
