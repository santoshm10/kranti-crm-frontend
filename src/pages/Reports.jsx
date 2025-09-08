import "chart.js/auto";
import { Pie, Bar } from "react-chartjs-2";
import { useReports } from "../contexts/ReportContext";

function Reports() {
  const {
    closedLeads,
    pipelineLeads,
    closedLeadsByAgent,
    lastWeekClosedLeads,
    loading,
    error,
  } = useReports();

  console.log(
    closedLeadsByAgent
  );

  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>{error}</p>;

  const closedVsPipelineData = {
    labels: ["Closed Leads", "Pipeline Leads"],
    datasets: [
      {
        data: [
          closedLeads?.totalClosedLeads || 0,
          pipelineLeads?.totalLeadsInPipeline || 0,
        ],
        backgroundColor: ["#4CAF50", "#FFC107"],
      },
    ],
  };

  const closedLeadsByAgentData = {
    labels: closedLeadsByAgent.map(agent => agent.agentName),
    datasets: [
        {
        label: "Closed Leads",
        data: closedLeadsByAgent.map((a) => a.closedCount),
        backgroundColor: "#2196F3",
      },
    ]
  }

  const lastWeekClosedData = {
    labels: ["Last Week Closed"],
    datasets: [
      {
        data: [lastWeekClosedLeads.length || 0],
        backgroundColor: ["#9C27B0"],
      },
    ],
  };

  return (
    <div className="container ">
      <div className="row g-4">
        {/* Closed vs Pipeline */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">Closed vs Pipeline</h5>
              <Pie data={closedVsPipelineData} />
            </div>
          </div>
        </div>

        {/* Closed Leads by Agent */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">Closed Leads by Agent</h5>
              <Bar data={closedLeadsByAgentData} />
            </div>
          </div>
        </div>

        {/* Last Week Closed Leads */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">Last Week Closed Leads</h5>
              <Pie data={lastWeekClosedData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
