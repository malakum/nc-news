import React, { useEffect, useState } from "react";
import { getTopics } from "../api";
import { Link } from "react-router-dom";

const TopicsNavbar = () => {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        getTopics().then((res) => {
             setTopics(res.rows);
        });
    }, []);

    return (
        <div className="topics_maindiv">
            <Link className="topics_maindiv_link"  to={`/articles`}> All</Link>
            { topics.map((topic) => {
                    return <Link
                        className="topics_maindiv_link"
                        key={topic.slug}
                        to={`/articles?topic=${topic.slug}`}
                    >
                        
                        {topic.slug}
                    </Link>
                })
            }
        </div >
    )
}

export default TopicsNavbar;