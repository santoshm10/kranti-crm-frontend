import { useState } from "react";
import { useComments } from "../../contexts/CommentsContext";
import { useAgents } from "../../contexts/AgentsContext";
import { useLeads } from "../../contexts/LeadsContext";

function AddComment({ leadId }) {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const { addNewComment, loading, error, fetchComments } = useComments();
  const { agents } = useAgents();
  const { leads } = useLeads();

  //console.log("salesAgend id from leads and id", leads.find(lead => lead.salesAgent._id))

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !author) return;

    try {
      await addNewComment(leadId, { commentText: text, authorId: author });
      await fetchComments(leadId);
      setText("");
      setAuthor("");
    } catch (err) {
      console.error("Failed to add comment:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
        rows={3}
        className="form-control border-dark mb-3"
      />

      <select
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="form-control border-dark"
      >
        <option value="">Select Author</option>
        {agents &&
          agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
      </select>

      <button type="submit" disabled={loading} className="btn btn-primary mt-3">
        {loading ? "Adding..." : "Add Comment"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default AddComment;
