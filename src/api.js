import axios from "axios";

const newsApi = axios.create({
    baseURL: "https://be-article-news.onrender.com/api"
});
export const getArticles = ( ) => {
    return newsApi.get(`/articles`).then(res => {
        return res.data;
    })
}
export const getArticleById = (article_id) => {
     return newsApi.get(`/articles/${article_id}`).then(res => {
          return res.data.article;
    })
}

export const getComments = (article_id) => {
    return newsApi.get(`/articles/${article_id}/comments`).then(res => {
        return res.data.comments
    })
}

