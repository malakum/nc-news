import React, { useEffect, useState } from "react";
import { getComments } from "../api";
import moment from "moment";


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
                  
                    return <li key={comment.comment_id} className="commentslist">
                        <p>Comment Id:{comment.comment_id}</p>
                        <p>Author:{comment.author}</p>
                        <p>Body:{comment.body}</p>
                        <p>Created at:{moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </li>})} </section>}
}

export default Comments;