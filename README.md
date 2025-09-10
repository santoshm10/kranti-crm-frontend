# Sales CRM

Kranti CRM is a Customer Relationship Management system designed to streamline sales processes, and team collaboration. Built using the MERN stack (MongoDB, Express.js, React, Node.js), it offers a modern, scalable solution for businesses aiming to enhance operational efficiency.

---

## Demo Link

[Live Demo](https://kranti-crm-frontend.vercel.app/)

---

## Quick Start

```
Clone the repository
git clone https://github.com/<your-username>/kranti-crm-frontend.git
git clone https://github.com/<your-username>/kranti-crm-backend.git

Frontend setup
cd kranti-crm-frontend
npm install
npm run dev   # or npm start

Backend setup
cd ../kranti-crm-backend
npm install
npm run dev   # starts server at localhost:3001
```

---

## Technologies

- React + Vite
- React Router
- Bootstrap
- axios
- chart.js
- Node.js
- Express
- MongoDB

---

## Demo video

Watch a walkthrough (5 minutes) of all major features of this app: [Video Link](https://drive.google.com/file/d/1aq8NZlR7Q0VkGN6cNL6BaobhSYOpYXeq/view?usp=sharing)

---

## Features
**Home/Dashboard**
- Quick overview of leads and agents
- Track pipeline and closed deals
- "Add New Lead" button opens a form

**Leads**
- Leads details button opnes Lead details page
- URL-based filters "Status, Agents, Sources, Tags"

**Agents**
- All sales Agents
- "Add New Agent" button opens a form
- Clickable card opnes agent details page

**Reports**
- View closed and pipeline leads
- Closed Leads by Agent
- Last Week Closed Leads

**Settings**
- "Add New Lead" button opens a form
- "Add New Agent" button opens a form
- Delete Agent button
- Delete Lead button

---

## API Refrence

### **GET /api/v1/leads**
List all leads
Sample responce:
```
[
  {
    _id, name, source, salesAgent, status, tags, timeToClose, priority, createdA, updatedAt
  },
]
```
### **POST /api/v1/leads**
Create new lead 
Sample responce:
```
{
  name, source, salesAgent, status, tags, timeToClose, priority
}
```
### **PATCH /api/v1/leads/:id**
Update lead

### **DELETE /api/v1/leads/:id**
Delete lead

### **GET /api/v1/agents**
Get all agents
Sample responce:
```
[
  {
    _id, name, email
  },
]
```

### **POST /api/v1/agents**
Create new agent
Sample responce:
```
{
  name, email
}
```

### **DELETE /api/v1/agents/:id**
Delete lagent

### **GET /api/v1/leads/:id/comments**
Get commets of a lead
Sample responce:
```
[
  {
    _id, author, commentText, createdAt
  },
]
```

### **POST /api/v1/leads/:id/comments**
Get all agents
Sample responce:
```
  {
    author, commentText
  },
```

### **GET /api/v1/leads/tags**
Get all tags
Sample responce:
```
[
  {
    _id, name, createdAt
  },
]
```

### **POST /api/v1/tags**
Create tags
Sample responce:
```
  {
    tags
  },
```

### **GET /api/v1/tags/leads/:tag-name**
Get Leads by tag
Sample responce:
```
  {
    _id, name, createdAt
  },
```

### **GET /api/v1/report/pipeline**
Get pipeline leads
Sample responce:
```
  {
    totalLeadsInPipeline
  },
```

### **GET /api/v1/report/closed**
Get closed leads
Sample responce:
```
  {
    totalClosedLeads
  },
```
### **GET /api/v1/report/closed-by-agent**
Get closed leads by agents
Sample responce:
```
  {
    agentId, agentName, closedCount
  },
```

---

## Contact

For bugs or feature requests, please reach out to sdmande101195@gmail.com
