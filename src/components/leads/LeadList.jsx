import { useSearchParams, Link } from "react-router-dom";
import { useAgents } from "../../contexts/AgentsContext";
import { useTags } from "../../contexts/TagsContext";
import { useLeads } from "../../contexts/LeadsContext";

const LeadList = ({ dashboardView = false }) => {
  const { leads, loading, error } = useLeads();
  const { agents } = useAgents();
  const { tags } = useTags();

  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    status: searchParams.get("status") || "",
    salesAgent: searchParams.get("salesAgent") || "",
    source: searchParams.get("source") || "",
    tags: searchParams.get("tags") || "",
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "",
    sortOrder: searchParams.get("sortOrder") || "asc",
  };

  const handleFilterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(name, value);
    } else {
      newParams.delete(name);
    }
    setSearchParams(newParams);
  };

  const handleQuickFilter = (status) => {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.get("status") === status) {
      newParams.delete("status");
    } else {
      newParams.set("status", status);
    }
    setSearchParams(newParams);
  };

  const allStatuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];
  const allSources = ["Website", "Referral", "Cold Call", "Advertisement", "Other"];
  const allSortFields = ["name", "createdAt"];

  if (loading || !leads) {
    return (
      <div className="d-flex justify-content-center align-items-center text-muted py-5">
        Loading Leads...
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center text-danger py-5">
        {error}
      </div>
    );
  }

  const leadCounts =
    leads?.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {}) || {};

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h3 className="card-title mb-4">
          {dashboardView ? "Lead Overview" : "Lead List"}
        </h3>

        {dashboardView && (
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-2">
              {Object.keys(leadCounts || {}).map((status) => (
                <div
                  key={status}
                  onClick={() => handleQuickFilter(status)}
                  className={`badge p-2 ${
                    filters.status === status
                      ? "bg-primary text-white"
                      : "bg-light text-dark border"
                  }`}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{status}:</strong> {leadCounts[status]} Leads
                </div>
              ))}
            </div>
            <div className="mt-3">
              <Link to="/leads/new" className="btn btn-success">
                + Add New Lead
              </Link>
            </div>
          </div>
        )}

        {!dashboardView && (
          <div className="row g-2 mb-4">
            {/* <div className="col-md">
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by name..."
                className="form-control"
              />
            </div> */}
            <div className="col-md">
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">All Statuses</option>
                {allStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md">
              <select
                name="salesAgent"
                value={filters.salesAgent}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">All Agents</option>
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md">
              <select
                name="source"
                value={filters.source}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">All Sources</option>
                {allSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md">
              <select
                name="tags"
                value={filters.tags}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">All Tags</option>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md">
              <select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                className="form-select"
              >
                <option value="">Sort By</option>
                {allSortFields.map((field) => (
                  <option key={field} value={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {filters.sortBy && (
              <div className="col-md">
                <select
                  name="sortOrder"
                  value={filters.sortOrder}
                  onChange={handleFilterChange}
                  className="form-select"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            )}
          </div>
        )}

        <div className="row g-3">
          {leads?.length > 0 ? (
            leads.map((lead) => (
              <div key={lead._id} className="col-md-4">
                <div className="card shadow-sm rounded-3 h-100 border">
                  <div className="card-body">
                    <h5 className="card-title">{lead.name}</h5>
                    <p className="card-text text-muted mb-2">
                      Source: {lead.source}
                    </p>
                    <div className="mb-2">
                      <span className="badge bg-primary me-1">{lead.status}</span>
                      {lead.tags?.map((tag) => (
                        <span
                          key={tag._id}
                          className="badge bg-success me-1"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    <p className="card-text">
                      <small className="text-muted">
                        Agent: {lead.salesAgent?.name || "Unassigned"}
                      </small>
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0">
                    <Link
                      to={`/leads/${lead._id}`}
                      className="btn btn-link p-0 text-decoration-none"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted">No leads found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadList;
