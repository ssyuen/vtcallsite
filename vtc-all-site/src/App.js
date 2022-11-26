import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryFeed } from './components/InventoryFeedPage'
import { Home } from './components/HomePage'
import { Map } from './components/MapPage'
import { Admin } from './components/AdminPage';
import { isAuth, RequireAuth } from './utils';
import { Login } from './components/LoginPage';

import { Amplify, API } from 'aws-amplify'
import awsconfig from './aws-exports'
import { IndividualCarPage } from './components/IndividualCarPage';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig)

function App() {
  return (

    <Authenticator.Provider>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />}></Route>
          <Route path={'/inventoryFeed'} element={<InventoryFeed />}></Route>
          <Route path={'/map'} element={<Map />}></Route>
          <Route path={'/login'} element={<Login />}></Route>

          <Route path={'/admin'} element={
            <RequireAuth><Admin /></RequireAuth>
          }></Route>
          <Route path={'/carListings/:id'} element={<IndividualCarPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Authenticator.Provider>

  );
}

export default App;
