import React, { useEffect, useState } from "react";
import { getComments } from "../api";
import CommentCard from "./CommentCard";


const Comments = (props) =>{
    const [comments, setComments] = useState([]);
   
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getComments(props.article_id).then((res) => {
          //   console.log(res.rows, '<<Comments')
            setComments(res.rows);
            setIsLoading(false);
        });
    }, [props.article_id]);
    if (isLoading) {
        return <p>is loading</p>
    }
    else {
    return <section>
            <h4>Comments section</h4>
                {comments.map((comment) => {
                  
                    return ( <CommentCard key={comment.comment_id} comment={comment}/>);
  })} </section>}
}

export default Comments;