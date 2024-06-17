import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Articles from './components/Articles';
import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
       <Header />
       <Routes>
       <Route path="/" element={<Articles />}></Route>
       <Route path="/articles" element={<Articles />}></Route>
       </Routes>
       </BrowserRouter>
      </div>
    
    </>
  )
}

export default App
