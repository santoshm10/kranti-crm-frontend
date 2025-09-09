import { useState } from "react";
import { useAgents } from "../contexts/AgentsContext";
import { useLeads } from "../contexts/LeadsContext";
import { useParams } from "react-router-dom";

function SalesByAgent() {
  const { agents } = useAgents();
  const { leads } = useLeads();
  const { id: agentId } = useParams();
  console.log("id: agentId: ", agentId)

  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOption, setSortOption] = useState("none");

  const selectedAgent = agents.find((agent) => agent.id === agentId);
  console.log("selectedAgent: ", selectedAgent)
 
  let agentLeads = leads.filter((lead) => lead.salesAgent?._id === agentId );
  console.log("agentLeads: ", agentLeads)


  if (statusFilter !== "All") {
    agentLeads = agentLeads.filter((agent) => agent.status === statusFilter);
  }

  if (priorityFilter !== "All") {
    agentLeads = agentLeads.filter(
      (agent) => agent.priority === priorityFilter
    );
  }

  if (sortOption === "min" || sortOption === "max") {
    agentLeads = [...agentLeads].sort((a, b) => {
      return sortOption === "min"
        ? new Date(a.timeToClose) - new Date(b.timeToClose)
        : new Date(b.timeToClose) - new Date(a.timeToClose);
    });
  }

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="text-center card-header">Lead List by Agent</h2>
        <h4 className="text-center card-title pt-3">
          Sales Agent: {selectedAgent.name}
        </h4>
        <div className="d-flex flex-wrap gap-4 my-4 ">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-primary text-white rounded p-2"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-success text-white rounded p-2"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded p-2"
          >
            <option value="none">Time to Close</option>
            <option value="min">Min Time to Close</option>
            <option value="max">Max Time to Close</option>
          </select>
        </div>
        <div className="row g-4">
          {agentLeads && agentLeads.length > 0 ? (
            agentLeads.map((lead) => (
              <div key={lead._id} className="col-12 col-sm-6 col-lg-4">
                <div className="card p-3 shadow-sm rounded-3">
                  <p>
                    <strong>{lead.name}:</strong>{" "}
                  </p>
                  <span className="pe-2">
                    <span className="badge bg-primary me-1">Status: </span>{" "}
                    {lead.status}
                  </span>{" "}
                  <span>
                    <span className="badge bg-success me-1">Priority:</span>{" "}
                    {lead.priority}
                  </span>
                  <p>
                    <strong>Time to Close: </strong>
                    {lead.timeToClose} days
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No leads</p>
          )
            }
        </div>
      </div>
    </div>
  );
}

export default SalesByAgent;
