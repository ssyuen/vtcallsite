import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { InventoryFeed } from './components/InventoryFeedPage'
import { Home } from './components/HomePage'
import { Map } from './components/MapPage'
import { Admin } from './components/AdminPage';
import { isAuth } from './utils';
import { Login } from './components/LoginPage';

import { Amplify, API } from 'aws-amplify'
import awsconfig from './aws-exports'

Amplify.configure(awsconfig)

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home />}></Route>
        <Route path={'/inventoryFeed'} element={<InventoryFeed />}></Route>
        <Route path={'/map'} element={<Map />}></Route>
        <Route path={'/login'} element={<Login />}></Route>
        <Route path={'/admin'} element={isAuth() ? <Admin /> : <Navigate to={'/login'} />}></Route>
      </Routes>
    </BrowserRouter>




  );
}

export default App;
