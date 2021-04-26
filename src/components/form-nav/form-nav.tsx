import React from '../../../vendors/react';
import {Link, useLocation} from '../../../vendors/wouter/index';

const FormNav = () => {
  const [location] = useLocation();

  const linkClassName = (path) =>
    'nav-link' + (location === path ? ' active' : '');

  return (
    <ul className="nav nav-pills nav-fill">
      <li className="nav-item">
        <Link className={linkClassName('/')} href="/">
          User
        </Link>
      </li>
      <li className="nav-item">
        <Link className={linkClassName('/privacy')} href="/privacy">
          Privacy
        </Link>
      </li>
      <li className="nav-item">
        <Link className={linkClassName('/done')} href="/done">
          Done
        </Link>
      </li>
    </ul>
  );
};

export default FormNav;
