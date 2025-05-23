import { useState } from 'react'
import {Routes, Route} from 'react-router'
import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import Articles from './Components/Articles'
import SingleArticle from './Components/SingleArticle'
import ProfilePage from './Components/ProfilePage'
import { UserContext } from './Context/User'
import Error from './Components/Error'
import ErrorPage from './Components/ErrorPage'

function App() {

  const [loggedInUser, setLoggedInUser] = useState({})
  const isLoggedIn = Object.keys(loggedInUser).length > 0

  return (
    <UserContext.Provider value={{loggedInUser, setLoggedInUser, isLoggedIn}}>
    <>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/articles/:topic?" element={<Articles/>} />
            <Route path="/article/:article_id" element={<SingleArticle/>} />
            <Route path="/users" element={<ProfilePage/>} />
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    </>
    </UserContext.Provider>
  )
}

export default App
