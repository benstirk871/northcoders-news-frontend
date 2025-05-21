import { useState, useEffect, useContext } from "react";
import { getUserByUsername } from "../api";
import { UserContext } from "../Context/User";

function ProfilePage(){

    const {loggedInUser, setLoggedInUser, isLoggedIn} = useContext(UserContext)

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
            setLoggedInUser(response)
            setUsernameInput("")
        })
        .catch(() => {
            alert('Failed to log in')
        })
    }

    function handleLogout(){
        setLoggedInUser({})
    }

    if (isLoading) return <p>Logging in...</p>
    
    return (
        <>
        {!isLoggedIn ? ( <form>
            <label htmlFor="username-input">
                Enter your username: 
            </label>
            <input name="username-input" type="textbox" onChange={handleInput}/>
            <button onClick={handleLogin}>Sign In</button>
        </form>) : (
            <>
            <p>Welcome {loggedInUser.username}</p>
            <img src={loggedInUser.avatar_url} />
            <div>
            <button onClick={handleLogout}>Sign Out</button>
            </div>
            </>
        )}
        </>
    )
}

export default ProfilePage