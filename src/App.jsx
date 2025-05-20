import { useState } from 'react'
import {Routes, Route} from 'react-router'
import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Articles from './Components/Articles'
import SingleArticle from './Components/SingleArticle'
import ProfilePage from './Components/ProfilePage'

function App() {

  const [currentUser, setCurrentUser] = useState(null)

  return (
    <>
        <Navbar currentUser={currentUser}/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/articles" element={<Articles/>} />
            <Route path="/articles/:article_id" element={<SingleArticle currentUser={currentUser}/>} />
            <Route path="/users/:username" element={<ProfilePage currentUser={currentUser}  setCurrentUser={setCurrentUser}/>} />
        </Routes>
    </>
  )
}

export default App
