import { useState, useEffect, useContext } from "react";
import { getCommentsByArticleId, deleteCommentByCommentId } from "../api";
import AddComment from "./AddComment";
import Drawer from "./Drawer";
import { UserContext } from "../Context/User"

function CommentsSection({ article_id}) {

  const {loggedInUser} = useContext(UserContext)

  const [comments, setComments] = useState([]);
  const [isCommentError, setIsCommentError] = useState(false);
  const [refreshComments, setRefreshComments] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)

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
  }, [refreshComments]);

  function deleteComment(comment_id){
    setIsDeleting(true)
    deleteCommentByCommentId(comment_id)
    .then(()=>{
      setRefreshComments((prev) => prev + 1)
      setIsDeleting(false)
      alert('Successfully deleted comment')
    })
    .catch(()=>{
      setIsDeleting(false)
      alert('Failed to delete comment')
    })
  }

  return (
    <div className="comments-container">
      <Drawer>
        <AddComment
          article_id={article_id}
          setRefreshComments={setRefreshComments}
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
            {loggedInUser.username === comment.author ? (<button onClick={()=>deleteComment(comment.comment_id)}>Delete</button>) : null}
          </div>
        ))
      )}
      {isDeleting ? <p>Deleting...</p> : null}
    </div>
  );
}

export default CommentsSection;