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
import Products from './routes/Products';
import Messages from './routes/Messages';
import Auctions from './routes/Auctions';
import Unauthorized from './routes/Unauthorized';
import SendMessage from './routes/SendMessage';
import SentMessages from './routes/SentMessages';

function App() {

  return (
   
    <Routes>
      <Route path='/' element={<Layout />}>

        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/products' element={<Products />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRoles={['Admin']}/>}>
            <Route path='/admin' element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['User']}/>}>
          <Route path='/messages' element={<Messages />} />
          <Route path='/messages/sent' element={<SentMessages/>} />
          <Route path='/messages/sendmessage' element={<SendMessage/>} />
          <Route path='/auctions' element={<Auctions />} />
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
