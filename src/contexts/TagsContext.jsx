import { createContext, useContext, useState, useEffect } from "react";
import { getTags, createTags } from "../services/api";

const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTags = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getTags();
      setTags(response.data);
    } catch (error) {
      setError("Failde to fetch tags");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []); 


  const createNewTag = async (tagsData) => {
    try {
      const response = await createTags({name:tagsData});
      const newTag = response.data;

      setTags(prevTags => [...prevTags, newTag])

      await fetchTags();
      console.log("createNewTag: ", newTag);
      return newTag
    } catch (error) {
      setError("Failed to create tags");
      console.error(error);
      throw error;
    }
  };

  

  const value = {
    tags,
    loading,
    error,
    fetchTags,
    createNewTag,
  };
  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
};

export const useTags = () => {
  const context = useContext(TagsContext);
  if (context === undefined) {
    throw new Error("useTags must be within a TagsProvider");
  }
  return context;
};
