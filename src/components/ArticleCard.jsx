const ArticleCard = ({article}) => {
      return (    <section className="art_cards_main">
                            <li>
                            <h4>Topic:{article.topic}</h4>
                            <p>Title :{article.title}</p>
                                    <p>Author: {article.author}</p>
                                    <p>Created at:{article.created_at.split('T')[0]}</p>
                                    <p> Votes: {article.votes}</p>
                                    <p> Comments count:{article.comment_count}</p>
                                       </li>

                    </section>)
}

export default ArticleCard;
    