import './App.css';
// import axios from "axios";
// import { useEffect } from "react";
import {Routes, Route} from 'react-router-dom';
import RequireAuth from './components/RequireAuth';

import Layout from './components/Layout';
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import Admin from './routes/Admin';

function App() {

  return (
   
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route element={<RequireAuth allowedRoles={['Admin']}/>}>
            <Route path='/admin' element={<Admin />} />
        </Route>

      </Route>
    </Routes>




      // <Routes>
      //   <Route path='/' element={<Home />} />
      //   <Route path='/register' element={<Register />} />
      //   <Route path='/login' element={<Login />} />
      // </Routes>
    
  );
}

export default App;
