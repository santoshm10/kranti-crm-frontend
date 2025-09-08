import { useParams, useNavigate } from "react-router-dom";
import { useLeads } from "../../contexts/LeadsContext";

import Comments from "../comments/Comments";
import AddCommentForm from "../comments/AddCommentForm";

function LeadDetails() {
  const { leads } = useLeads();
  const { id: leadId } = useParams();
  const navigate = useNavigate()

  const selectedLead = leads.find((lead) => lead._id === leadId);

  return (
    <div className="card p-4">
      <div className="card-body">
        <h2 className="card-title text-center">Lead Details</h2>

        {selectedLead && (
          <>
            <p>
              <strong>Lead Name:</strong> {selectedLead.name}
            </p>
            <p>
              <strong>Sales Agent:</strong> {selectedLead.salesAgent.name}
            </p>
            <p>
              <strong>Lead Source:</strong> {selectedLead.source}
            </p>
            <p>
              <strong>Lead Status:</strong> {selectedLead.status}
            </p>
            <p>
              <strong>Lead Priority:</strong> {selectedLead.priority}
            </p>
            <p>
              <strong>Time to Close:</strong> {selectedLead.timeToClose}
            </p>
          </>
        )}

        <button className="btn btn-primary" onClick={()=> navigate(`/leads/${leadId}/edit`)}>Edit Lead Details</button>
        <hr />
        <h2 className="text-center">Comments</h2>

        <Comments leadId={leadId} />
        <AddCommentForm leadId={leadId}/>
      </div>
    </div>
  );
}

export default LeadDetails;
