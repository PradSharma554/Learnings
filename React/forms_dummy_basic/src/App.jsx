import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FormsProvider } from './contexts/FormsContext';
import AppRoutes from './route/index';
import './App.css';

function App() {
  return (
    <FormsProvider>
      <Router>
        <AppRoutes />
      </Router>
    </FormsProvider>
  );
}

export default App;