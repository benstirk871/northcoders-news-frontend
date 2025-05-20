import { useState } from 'react'
import {Routes, Route} from 'react-router'
import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Articles from './Components/Articles'
import SingleArticle from './Components/SingleArticle'

function App() {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/articles" element={<Articles/>} />
            <Route path="/articles/:article_id" element={<SingleArticle/>} />
        </Routes>
    </>
  )
}

export default App
