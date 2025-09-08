import { useLeads } from "../../contexts/LeadsContext";
import { useAgents } from "../../contexts/AgentsContext";
import { useTags } from "../../contexts/TagsContext";
import { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

function LeadForm() {
  const { createNewLead } = useLeads();
  const { agents, fetchAgents, loading: agentsLoading } = useAgents();
  const { tags, fetchTags, loading: tagsLoading } = useTags();

  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "New",
    tags: [],
    timeToClose: 0,
    priority: "Medium",
  });
  const [newTagInput, setNewTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("formData", formData)

  useEffect(() => {
    fetchAgents();
    fetchTags();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'timeToClose' ? Number(value) : value;

  setFormData((prevData) => ({
    ...prevData,
    [name]: newValue,
  }));
  };

  const addTag = (tagName) => {
    const trimmedTagName = tagName.trim();
    // Logic corrected: Add tag only if it's not empty and not already selected
    if (trimmedTagName && !formData.tags.includes(trimmedTagName)) {
      setFormData(prevData => ({
        ...prevData,
        tags: [...prevData.tags, trimmedTagName]
      }));
    }
    setNewTagInput('');
  };

  const removeTag = (tagNameToRemove) => {
    setFormData(prevData => ({
      ...prevData,
      tags: prevData.tags.filter(tagName => tagName !== tagNameToRemove)
    }));
  };

  const handleTagInputSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(newTagInput);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await createNewLead(formData);
      alert("Lead Created Successfully");
      setFormData({
        name: '',
        source: '',
        salesAgent: '',
        status: 'New',
        tags: [],
        timeToClose: 0,
        priority: 'Medium',
      });
    } catch (err) {
      setError('Failed to create lead. Please check the form data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const isFormLoading = loading || agentsLoading || tagsLoading;

  return (
    
    <Card className="p-4 ">
      
      <Form  onSubmit={handleSubmit}>
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
              disabled={agentsLoading}
            >
              <option value="">{agentsLoading ? 'Loading...' : 'Select Agent'}</option>
              {agents.map((agent) => (
                <option key={agent._id} value={agent.id}>
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

        <Form.Group className="mb-3" controlId="formTags">
            <Form.Label>Tags</Form.Label>
            {tagsLoading ? (
                <p>Loading tags...</p>
            ) : (
                <div className="mb-2 d-flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <Badge
                            key={tag._id}
                            pill
                            bg={formData.tags.includes(tag.name) ? 'primary' : 'secondary'}
                            style={{ cursor: 'pointer' }}
                            // Fix: Pass an arrow function to prevent an infinite loop
                            onClick={() => addTag(tag.name)}
                        >
                            {tag.name}
                        </Badge>
                    ))}
                </div>
            )}
            
            <Form.Control 
                type="text"
                placeholder="Type a new tag and press Enter"
                value={newTagInput}
                // Fix: Correctly update the state on change
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={handleTagInputSubmit}
            />
            <div className="mt-2 d-flex flex-wrap gap-2">
                {formData.tags.map(tagName => (
                    <Badge pill bg="primary" key={tagName}>
                        {tagName}
                        <span onClick={() => removeTag(tagName)} style={{cursor: 'pointer', marginLeft: '5px'}}>
                           &times;
                        </span>
                    </Badge>
                ))}
            </div>
        </Form.Group>
        
        {error && <p className="text-danger">{error}</p>}
        
        <Button variant="primary" type="submit" disabled={isFormLoading}>
          {isFormLoading ? 'Submitting...' : 'Create Lead'}
        </Button>
      </Form>
    </Card>
    
  );
}

export default LeadForm;