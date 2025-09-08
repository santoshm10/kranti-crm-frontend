import { createContext, useContext, useState, useEffect } from "react";
import {
  getLeadsClosedLastWeek,
  getPipelineLeads,
  getClosedLeads,
  getClosedLeadsByAgent,
} from "../services/api";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [closedLeads, setClosedLeads] = useState([]);
  const [pipelineLeads, setPipelineLeads] = useState([]);
  const [closedLeadsByAgent, setClosedLeadsByAgent] = useState([]);
  const [lastWeekClosedLeads, setLastWeekClosedLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // This function now uses the imported getClosedLeads()
  const fetchClosedLeads = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getClosedLeads();
      setClosedLeads(response.data);
    } catch (error) {
      setError("Failed to fetch Closed Leads.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPipelineLeads = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getPipelineLeads();
      setPipelineLeads(response.data);
    } catch (error) {
      setError("Failed to fetch Piplene Leads");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClosedLeadsByAgent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getClosedLeadsByAgent();
      setClosedLeadsByAgent(response.data);
    } catch (error) {
      setError("Failed to fetch closed leads by agent");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadsClosedLastWeek = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getLeadsClosedLastWeek();
      setLastWeekClosedLeads(response.data);
    } catch (error) {
      setError("Failed to fetch last week closed leads");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClosedLeads();
    fetchPipelineLeads();
    fetchClosedLeadsByAgent();
    fetchLeadsClosedLastWeek();
  }, []);

  const value = {
    closedLeads,
    pipelineLeads,
    closedLeadsByAgent,
    lastWeekClosedLeads,
    loading,
    error,
  };
  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error("useReports must be within a ReportsProvider");
  }

  return context;
};
