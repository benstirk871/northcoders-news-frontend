import { useState, useEffect } from "react";
import { getCommentsByArticleId } from "../api";
import AddComment from "./AddComment";
import Drawer from "./Drawer";

function CommentsSection({ article_id, currentUser }) {
  const [comments, setComments] = useState([]);
  const [isCommentError, setIsCommentError] = useState(false);
  const [newCommentPosted, setNewCommentPosted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCommentsByArticleId(article_id)
      .then((response) => {
        setComments(response);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsCommentError(true);
      });
  }, [newCommentPosted]);

  return (
    <div className="comments-container">
      <Drawer currentUser={currentUser}>
        <AddComment
          article_id={article_id}
          currentUser={currentUser}
          setNewCommentPosted={(prev) => setNewCommentPosted(prev + 1)}
        />
      </Drawer>
      <h3>Comments</h3>
      {isCommentError ? (
        <p>Could not display comments</p>
      ) : isLoading ? (
        <p>Loading comments...</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.comment_id} className="comment-card">
            <p>Posted by: {comment.author}</p>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CommentsSection;