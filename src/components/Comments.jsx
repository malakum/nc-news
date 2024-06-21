import React, { useContext, useEffect, useState } from "react";
import { getComments , postComment , deleteComment } from "../api";
import moment from "moment";
import CommentCard from "./CommentCard";
import { UserContext } from "../contexts/User";



const Comments = (props) =>{
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState('');
    const [status, setStatusBase] = useState("");
    const [error, setError] = useState(null);
    const { loggedInUser, isLoggedIn } = useContext(UserContext);
 
   
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getComments(props.article_id).then((res) => {
    
            setComments(res.rows);
            setIsLoading(false);
        });
    }, [props.article_id]);
    
    const newPostHandler = (event) => {
               setInput(event.target.value);
       
    }

    const postSubmitHandler = (evt) => {
        if (input.length === 0) {
            alert("Nothing to post here! Please type your comment");
            console.log("Nothing to post here! Please type your comment");
     
        } else {
            const newComment = {};
            if (!loggedInUser.username){
                newComment['author'] =  'happyamy2016';  
            }
            else {
            newComment['author'] = loggedInUser.username;
        }
   
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
                        setInput('');
                  
                        setError(err);
              
                })
        }
    }

    const deleteHandler = (commentid) => {
        deleteComment(commentid)
            .then((res) => {
                setComments((currcomments) => {
                    const newComments = currcomments.filter((comment) => {
                        return comment.comment_id !== commentid
                    });
                    return newComments;
                })
                props.setArticle((currArticle) => {
                    const updatedArticle = { ...currArticle };
                    updatedArticle['comment_count']--;
                    return updatedArticle;
                })
            })
            .catch((err) => {
                    setError(err);
                })
    }
    if (error){
        return <p>Error Code={error.code} ,  Error Message={error.message}</p>;
    };
 
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
                  
                  //   return ( <CommentCard key={comment.comment_id} comment={comment}/>);
                    return (<li key={comment.comment_id} className="commentslist"> 
                       <p>Comment Id:{comment.comment_id}</p>
                         <p>Author:{comment.author}</p>
                        <p>Body:{comment.body}</p>
                        <p>Created at:{moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                        {(comment.author === loggedInUser.username) &&
                        <div>
                        <button onClick={() => { deleteHandler(comment.comment_id) }} >
                        Delete Comment
                      </button>
                      </div>}
                     </li>)
                   
  })} </section>
   
  </div>)}
}

export default Comments;