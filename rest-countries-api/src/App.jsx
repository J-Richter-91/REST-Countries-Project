import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Country from './Pages/Country'
import Header from './components/Header'
import './index.css'


function App() {

return (
  <BrowserRouter>
    <Routes>
    <Route path="/" element={< Home />} />
    <Route path="Country/:name" element={< Country />} />
    </Routes>
  </BrowserRouter>
  )
}


export default App
