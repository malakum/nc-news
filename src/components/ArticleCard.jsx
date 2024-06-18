import moment from "moment";
import { Link } from "react-router-dom";

const ArticleCard = ({article}) => {
      return (    <section className="art_cards_main">
                            <li>
                            <h4>Title :{article.title}</h4>
                            <p> Topic:{article.topic}</p>
                                    <p>Author: {article.author}</p>
                                    {/* <p>Created at:{article.created_at.split('T')[0]}'</p> */}
                                    <p>{moment(article.created_at).format('MMMM Do YYYY, h:mm:ss a')}</p>
                                    <p> Votes: {article.votes}</p>
                                    <p> Comments count:{article.comment_count}</p>
                                    <Link
                                         to={`/articles/${article.article_id}`}
                                          > Link for article detail
                                    </Link>;
                                       </li>

                    </section>)
}

export default ArticleCard;
    