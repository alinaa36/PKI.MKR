import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/PageHome";
import Layout from './Layout';
import Kpitter from './Page/PageKpitter'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/kpitter" element={<Kpitter />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
