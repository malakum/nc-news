import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Articles from './components/Articles';
import ArticleDetail from './components/ArticleDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopicNavbar from './components/TopicNavbar';
import { UserProvider } from "./contexts/User";
import LoginForm from './components/LoginForm';





function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
        <UserProvider>
               <Header />
       <TopicNavbar />
       <LoginForm />
       <Routes>
       <Route path="/" element={<Articles />}></Route>
       <Route path="/articles" element={<Articles />}></Route>
       <Route path="/articles/:article_id" element ={<ArticleDetail />}></Route>
       <Route path="*" element={<p className='notFound'>Page Not Found !!</p>} />
       </Routes>
       </UserProvider>
       </BrowserRouter>
      
      </div>
    
    </>
  )
}

export default App
