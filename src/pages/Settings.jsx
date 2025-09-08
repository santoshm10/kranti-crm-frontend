import { Link } from "react-router-dom";

function Settings() {
  return (
    <div className="card">
      <div className="d-flex  align-items-center flex-wrap m-4 gap-4">
        <div>
         
          <Link to="/agents/new" className="btn btn-primary ">
            Add New Agent
          </Link>
        </div>
        <div>
         
          <Link to="/leads/new" className="btn btn-secondary">
            Add New Lead
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Settings;
