import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../Context/User"

function Drawer({ children }){

    const {isLoggedIn} = useContext(UserContext)
    const [drawerOpen, setDrawerOpen] = useState(false)

    function openCommentForm(){
        if (!isLoggedIn){
            alert('Please sign in to add a comment')
        } else if (drawerOpen){
            setDrawerOpen(false)
        } else {
            setDrawerOpen(true)
        }
    }


    return (
        <>
        <button onClick={openCommentForm}>Add comment</button>
        {drawerOpen ? children : null}
        </>
    )
}


export default Drawer