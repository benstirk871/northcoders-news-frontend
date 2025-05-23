import axios from "axios";

const northcodersNewsApi = axios.create({
    baseURL: "https://nc-news-backend-d0dj.onrender.com/api"
});

export const getArticles = (topic, sortBy, orderBy) => {
    return northcodersNewsApi.get("/articles", 
        {params: {
            topic: topic,
            sort_by: sortBy,
            order: orderBy
            }
        })
    .then((response)=>{
        return response.data.articles
    })
}

export const getArticleById = (article_id) => {
    return northcodersNewsApi.get(`/articles/${article_id}`)
    .then((response)=>{
        return response.data.article
    })
}

export const getCommentsByArticleId = (article_id) => {
    return northcodersNewsApi.get(`/articles/${article_id}/comments`)
    .then((response)=>{
        return response.data.comments
    })
}

export const getUserByUsername = (username) => {
    return northcodersNewsApi.get(`/users/${username}`)
    .then((response) => {
        return response.data.user
    })
}

export const patchArticleById = (article_id, numOfVotes) => {
    return northcodersNewsApi.patch(`/articles/${article_id}`, {
        inc_votes: numOfVotes
    })
}

export const postCommentByArticleId = (article_id, currentUser, commentBody) => {
    return northcodersNewsApi.post(`/articles/${article_id}/comments`, {
        username: currentUser,
        body: commentBody
    })
}

export const deleteCommentByCommentId = (comment_id) => {
    return northcodersNewsApi.delete(`/comments/${comment_id}`)
}

export const getTopics = () => {
    return northcodersNewsApi.get("/topics")
    .then((response)=> {
        return response.data.topics
    })
}