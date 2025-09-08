import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Import all your context providers
import { LeadsProvider } from "./contexts/LeadsContext";
import { AgentsProvider } from "./contexts/AgentsContext";
import { TagsProvider } from "./contexts/TagsContext";
import { CommentsProvider } from "./contexts/CommentsContext";
import { ReportProvider } from "./contexts/ReportContext";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import AddLeads from "./pages/AddLeads";
import AgentForm from "./pages/AgentForm";
import Agents from "./pages/Agents";
import SalesByAgent from "./pages/SalesByAgent";
import Leads from "./pages/Leads";
import LeadDetails from "./components/leads/LeadDetails";
import LeadEdit from "./components/leads/LeadEdit";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <LeadsProvider>
        <AgentsProvider>
          <TagsProvider>
            <CommentsProvider>
              <ReportProvider>
                <Header />
                <div style={{ display: "flex", gap: "1rem", margin: "0 1rem" }}>
                  <div
                    style={{
                      width: "250px", // fixed width
                      flexShrink: 0, // don't let it shrink
                    }}
                  >
                    <Sidebar />
                  </div>
                  <div style={{ flex: 1 }}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/leads" element={<Leads />} />
                      <Route path="leads/:id" element={<LeadDetails />} />
                      <Route path="/leads/new" element={<AddLeads />} />
                      <Route path="leads/:id/edit" element={<LeadEdit />} />
                      <Route path="agents" element={<Agents />} />
                      <Route path="/agents/new" element={<AgentForm />} />
                      <Route path="/agents/:id" element={<SalesByAgent />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/setting" element={<Settings />}/>
                    </Routes>
                  </div>
                </div>
              </ReportProvider>
            </CommentsProvider>
          </TagsProvider>
        </AgentsProvider>
      </LeadsProvider>
    </BrowserRouter>
  );
}

export default App;
