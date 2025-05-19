import axios from "axios";

const northcodersNewsApi = axios.create({
    baseURL: "https://nc-news-backend-d0dj.onrender.com/api"
});

export const getArticles = () => {
    return northcodersNewsApi.get("/articles").then((response)=>{
        return response.data.articles
    })
}