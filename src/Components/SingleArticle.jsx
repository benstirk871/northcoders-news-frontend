import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import { getArticleById, patchArticleById } from "../api"
import Loading from "./Loading"
import Error from "./Error";
import CommentSection from "./CommentSection";
import { UserContext } from "../Context/User";

function SingleArticle(){

    const {isLoggedIn} = useContext(UserContext)

    const [article, setArticle] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    let [votes, setVotes] = useState(0)
    const {article_id} = useParams()

    useEffect(()=>{
        setIsLoading(true)
        getArticleById(article_id)
        .then((response)=>{
            setArticle(response)
            setIsLoading(false)
            setVotes(response.votes)
        })
        .catch(() => {
            setIsLoading(false)
            setIsError(true)
        })
    }, [])

       
    if(isLoading) return <Loading />
    if(isError) return <Error />


    function upvote(){
        if (isLoggedIn && !isClicked){
            setVotes(votes += 1)
            patchArticleById(article_id, 1)
            .then(()=>{
                setIsClicked(true)
            })
            .catch(()=>{
                setVotes(votes -= 1)
                alert('Vote failed')
            })
        } else if (!isLoggedIn){
           alert('Please log in to vote')
        }
    }

    function downvote(){
        if (isLoggedIn && !isClicked){
            setVotes(votes -= 1)
            patchArticleById(article_id, -1)
            .then(()=>{
                setIsClicked(true)
            })
            .catch(()=>{
                setVotes(votes += 1)
                alert('Vote failed')
            })
        } else if (!isLoggedIn){
            alert('Please log in to vote')
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
                <button onClick={upvote}>Upvote</button>
                <button onClick={downvote}>Downvote</button>
                <p className="single-article-body">{article.body}</p>
            </div>
        </div>
        <CommentSection article_id={article_id} />
        </>
    )
}

export default SingleArticle