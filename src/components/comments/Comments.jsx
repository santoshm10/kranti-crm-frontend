import { useEffect } from "react";
import { useComments } from "../../contexts/CommentsContext";

function Comments({ leadId }) {
  const { comments, loading, error, fetchComments } = useComments();

  useEffect(() => {
    fetchComments(leadId);
  }, [leadId]);
  console.log("comments:", comments);
  if (loading) return <p>Loading comments...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <div key={comment.id}>
            <p>
              {comment.author}{" "}
              <span>{new Date(comment.createdAt).toLocaleString()}</span>
            </p>
            <p>"{comment.commentText}"</p>
          </div>
        ))}
    </div>
  );
}

export default Comments;
