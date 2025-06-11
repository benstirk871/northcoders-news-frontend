import { useState, useEffect, useContext } from "react";
import { getUsers } from "../api";
import { UserContext } from "../Context/User";
import Loading from "./Loading";

function Users(){

    const {loggedInUser, setLoggedInUser} = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [users, setUsers] = useState([])

      
    useEffect(()=>{
        setIsLoading(true)
                      
        getUsers()
        .then((response) => {
            setIsLoading(false)
            setUsers(response)    
        })
        .catch(() => {
            setIsLoading(false)
            setIsError(true)
        })
    }, [])
    
    function handleLogin(user){
        setLoggedInUser(user)
    }    

    function handleLogout(){
        setLoggedInUser({})
    }

    if (isLoading) return <Loading />
    if (isError){
        return (<h2>Could not load users</h2>)
    } 
    
    return (
        <div className="users-container">
           {users.map((user)=>{
                return (
                    <div className="user-card">
                        <h2>{user.username}</h2>
                        <div className="profile-picture-container">
                            <img src={user.avatar_url} alt="profile-picture" 
                            className="profile-picture"/>
                        </div>
                        {user.username !== loggedInUser.username ? 
                        (<button onClick={()=>{handleLogin(user)}}>Sign In</button>) : (<button onClick={handleLogout}>Sign Out</button> )}
                    </div>
                )
            })}
        </div>
    )
}

export default Users