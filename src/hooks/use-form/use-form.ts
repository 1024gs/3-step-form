import {useState, useEffect} from '../../../vendors/react';

const COOKIE_NAME = 'userform6180';

const getCookie = (name) => {
  const xs = document.cookie.split(';');
  let i = 0;
  while (i < xs.length) {
    const pairs = xs[i].split('=');
    if (pairs[0].trim() === name) {
      return pairs[1];
    }
    i += 1;
  }
};

const setCookie = (name, data) => {
  document.cookie =
    name +
    '=' +
    data +
    '; path=/; max-age=' +
    60 * 60 * 24 * 30 +
    '; samesite=lax';
};

const removeCookie = (name) => {
  document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

const defaultForm = () => ({
  name: '',
  role: '',
  email: '',
  password: '',
  receiveUpdates: true,
  receiveCommunication: false,
  step: 1,
});

const useForm = () => {
  const [form, setForm] = useState(defaultForm());

  useEffect(() => {
    const cookie = getCookie(COOKIE_NAME);
    if (cookie) {
      setForm(JSON.parse(cookie));
    } else {
      setCookie(COOKIE_NAME, JSON.stringify(defaultForm()));
    }
  }, []);

  const patchForm = (key) => (e) => {
    const newForm = {
      ...form,
      [key]: e.target ?
        e.target.type === 'checkbox' ?
          e.target.checked :
          e.target.value :
        e,
    };
    setCookie(COOKIE_NAME, JSON.stringify(newForm));
    setForm(newForm);
  };

  const clearForm = () => {
    removeCookie(COOKIE_NAME);
  };

  return [form, patchForm, clearForm];
};

export default useForm;
