import React, { useEffect, useState } from "react";
import { getArticles } from "../api.js";
import  ArticleCard  from './ArticleCard.jsx';

import { Link } from "react-router-dom";


const Articles = () => { 
    const [articles, setArticles] = useState([]);
   
    const [isLoading, setIsLoading] = useState(true);
   

    useEffect(() => {
        getArticles().
            then((res) => {
              //  console.log(res.articles.rows, '<<articles')
                setArticles(res.articles.rows);
                setIsLoading(false);
              
            })
            .catch((err) => {
                alert(err);
            })
    }, []);
    if (isLoading) {
        return <p>is loading</p>
    }
    else {
         return (
        <section className='articles'>
             <h3>Articles</h3> 
             {articles.map((article) => {
                   return ( <ArticleCard key={article.article_id} article={article} />);
                                  
            })}
        
 </section>)
}
}


   

export default Articles;