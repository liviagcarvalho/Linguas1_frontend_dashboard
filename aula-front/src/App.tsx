import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Clientes from "./pages/Clientes";
import OportunidadeExpansao from "./pages/OportunidadeExpansao"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/expansao" element={<OportunidadeExpansao />} /> 
      </Routes>
    </Router>
  );
}

export default App;

