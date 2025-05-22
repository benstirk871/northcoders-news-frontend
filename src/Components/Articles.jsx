import { useState, useEffect } from "react";
import { getArticles } from "../api";
import { Link, useParams } from "react-router";
import Loading from "./Loading";
import Error from "./Error";
import TopicsNavbar from "./TopicsNavbar";



function Articles(){

    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const {topic} = useParams()
    
    useEffect(()=>{
        setIsLoading(true)
        getArticles(topic)
        .then((response)=>{
            setArticles(response)
            setIsLoading(false)
        })
        .catch(() => {
            setIsLoading(false)
            setIsError(true)
        })
    }, [topic])

    if(isLoading) return <Loading />
    if(isError) return <Error />
    

    return (
        <>
        <TopicsNavbar/>
        <div className="articles-container">
            {articles.map((article) => {
                return (
                    <>
                    <div className="articles-card">
                        <Link to={`/articles/${article.article_id}`}>
                            <h3>{article.title}</h3>
                        </Link>
                        <p>Author: {article.author}</p>
                        <img src={article.article_img_url} className="article-img-small" placeholder="Article image"/>
                        <p>Votes: {article.votes}</p>
                    </div>
                    </>
                )
            })}
            </div>
        </>
    )

}

export default Articles