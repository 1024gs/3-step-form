import React from '../../../vendors/react';
import FormNav from '../../components/form-nav/form-nav';
import Navbar from '../../components/navbar/navbar';
import useForm from '../../hooks/use-form/use-form';
import {useLocation} from '../../../vendors/wouter/index';

const IndexPage = () => {
  const [form, patchForm] = useForm();
  const [, setLocation] = useLocation();

  const submit = (e) => {
    e.preventDefault();
    patchForm('step')(2);
    setLocation('/privacy');
  };

  return (
    <div className="app">
      <Navbar />
      <br />
      <div className="container">
        <FormNav />
        <br />
        <form onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="name">Name: *</label>
            <input
              value={form.name}
              onChange={patchForm('name')}
              type="text"
              className="form-control"
              id="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input
              value={form.role}
              onChange={patchForm('role')}
              type="text"
              className="form-control"
              id="role"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: *</label>
            <input
              value={form.email}
              onChange={patchForm('email')}
              type="email"
              className="form-control"
              id="email"
              pattern=".+@.+"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: *</label>
            <input
              value={form.password}
              onChange={patchForm('password')}
              type="password"
              className="form-control"
              id="password"
              minLength="10"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]+$"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default IndexPage;
