import React from '../../../vendors/react';
import {Link, useLocation} from '../../../vendors/wouter/index';
import useForm from '../../hooks/use-form/use-form';

const FormNav = () => {
  const [location] = useLocation();
  const [form] = useForm();

  const linkClassName = (path, step) =>
    'nav-link' +
    (location === path ? ' active' : '') +
    (form.step < step ? ' disabled' : '');

  return (
    <ul className="nav nav-pills nav-fill form-nav">
      <li className="nav-item">
        <Link className={linkClassName('/', 1)} href="/">
          User
        </Link>
      </li>
      <li className="nav-item">
        <Link className={linkClassName('/privacy', 2)} href="/privacy">
          Privacy
        </Link>
      </li>
      <li className="nav-item">
        <Link className={linkClassName('/done', 3)} href="/done">
          Done
        </Link>
      </li>
    </ul>
  );
};

export default FormNav;
