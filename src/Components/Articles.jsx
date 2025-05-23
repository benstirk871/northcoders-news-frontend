import { useState, useEffect } from "react";
import { getArticles } from "../api";
import { Link, useParams } from "react-router";
import Loading from "./Loading";
import Error from "./Error";
import TopicsNavbar from "./TopicsNavbar";
import SortByDropdown from "./SortByDropdown";



function Articles(){

    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const {topic} = useParams()
    const [sortBy, setSortBy] = useState(null)
    const [orderBy, setOrderBy] = useState(null)

    useEffect(()=>{
        setIsLoading(true)
        getArticles(topic, sortBy, orderBy)
        .then((response)=>{
            setArticles(response)
            setIsLoading(false)
        })
        .catch((error) => {
            setIsLoading(false)
            setError(error)
        })
    }, [topic, sortBy, orderBy])

    if(isLoading) return <Loading />
    if(error) return <Error errorCode={error.status}/>
    
    return (
        <>
        <TopicsNavbar/>
        <SortByDropdown sortBy={sortBy} setSortBy={setSortBy} orderBy={orderBy} setOrderBy={setOrderBy}/>
        <div className="articles-container">
            {articles.map((article) => {
                return (
                    <>
                    <div className="articles-card">
                        <div className="articles-text">
                            <Link to={`/article/${article.article_id}`}>
                                <h3>{article.title}</h3>
                            </Link>
                            <p>Author: {article.author}</p>
                            <p>Votes: {article.votes}</p>
                        </div>
                        <img src={article.article_img_url} className="article-img-small" placeholder="Article image"/>
                    </div>
                    </>
                )
            })}
            </div>
        </>
    )

}

export default Articles