import { Link } from "react-router"

function Navbar({currentUser}){
    return (
        <>
        <div className="navbar-container">
        <span className="navbar-left">
            <Link to="/">Home</Link>
            <Link to="/articles">Articles</Link>
        </span>
        <span className="navbar-right">
            <Link to="/users/:username">
            {!currentUser ? <span>Sign In</span> : <span>{currentUser.username}</span> }
            </Link>
        </span>
        </div>
        </>
    )
}

export default Navbar