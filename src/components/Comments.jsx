import React, { useEffect, useState } from "react";
import { getComments , postComment } from "../api";
import CommentCard from "./CommentCard";


const Comments = (props) =>{
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState('');
    const [statusBase, setStatusBase] = useState("");
   
   
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getComments(props.article_id).then((res) => {
         //    console.log(res.rows, '<<Comments')
            setComments(res.rows);
            setIsLoading(false);
        });
    }, [props.article_id]);
    
    const newPostHandler = (event) => {
               setInput(event.target.value);
       
    }

    const postSubmitHandler = (evt) => {
        if (input.length === 0) {
            console.log("Nothing to post here! Please type your comment");
            setStatusBase({ msg: "Nothing to post here! Please type your comment", key: Math.random() });
        } else {
            const newComment = {};
            newComment['author'] =  'happyamy2016';
            newComment['body'] = input;
          
            postComment(props.article_id, newComment).then((res) => {
                setComments((currcomments) => {
                    const newComments = currcomments.map((comment) => {
                        return { ...comment }
                    });
                    newComments.unshift(res)
                    return newComments;
                })
                props.setArticle((currArticle) => {
                    const updatedArticle = { ...currArticle };
                    updatedArticle['comment_count']++;
                    return updatedArticle;
                })
                setInput('');
            })
                .catch((err) => {
                    alert(err)
                    console.log(err);
                    setStatusBase({ msg: { err }, key: Math.random() });
                })
        }
    }
    
    if (isLoading) {
        return <p>is loading</p>
    }
    else {
    return (<div>
              <div>
                <textarea
                    className="comment_postinput"
                    onChange={newPostHandler}
                    value={input}
                    placeholder='Post your comment here ......'>Post Your Comment here</textarea>
                     <button variant="contained" onClick={postSubmitHandler}>Submit</button>
                
            </div>
    <section>
            
            <h4>Comments section</h4>
                {comments.map((comment) => {
                  
                    return ( <CommentCard key={comment.comment_id} comment={comment}/>);
  })} </section>
  </div>)}
}

export default Comments;