import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FormsProvider } from './contexts/FormsContext';
import FormsList from './pages/FormsList';
import FormBuilder from './pages/FormBuilder';
import FormFiller from './pages/FormFiller';
import FormResponses from './pages/FormResponses';
import './App.css';

function App() {
  return (
    <FormsProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<FormsList />} />
            <Route path="/create" element={<FormBuilder />} />
            <Route path="/edit/:formId" element={<FormBuilder />} />
            <Route path="/form/:formId" element={<FormFiller />} />
            <Route path="/responses/:formId" element={<FormResponses />} />
          </Routes>
        </div>
      </Router>
    </FormsProvider>
  );
}

export default App; 