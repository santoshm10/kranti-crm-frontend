import LeadList from "../components/leads/LeadList";


function Dashboard() {
  return (
    <div>
     <LeadList dashboardView={true}/>
    </div>
    
  );
}

export default Dashboard;
