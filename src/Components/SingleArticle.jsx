import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getArticleById, getCommentsByArticleId } from "../api"
import Loading from "./Loading"
import Error from "./Error";

function SingleArticle(){

    const [article, setArticle] = useState([])
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const {article_id} = useParams()
    
    useEffect(()=>{
        setIsLoading(true)
        getArticleById(article_id)
        .then((response)=>{
            setArticle(response)
            setIsLoading(false)
        })
        .catch(() => {
            setIsLoading(false)
            setIsError(true)
        })
    }, [])

    useEffect(()=>{
        getCommentsByArticleId(article_id)
        .then((response)=>{
            setComments(response);
        })
    }, [])

    
    if(isLoading) return <Loading />
    if(isError) return <Error />


    return (
        <>
        <div className="single-article-container">
            <div className="single-article-card">
                <h2>{article.title}</h2>
                <img src={article.article_img_url} className="article-img-large" placeholder="Article image"/>
                <p className="text-align-left">Author: {article.author}</p>
                <p className="text-align-left">Votes: {article.votes}</p>
                <p className="single-article-body">{article.body}</p>
            </div>
        </div>
        <div className="comments-container">
            <h3>Comments</h3>
            {comments.map((comment) => {
                return (
                    <div className="comment-card">
                        <p>Posted by: {comment.author}</p>
                        <p>{comment.body}</p>
                        <p>Votes: {comment.votes}</p>
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default SingleArticle