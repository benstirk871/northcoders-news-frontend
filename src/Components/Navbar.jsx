import { Link } from "react-router"

function Navbar(){
    return (
        <>
            <Link to="/" element={<Home/>}>Home</Link>
            <Link to="/articles" element={<Articles/>}>Home</Link>
        </>
    )
}

export default Navbar