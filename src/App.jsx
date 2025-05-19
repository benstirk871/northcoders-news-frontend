import { useState } from 'react'
import {Routes, Route} from 'react-router'
import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Articles from './Components/Articles'

function App() {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/articles" element={<Articles/>} />
        </Routes>
    </>
  )
}

export default App
