import { useContext } from "react"
import { UserContext } from '../Context/User'

function Home(){

    const {isLoggedIn, loggedInUser} = useContext(UserContext)
    
    return (
        <header>
            <h1>Northcoders News</h1>            
            <h2>Welcome to Northcoders News { isLoggedIn ? loggedInUser.username : null } </h2>
        </header>
    )
}

export default Home