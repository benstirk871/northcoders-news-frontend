import { use, useState } from "react"

function Drawer({ children, currentUser }){
    const [drawerOpen, setDrawerOpen] = useState(false)

    function openCommentForm(){
        if (!currentUser){
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