// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Students from './pages/Students';
import Sidebar from './pages/Sidebar';
import Car from './pages/Cars';
import Users from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <div
          style={{
            width: '220px',
            backgroundColor: '#2f2f2f',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/students" element={<Students />} />
            <Route path="/car" element={<Car />} />
            <Route path="/add-user" element={<Users />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;