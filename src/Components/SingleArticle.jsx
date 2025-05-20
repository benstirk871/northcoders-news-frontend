import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getArticleById } from "../api"

function SingleArticle(){

    const [article, setArticle] = useState([])
    const {article_id} = useParams()
    
    useEffect(()=>{
        getArticleById(article_id)
        .then((response)=>{
            setArticle(response)
            console.log(response);
            
        })
    }, [])

    return (
        <>
        <div className="single-article-container">
            <div className="single-article-item">
                <h2>{article.title}</h2>
                <p>Author: {article.author}</p>
                <p>Votes: {article.votes}</p>
                <img src={article.article_img_url} className="article-img-large" placeholder="Article image"/>
                <p className="single-article-text">{article.body}</p>
            </div>
        </div>
        </>
    )
}

export default SingleArticle