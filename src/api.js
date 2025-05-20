import axios from "axios";

const northcodersNewsApi = axios.create({
    baseURL: "https://nc-news-backend-d0dj.onrender.com/api"
});

export const getArticles = () => {
    return northcodersNewsApi.get("/articles").then((response)=>{
        return response.data.articles
    })
}

export const getArticleById = (article_id) => {
    return northcodersNewsApi.get(`/articles/${article_id}`).then((response)=>{
        return response.data.article
    })
}