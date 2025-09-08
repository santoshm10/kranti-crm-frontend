import axios from "axios";

const API = axios.create({ baseURL: "https://kranti-crm-backend.vercel.app/api/v1/"})

// Leads
export const createLead = (data) => API.post('/leads', data);
export const getLeads = (params) => API.get('/leads', {params});
export const getLeadById = (id) => API.get(`/leads/${id}`);
export const updateLead = (id, data) => API.patch(`/leads/${id}`, data);
export const deleteLead = (id) => API.delete(`/leads/${id}`)

//Agents
export const getAgents = () => API.get('/agents');
export const createAgents = (data) => API.post('/agents', data);
export const deleteAgent = (id) => API.delete(`/agents/${id}`)

//Tags
export const getTags = () => API.get('/tags');
export const createTags = (data) => API.post('/tags', data);

//Comments
export const addComment = (id, comment) => API.post(`/leads/${id}/comments`, comment);
export const getComments = (id) => API.get(`/leads/${id}/comments`);

//Reports
export const getLeadsClosedLastWeek = () => API.get('/report/last-week');
export const getPipelineLeads = () => API.get('/report/pipeline');
export const getClosedLeads = () => API.get('/report/closed');
export const getClosedLeadsByAgent = () => API.get('/report/closed-by-agent')