

import { createContext, useState, useContext, useEffect } from "react";
import { getAgents, createAgents} from "../services/api"

const AgentsContext = createContext()

export const AgentsProvider = ({children}) => {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // This function now uses the imported getAgents()
    const fetchAgents = async () => {
        setLoading(true)
        setError(null)

        try {
            const response = await getAgents()
            setAgents(response.data)
        } catch (error) {
            setError("Failed to fetch agents.")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    // This function now uses the imported createAgents()
    const createNewAgent = async (agentData) => {
        try {
            const response = await createAgents(agentData);
            // Re-fetch the entire list to keep the UI up to date
            await fetchAgents(); 
            // The console.log should be placed before the return statement
            console.log("createNewAgent: ", response.data)
            return response.data; 
        } catch (error) {
            setError("Failed to create agent")
            console.error(error);
            throw error;
        }
    }

    // New: Use useEffect to fetch agents when the component mounts
    useEffect(() => {
        fetchAgents();
    }, []);

    // New: The 'value' object now includes the loading and error states
    const value = {
        agents,
        loading,
        error,
        fetchAgents,
        createNewAgent,
    };

    return <AgentsContext.Provider value={value}>
        {children}
    </AgentsContext.Provider>
}

export const useAgents = () => {
    const context = useContext(AgentsContext);
    if(context === undefined) {
        throw new Error("useAgents must be within a AgentsProvider")
    }
    // New: The hook must return the context value
    return context;
}