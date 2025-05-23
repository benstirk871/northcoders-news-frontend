import { useState, useEffect } from "react"
import { getTopics } from "../api"
import { Link } from "react-router"

function TopicsNavbar(){
    const [topics, setTopics] = useState([])
            
    useEffect(()=>{
        getTopics()
        .then((response) => {
            setTopics(response)
        })
    }, [])

    function formatTopic(topic){
        return topic.charAt(0).toUpperCase() + topic.slice(1)
    }

    
    return (
        <div className="topics-navbar-container">
           {topics.map((topic) => {
            return <Link to={`/articles/${topic.slug}`} className="topic-link">{formatTopic(topic.slug)}
            </Link>
        })}
        </div>
    )

}

  

export default TopicsNavbar

