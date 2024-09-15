import { Link } from "react-router-dom"

const UserDashboardNav = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/dashboard">Resident Dashboard</Link>
            </div>
            <ul
                className="nav-item">
                    <Link className="nav-link active"
                    aria-current="page" to="/logout">Logout</Link>

            </ul>
        </nav>
        <h1>Welcome... </h1><br></br>
         <h4>Please fill the query form if u have any queries</h4>
    </div>
  )
}

export default UserDashboardNav