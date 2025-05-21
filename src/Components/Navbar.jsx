import { Link } from "react-router"
import { useContext } from "react"
import { UserContext } from "../Context/User"

function Navbar(){

    const {loggedInUser, isLoggedIn} = useContext(UserContext)
    return (
        <>
        <div className="navbar-container">
        <span className="navbar-left">
            <Link to="/">Home</Link>
            <Link to="/articles">Articles</Link>
        </span>
        <span className="navbar-right">
            <Link to="/users/:username">
            {!isLoggedIn ? <span>Sign In</span> : <span>{loggedInUser.username}</span> }
            </Link>
        </span>
        </div>
        </>
    )
}

export default Navbar