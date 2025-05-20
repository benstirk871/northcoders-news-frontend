import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getArticleById, getCommentsByArticleId, patchArticleById } from "../api"
import Loading from "./Loading"
import Error from "./Error";

function SingleArticle({currentUser}){

    const [article, setArticle] = useState([])
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isCommentError, setIsCommentError] = useState(false)
    const {article_id} = useParams()

    const [isClicked, setIsClicked] = useState(false)
    const [votes, setVotes] = useState(0)

        
    useEffect(()=>{
        setIsLoading(true)
        getArticleById(article_id)
        .then((response)=>{
            console.log(response)
            setArticle(response)
            setIsLoading(false)
            setVotes(response.votes)
        })
        .catch(() => {
            setIsLoading(false)
            setIsError(true)
        })
    }, [isClicked])

    useEffect(()=>{
        setIsLoading(true)
        getCommentsByArticleId(article_id)
        .then((response)=>{
            setComments(response);
            setIsLoading(false)
        })
        .catch(() => {
            setIsLoading(false)
            setIsCommentError(true)
        })
    }, [])
    
    if(isLoading) return <Loading />
    if(isError) return <Error />


    function upvote(){
        if (!isClicked){
            patchArticleById(article_id, 1)
            setIsClicked(true)
        }
    }

    function downvote(){
        if (!isClicked){
            patchArticleById(article_id, -1)
            setIsClicked(true)
        } 
    }


    return (
        <>
        <div className="single-article-container">
            <div className="single-article-card">
                <h2>{article.title}</h2>
                <img src={article.article_img_url} className="article-img-large" placeholder="Article image"/>
                <p className="text-align-left">Author: {article.author}</p>
                <p className="text-align-left">Votes: {votes}</p>
                {currentUser ? <><button onClick={upvote}>Upvote</button><button onClick={downvote}>Downvote</button></> : null}
                <p className="single-article-body">{article.body}</p>
            </div>
        </div>
        <div className="comments-container">
            <h3>Comments</h3>
            {isCommentError ? <p>Could not display comments</p> : 
            comments.map((comment) => {
                return (
                    <div className="comment-card">
                        <p>Posted by: {comment.author}</p>
                        <p>{comment.body}</p>
                        <p>Votes: {comment.votes}</p>
                    </div>
                )
            })
           }
        </div>
        </>
    )
}

export default SingleArticle