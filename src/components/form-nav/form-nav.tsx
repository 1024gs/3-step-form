import React from '../../../vendors/react';
import {Link} from '../../../vendors/wouter/index';

const FormNav = () => {
  return (
    <ul className="nav nav-pills nav-fill">
      <li className="nav-item">
        <Link className="nav-link active" href="/">
          User
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link disabled" href="/privacy">
          Privacy
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link disabled" href="/done">
          Done
        </Link>
      </li>
    </ul>
  );
};

export default FormNav;
