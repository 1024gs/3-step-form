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
        Privacy
      </div>
    </div>
  );
};

export default PrivacyPage;
