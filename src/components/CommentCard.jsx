
import moment from "moment";

const CommentCard =({comment}) =>{
 

    return ( <section className="commentslist">
    <li>
                       <p>Comment Id:{comment.comment_id}</p>
                         <p>Author:{comment.author}</p>
                        <p>Body:{comment.body}</p>
                        <p>Created at:{moment(comment.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                              
                     </li>
   

</section>)
}

export default CommentCard;
