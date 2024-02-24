import React, { useState } from 'react';
import './css/Menu.css';

const Menu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header>
      <section className="header-title-line">
        <h1>Acme Co.</h1>
        <button className={`menu-button ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="menu-icon"></div>
        </button>
      </section>

      <nav className={isMenuOpen ? 'open' : ''}>
        <ul>
          <li><a href="products.html">Products</a></li>
          <li><a href="#">Forum</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
