import { useState, useContext } from "react"
import { postCommentByArticleId } from "../api"
import { UserContext } from "../Context/User"


function AddComment({article_id, setRefreshComments}){
       
    const {loggedInUser} = useContext(UserContext)

    let [commentBody, setCommentBody] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function handleInput(event){
        setCommentBody(event.target.value)
    }

    function submitComment(event){
        event.preventDefault()
        setIsLoading(true)
        
        postCommentByArticleId(article_id, loggedInUser.username, commentBody)
        .then(()=>{
            setIsLoading(false)
            setRefreshComments((prev) => prev + 1)
            setCommentBody('')
        })
        .catch(()=>{
            alert('Failed to post comment')
            setIsLoading(false)
        })
    }

    if (isLoading) return <p>Posting comment...</p>

    return (
        <>
        <form  onSubmit={submitComment}>
            <label htmlFor="comment-body"></label>
            <input name="comment-body" type="text" onChange={handleInput} minLength={10} required />
            <button type="submit">Submit</button>
        </form>
        </>
    )
}


export default AddComment