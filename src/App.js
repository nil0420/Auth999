import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/pages/Navbar';
import Login from './components/pages/Login';
import Create from './components/pages/Create';
import Home from './components/pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
