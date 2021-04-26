import React from '../../../vendors/react';

const Navbar = ({brand = 'Tray.io'}: propTypes) => {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <span className="navbar-brand">{brand}</span>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Menu
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

interface propTypes {
  brand?: string;
}

export default Navbar;
