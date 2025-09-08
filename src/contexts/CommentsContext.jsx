import { createContext, useState, useContext, useEffect } from "react";
import { addComment, getComments } from "../services/api";
import { useLeads } from "./LeadsContext";

const CommentsContext = createContext();

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //fetch comments
  const fetchComments = async (leadId) => {
     if (!leadId) {
      console.warn("⚠️ Tried to fetch comments without a leadId");
      return;
    }
    

    try {
      setLoading(true);
      setError(null);
      const response = await getComments(leadId);
      setComments(response.data);
    } catch (error) {
      setError("Failde to fetch comments");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //create or add comments

  const addNewComment = async (leadId, commentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addComment(leadId, commentData);
      const newComment = response.data;
      setComments((prevComments) => [...prevComments, newComment]);
      await fetchComments();
      console.log("createNewTag: ", newComment);
      return newComment;
    } catch (error) {
      setError("Failed to create consmments");
      console.error(error);
      throw error;
    }
  };

  const value = { comments, loading, error, addNewComment, fetchComments };

  return (
    <CommentsContext.Provider value={value}>{children} </CommentsContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentsContext);
  if (context === undefined) {
    throw new Error("useComments must be within a CommentProvider");
  }
  return context;
};
