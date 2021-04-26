import React from '../../../vendors/react';
import FormNav from '../../components/form-nav/form-nav';
import Navbar from '../../components/navbar/navbar';

const DonePage = () => {
  return (
    <div className="app">
      <Navbar />
      <br />
      <div className="container">
        <FormNav />
        <br />
        <h4 style={{textAlign: 'center'}}>Well done!</h4>
        <p style={{textAlign: 'center'}}>
          Please verify your email address, you should have received an email
          from us already!
        </p>
      </div>
    </div>
  );
};

export default DonePage;
