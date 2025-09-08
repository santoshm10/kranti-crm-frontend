import { useAgents } from "../contexts/AgentsContext";
import { Link } from "react-router-dom";

function Agents() {
  const { agents, loading, error } = useAgents();
  
  if(loading) {
    <p>Loading agents...</p>
  }
  return (
    <div className="card p-4 shadow-sm rounded-3">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <h2 className="fw-bold text-dark">Sales Agents</h2>
        <Link
          to="/agents/new"
          className="btn btn-primary d-flex align-items-center gap-2"
        >
          
          Add New Agent
        </Link>
      </div>

      {agents.length > 0 ? (
        
        <div className="row g-4">
          {agents.map((agent) => (
            
            <div key={agent.id} className="col-12 col-sm-6 col-lg-4">
              <div className="card h-100 p-3 shadow-sm rounded-3">
                <Link to={`/agents/${agent.id}`}>
                <div className="card-body">
                  <h5 className="fw-semibold card-title">{agent.name}</h5>
                  <p className="card-text text-muted">{agent.email}</p>
                </div>
                </Link>
              </div>
            </div>
            
          ))}
        </div>
      ) : (
        <div className="text-center p-5 text-muted">
          <p>No agents found. Start by adding a new one!</p>
        </div>
      )}
    </div>
  );
}

export default Agents;
