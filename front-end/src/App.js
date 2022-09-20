import './App.css';
// import axios from "axios";
// import { useEffect } from "react";
import {Routes, Route} from 'react-router-dom';

import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';

function App() {

  // useEffect(() => {
  //   axios.get("http://localhost:5000/").then((response) => {
  //     console.log(response.data);
  //   });
  // }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
