import { useState } from "react";
import { useAgents } from "../contexts/AgentsContext";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function AgentForm() {
  const { createNewAgent } = useAgents();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createNewAgent(formData);
      alert("Agent Created Successfully");
      setFormData({
        name: "",
        email: "",
      });
    } catch (error) {
      setError("Failed to create agent. Please check the form data.");
    }
  };

  return (
    
      <div className="bg-light rounded-3">
        <Card className="p-4 ">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="">Agent Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleOnChange}
                className="form-Control"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="">Email Address:</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                className="form-Control"
              />
            </Form.Group> <br />

            <Button type="submit">Create Agent</Button>
          </Form>
        </Card>
      </div>
    
  );
}

export default AgentForm;
