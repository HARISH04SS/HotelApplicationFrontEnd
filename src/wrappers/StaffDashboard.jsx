import { jwtDecode } from 'jwt-decode';
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
const StaffDashboardNav = () => {
    const [staffId, setStaffId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setStaffId(decodedToken.id); // Use 'id' based on the token payload
            } catch (error) {
                console.error('Error decoding token:', error);
                setStaffId(null);
            }
        }
    }, []);

    if (!staffId) {
        return <div>Staff ID not found. Please log in again.</div>;
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
                <div className="container-fluid">
                <Link className="navbar-brand" to="/staffDashboard">Staff Dashboard</Link>
                </div>
                <ul className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/logout">Logout</Link>
                </ul>
            </nav>
            <h1>Welcome Staff...</h1>
        </div>
    );
};

export default StaffDashboardNav;
