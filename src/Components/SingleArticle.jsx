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
    const [isClicked, setIsClicked] = useState(null)
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

    function handleVote(type){
        if (!isLoggedIn){
            alert('Please sign in to vote');
            return;
        }
    
        let voteChange = 0;
    
        if (type === 'upvote'){
            if (isClicked === 'upvote'){
                voteChange = -1
                setIsClicked(null)
            } else if (isClicked === 'downvote'){
                voteChange = 2
                setIsClicked('upvote')
            } else if (isClicked === null){
                voteChange = 1
                setIsClicked('upvote')
            }
        } else if (type === 'downvote'){
            if (isClicked === 'downvote'){
                voteChange = 1
                setIsClicked(null)
            } else if (isClicked === 'upvote'){
                voteChange = -2
                setIsClicked('downvote')
            } else if (isClicked === null){
                voteChange = -1
                setIsClicked('downvote')
            }
        }
    
        setVotes(prevVotes => prevVotes + voteChange)
    
        patchArticleById(article_id, voteChange)
            .catch(()=>{
                setVotes(prevVotes => prevVotes - voteChange);
                alert('Vote failed');
    
                if (type === 'upvote') {
                    if (voteChange === 1) setIsClicked(null);
                    else if (voteChange === 2) setIsClicked('downvote');
                    else if (voteChange === -1) setIsClicked('upvote');
                } else {
                    if (voteChange === -1) setIsClicked(null);
                    else if (voteChange === -2) setIsClicked('upvote');
                    else if (voteChange === 1) setIsClicked('downvote');
                }
            })
    }
    


    return (
        <>
        <div className="single-article-container">
            <div className="single-article-card">
                <h2>{article.title}</h2>
                <img src={article.article_img_url} className="article-img-large" placeholder="Article image"/>
                <p className="text-align-left">Author: {article.author}</p>
                <p className="text-align-left">Votes: {votes}</p>
                <button onClick={()=> handleVote('upvote')} className={isClicked === "upvote" ? "vote-button-selected" : "vote-button"}>Upvote</button>
                <button onClick={()=> handleVote('downvote')} className={isClicked === "downvote" ? "vote-button-selected" : "vote-button"}>Downvote</button>
                <p className="single-article-body">{article.body}</p>
            </div>
        </div>
        <CommentSection article_id={article_id} />
        </>
    )
}

export default SingleArticle