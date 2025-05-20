import { useState, useEffect } from "react";
import { getUserByUsername } from "../api";

function ProfilePage({currentUser, setCurrentUser}){

    const [usernameInput, setUsernameInput] = useState("")

    function handleInput(event){
        setUsernameInput(event.target.value)
    }
    
    function handleLogin(event){
        event.preventDefault()
        //console.log(usernameInput)
        
        getUserByUsername(usernameInput)
        .then((response) => {
            console.log(response)
            setCurrentUser(response)
            setUsernameInput("")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    function handleLogout(){
        setCurrentUser(null)
    }
    
    return (
        <>
        {!currentUser ? ( <form>
            <label htmlFor="username-input">
                Enter your username: 
            </label>
            <input id="username-input" type="text" onChange={handleInput}/>
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