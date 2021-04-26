import React, {useEffect} from '../../../vendors/react';
import FormNav from '../../components/form-nav/form-nav';
import Navbar from '../../components/navbar/navbar';
import useForm from '../../hooks/use-form/use-form';

const DonePage = () => {
  const [form] = useForm();

  useEffect(() => {
    console.log(form);
  }, [form]);

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
