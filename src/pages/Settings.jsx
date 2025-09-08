import { Link } from "react-router-dom";
import { useAgents } from "../contexts/AgentsContext";
import { useLeads } from "../contexts/LeadsContext";

function Settings() {
  const { leads, deleteLeadById, loading: leadsLoading, error: leadsError } = useLeads();
  const { agents, deleteAgentById, loading: agentsLoading, error: agentsError } = useAgents();
  console.log(agents)
  console.log(leads)

  return (
    <div className="card p-4">
     
      <div className="d-flex align-items-center justify-content-center gap-3 mb-4 flex-wrap">
        <Link to="/agents/new" className="btn btn-primary">
          Add New Agent
        </Link>
        <Link to="/leads/new" className="btn btn-secondary">
          Add New Lead
        </Link>
      </div>

    
      <div className="row">
 
        <div className="col-md-6 mb-4">
          <h5>Agents</h5>
          {agentsLoading ? (
            <p className="text-muted">Loading agents...</p>
          ) : agentsError ? (
            <p className="text-danger">Error: {agentsError}</p>
          ) : agents?.length > 0 ? (
            <ul className="list-group">
              {agents.map((agent) => (
                <li
                  key={agent._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{agent.name}</span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteAgentById(agent.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No agents found.</p>
          )}
        </div>

   
        <div className="col-md-6 mb-4">
          <h5>Leads</h5>
          {leadsLoading ? (
            <p className="text-muted">Loading leads...</p>
          ) : leadsError ? (
            <p className="text-danger">Error: {leadsError}</p>
          ) : leads?.length > 0 ? (
            <ul className="list-group">
              {leads.map((lead) => (
                <li
                  key={lead._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{lead.name}</span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteLeadById(lead._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No leads found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
