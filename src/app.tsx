import React from '../vendors/react';
import {Route} from '../vendors/wouter/index';

import IndexPage from './pages/index/index';

const App = () => {
  return (
    <>
      <Route path="/">
        <IndexPage />
      </Route>
    </>
  );
};

export default App;
