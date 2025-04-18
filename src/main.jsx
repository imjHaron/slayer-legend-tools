import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ExchangeSimulator from './pages/ExchangeSimulator'
import SummonSimulator from './pages/SummonSimulator'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchange-simulator" element={<ExchangeSimulator />} />
        <Route path="/summon-simulator" element={<SummonSimulator />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
