import React from '../../../vendors/react';
import FormNav from '../../components/form-nav/form-nav';
import Navbar from '../../components/navbar/navbar';

const IndexPage = () => {
  return (
    <div className="app">
      <Navbar />
      <br />
      <div className="container">
        <FormNav />
        <br />
        <form>
          <div className="form-group">
            <label htmlFor="name">Name: *</label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role:</label>
            <input type="text" className="form-control" id="role" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: *</label>
            <input
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
              type="password"
              className="form-control"
              id="password"
              minLength="10"
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
