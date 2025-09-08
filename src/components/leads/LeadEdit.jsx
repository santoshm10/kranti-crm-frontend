import { useParams, useNavigate } from "react-router-dom";
import { useLeads } from "../../contexts/LeadsContext";
import { useAgents } from "../../contexts/AgentsContext";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function LeadForm() {
  const { leads, updateLeadData } = useLeads();
  const { agents } = useAgents();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("edit lead id:", id);

  //const { tags, fetchTags, loading: tagsLoading } = useTags();

  const lead = leads.find((lead) => lead._id === id);

  const [formData, setFormData] = useState({
    name: lead?.name || "",
    salesAgent: lead?.salesAgent?._id || "",
    source: lead?.source || "",
    status: lead?.status || "",
    priority: lead?.priority || "",
    timeToClose: lead?.timeToClose || "",
  });

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    // Convert timeToClose to number
    if (name === "timeToClose") {
      value = Number(value);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateLeadData(id, formData);
    navigate(`/leads/${id}`);
  };

  console.log("edit lead formData:", formData);

  return (
    <Card className="p-4 ">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formLeadName">
          <Form.Label>Lead Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleOnChange}
            required
          />
        </Form.Group>

        <Row>
          <Form.Group as={Col} className="mb-3" controlId="formLeadSource">
            <Form.Label>Lead Source</Form.Label>
            <Form.Select
              name="source"
              value={formData.source}
              onChange={handleOnChange}
              required
            >
              <option value="">Select Source</option>
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Advertisement">Advertisement</option>
              <option value="Email">Email</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="formSalesAgent">
            <Form.Label>Sales Agent</Form.Label>
            <Form.Select
              name="salesAgent"
              value={formData.salesAgent}
              onChange={handleOnChange}
              required
            >
              <option value="">Select Agent</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} className="mb-3" controlId="formLeadStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              onChange={handleOnChange}
              value={formData.status}
              required
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Closed">Closed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="formTimeToClose">
            <Form.Label>Time to Close (Days)</Form.Label>
            <Form.Control
              type="number"
              name="timeToClose"
              value={formData.timeToClose}
              onChange={handleOnChange}
              min="0"
              required
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formLeadPriority">
          <Form.Label>Priority</Form.Label>
          <Form.Select
            name="priority"
            id="leadPriority"
            value={formData.priority}
            onChange={handleOnChange}
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit">Submit edit</Button>
      </Form>
    </Card>
  );
}

export default LeadForm;
