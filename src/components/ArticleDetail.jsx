import React, { useEffect, useState } from "react";
import { getArticleById } from "../api.js";
import { useParams } from "react-router-dom";
import moment from "moment";
import Comments from "./Comments.jsx";



import { Link } from "react-router-dom";


const ArticleDetail = ( ) => { 
    const [article, setArticle] = useState([]);
    const [err, setErr] = useState(false);
    const [open, setOpen] = useState(false);
  
    const [isLoading, setIsLoading] = useState(true);
    const { article_id } = useParams();
    
    if (article_id){
    useEffect(() => {
        getArticleById(article_id).
            then((res) => {
                setArticle(res);
                setIsLoading(false);
              
            })
            .catch((err) => {
              setIsLoading(false);
            })
    }, [article_id]);
   

    const commentsBtnHandler = () => {
        setOpen(!open)
    }


    if (isLoading) {
        return <p>is loading</p>
    }
    else {
        
         return (
        <section className='articles'>
             <h3>Article:{article.article_id}</h3> 
             <h4>Title :{article.title}</h4>
             <p>Topic:{article.topic}</p>
                                    <p>Author: {article.author}</p>
                                    <p>Created at:{moment(article.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                    <p> Votes: {article.votes}</p>
                                    <p> Comments count:{article.comment_count}</p>
                                    
                    <button
                        className="atticleDetail_commentsBtn"
                        onClick={() => { commentsBtnHandler(article.article_id) }}
                    > {`(${article.comment_count})`}</button>
                
            {(open) &&
                <Comments article_id={article_id} setArticle={setArticle}></Comments>
            }
       
       </section>)
}}
}
export default ArticleDetail;