import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Articles from './components/Articles';
import ArticleDetail from './components/ArticleDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
       <Header />
       <ArticleDetail />
       <Routes>
       <Route path="/" element={<Articles />}></Route>
       <Route path="/articles" element={<Articles />}></Route>
       <Route path="/articles/:article_id" element ={<ArticleDetail />}></Route>
       </Routes>
       </BrowserRouter>
      </div>
    
    </>
  )
}

export default App
