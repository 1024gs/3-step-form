import React from '../../../vendors/react';
import FormNav from '../../components/form-nav/form-nav';
import Navbar from '../../components/navbar/navbar';
import useForm from '../../hooks/use-form/use-form';
import {useLocation} from '../../../vendors/wouter/index';

const PrivacyPage = () => {
  const [form, patchForm] = useForm();
  const [, setLocation] = useLocation();

  const submit = (e) => {
    e.preventDefault();
    patchForm('step')(3);
    setLocation('/done');
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
            <div className="form-check">
              <input
                checked={form.receiveUpdates}
                onChange={patchForm('receiveUpdates')}
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
                checked={form.receiveCommunication}
                onChange={patchForm('receiveCommunication')}
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
