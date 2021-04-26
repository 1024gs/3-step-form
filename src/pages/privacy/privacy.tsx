import React from '../../../vendors/react';
import FormNav from '../../components/form-nav/form-nav';
import Navbar from '../../components/navbar/navbar';

const PrivacyPage = () => {
  return (
    <div className="app">
      <Navbar />
      <br />
      <div className="container">
        <FormNav />
        <br />

        <form>
          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="updates"
                id="updates"
              />
              <label className="form-check-label" htmlFor="updates">
                Receive updates about Tray.io product by email
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="communication"
                id="communication"
              />
              <label className="form-check-label" htmlFor="communication">
                Receive communication by email for other products created by the
                Tray.io team
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PrivacyPage;
