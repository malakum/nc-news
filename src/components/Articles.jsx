import React, { useEffect, useState } from "react";
import { getArticles } from "../api.js";
import  ArticleCard  from './ArticleCard.jsx';
import { useSearchParams } from "react-router-dom";



const Articles = () => { 
    const [articles, setArticles] = useState([]);
    const [sortby, setSortby] = useState('created_at');
    const [isLoading, setIsLoading] = useState(true);
    let [searchParams] = useSearchParams();
    const [error,setError] = useState(null);
    const topic = searchParams.get('topic');
 
   

    useEffect(() => {
      
        getArticles(topic, sortby).
            then((res) => {
    
                setArticles(res.articles.rows);
                setIsLoading(false);
              
            })
            .catch((err) => {
                     setError(err);
            })
    }, [topic,sortby]);

    if (error){
        return <p>Error Code={error.code} ,  Error Message={error.message}</p>;
    };
    if (isLoading) {
        return <p>is loading</p>
    }
    else {
         return (
            <div>
            <nav className="articles_header">
                <h2>{(topic) ? topic : 'Trending News'}</h2>
                <div className="articles_header_sortdiv">
                    <label>SortBy- </label>
                    <select onChange={(event) => { setSortby(event.target.value) }}>
                        <option value='created_at'>Article Date</option>
                        <option value='votes'>Votes</option>
                        <option value='comment_count'>comment_count</option>
                    </select>
                </div>
            </nav>
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