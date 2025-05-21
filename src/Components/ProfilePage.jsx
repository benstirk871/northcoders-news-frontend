import { useState, useEffect } from "react";
import { getUserByUsername } from "../api";

function ProfilePage({currentUser, setCurrentUser}){

    const [usernameInput, setUsernameInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function handleInput(event){
        setUsernameInput(event.target.value)
    }
    
    function handleLogin(event){
        setIsLoading(true)
        event.preventDefault()
              
        getUserByUsername(usernameInput)
        .then((response) => {
            setIsLoading(false)
            setCurrentUser(response)
            setUsernameInput("")
        })
        .catch(() => {
            alert('Failed to log in')
        })
    }

    function handleLogout(){
        setCurrentUser(null)
    }

    if (isLoading) return <p>Logging in...</p>
    
    return (
        <>
        {!currentUser ? ( <form>
            <label htmlFor="username-input">
                Enter your username: 
            </label>
            <input name="username-input" type="textbox" onChange={handleInput}/>
            <button onClick={handleLogin}>Sign In</button>
        </form>) : (
            <>
            <p>Welcome {currentUser.username}</p>
            <img src={currentUser.avatar_url} />
            <div>
            <button onClick={handleLogout}>Sign Out</button>
            </div>
            </>
        )}
       
        
        
        </>
    )
}

export default ProfilePage