import { useState, useEffect } from "react";
import { getArticles } from "../api";
import { Link } from "react-router";

function Articles(){

    const [articles, setArticles] = useState([])

    useEffect(()=>{
        getArticles()
        .then((response)=>{
            setArticles(response)
        })
    }, [])

    return (
        <>
        <div className="articles-container">
            {articles.map((article) => {
                return (
                    <>
                    <div className="articles-item">
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