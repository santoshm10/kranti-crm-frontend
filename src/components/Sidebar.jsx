import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className='card '  >
      <div className='card-body p-4'>
        <Link to="/">Dashboard</Link><br/>
        <Link to="/leads">Leads</Link><br/>
        <Link to="/agents">Agents</Link> <br/>
        <Link to="/reports">Reports</Link> <br/>
        <Link to="/setting">Settings</Link> <br/>
      </div>
    </div>
  )
}

export default Sidebar
