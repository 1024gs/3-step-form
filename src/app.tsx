import React from '../vendors/react';
import {Route} from '../vendors/wouter/index';

import IndexPage from './pages/index/index';
import PrivacyPage from './pages/privacy/privacy';
import DonePage from './pages/done/done';

const App = () => {
  return (
    <>
      <Route path="/">
        <IndexPage />
      </Route>
      <Route path="/privacy">
        <PrivacyPage />
      </Route>
      <Route path="/done">
        <DonePage />
      </Route>
    </>
  );
};

export default App;
