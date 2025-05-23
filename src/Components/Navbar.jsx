import { Link } from "react-router"
import { useContext } from "react"
import { UserContext } from "../Context/User"

function Navbar(){

    const {loggedInUser, isLoggedIn} = useContext(UserContext)
    
    return (
        <div className="navbar-container">
            <div className="navbar-left">
                <Link to="/" className="nav-bar-item large">Home</Link>
                <Link to="/articles" className="nav-bar-item large">Articles</Link>
            </div>
            <div className="navbar-right">
                <Link to="/users">
                {!isLoggedIn ? <span className="large">Sign In</span> : <span className="large">{loggedInUser.username}</span> }
                </Link>
            </div>
        </div>
    )
}

export default Navbar