import { Link } from "react-router"

function Navbar(){
    return (
        <>
            <Link to="/">Home </Link>
            <Link to="/articles"> Articles </Link>
        </>
    )
}

export default Navbar