import { Link } from "react-router"
import { useContext } from "react"
import { UserContext } from "../Context/User"

function Navbar(){

    const {loggedInUser, isLoggedIn} = useContext(UserContext)
    return (
        <>
        <div className="navbar-container">
        <span className="navbar-left">
            <Link to="/" className="nav-bar-item">Home</Link>
            <Link to="/articles" className="nav-bar-item">Articles</Link>
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