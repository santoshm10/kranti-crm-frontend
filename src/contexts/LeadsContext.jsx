import { createContext, useState, useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../services/api";

const LeadsContext = createContext();

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  
  const [searchParams] = useSearchParams();

  // This function now uses the imported getLeads()
  const fetchLeads = async () => {
    setLoading(true);
    setError(null);

    try {
      const filters = Object.fromEntries(searchParams.entries()); // e.g. {status: "New", sortBy: "name"}
      const response = await getLeads(filters); // backend returns an array

      if (Array.isArray(response.data)) {
        setLeads(response.data);
      } else {
        setError("API returned unexpected data format.");
      }
    } catch (error) {
      setError("Failed to fetch leads from the server.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Refetch when filters in URL change
  useEffect(() => {
    fetchLeads();
  }, [searchParams]);

  // This function now uses the imported createLead()
  const createNewLead = async (leadData) => {
    try {
      const response = await createLead(leadData);
      await fetchLeads();
      return response.data;
    } catch (error) {
      setError("Failed to create lead.");
      console.error(error);
      throw error;
    }
  };

  // Function to update an existing lead
  const updateLeadData = async (id, updatedData) => {
    try {
      const response = await updateLead(id, updatedData);
      setLeads((leads) =>
        leads.map((lead) => (lead._id === id ? response.data : lead))
      );
    } catch (error) {
      setError("Failed to update lead.");
      console.error(error);
      throw error;
    }
  };

  // Function to delete a lead
  const deleteLeadById = async (id) => {
    try {
      const response = await deleteLead(id);
      setLeads((allLeads) => allLeads.filter((lead) => lead._id !== id));
    } catch (error) {
      setError("Failed to delete lead.");
      console.error(error);
      throw error;
    }
  };

  const value = {
    leads,
    loading,
    error,
    fetchLeads,
    createNewLead,
    updateLeadData,
    deleteLeadById,
  };

  return (
    <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (context === undefined) {
    throw new Error("useLeads must be used within a LeadsProvider");
  }
  return context;
};
