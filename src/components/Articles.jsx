import React, { useEffect, useState } from "react";
import { getArticles } from "../api.js";
import  ArticleCard  from './ArticleCard.jsx';
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";


const Articles = () => { 
    const [articles, setArticles] = useState([]);
   
    const [isLoading, setIsLoading] = useState(true);
    let [searchParams] = useSearchParams();
    const topic = searchParams.get('topic');
    //console.log (topic);
    let navigate = useNavigate();
   

    useEffect(() => {
      
        getArticles(topic).
            then((res) => {
            //    console.log(res.articles.rows, '<<articles')
                setArticles(res.articles.rows);
                setIsLoading(false);
              
            })
            .catch((err) => {
              //  console.log(err);
                alert(err);
            })
    }, [topic]);
    if (isLoading) {
        return <p>is loading</p>
    }
    else {
         return (
            <div>
                <section className='articles'>
             <h3>Articles</h3> 
             {articles.map((article) => {
                   return ( <ArticleCard key={article.article_id} article={article}/>);
                                  
            })}
        
 </section>
 </div>)
}
}


   

export default Articles;