import { useContext } from "react"
import { UserContext } from '../Context/User'

function Home(){

    const {isLoggedIn, loggedInUser} = useContext(UserContext)
    return (
        <>
            <header>
                <h1>Northcoders News</h1>
                {isLoggedIn ? 
                <h2>Welcome to Northcoders News {loggedInUser.username}</h2> : <h2>Welcome to Northcoders News</h2>}
            </header>
        </>
    )
}

export default Home