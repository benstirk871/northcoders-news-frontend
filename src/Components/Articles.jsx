import { useState, useEffect } from "react";
import { getArticles } from "../api";

function Articles(){

    const [articles, setArticles] = useState([])

    useEffect(()=>{
        getArticles()
        .then((response)=>{
            console.log(response)
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
                        <h3>{article.title}</h3>
                        <p>Author: {article.author}</p>
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