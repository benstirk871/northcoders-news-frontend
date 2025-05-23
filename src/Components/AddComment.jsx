import { useState, useContext } from "react"
import { postCommentByArticleId } from "../api"
import { UserContext } from "../Context/User"
import TextareaAutosize from 'react-textarea-autosize'


function AddComment({article_id, setRefreshComments}){
       
    const {loggedInUser} = useContext(UserContext)

    let [commentBody, setCommentBody] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [hasFailed, setHasFailed] = useState(false)
    const maxCharacters = 500

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
            setIsLoading(false)
            setHasFailed(true)
        })
    }

    if (isLoading) return <p>Posting comment...</p>
    if (hasFailed) return <p>Failed to post comment!</p>

    return (
        <>
        <form  onSubmit={submitComment}>
            <label htmlFor="comment-body"></label>
            <TextareaAutosize id="comment-body" name="comment-body" onChange={handleInput} minLength={10} maxLength={maxCharacters} className="comment-input" required />
            <div className="character-count">
                {maxCharacters - commentBody.length} characters remaining
            </div>
            <button type="submit">Submit</button>
        </form>

        </>
    )
}


export default AddComment