import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import adminServices from '../services/adminServices';

const AdminDashboard = () => {
    const [roomNumber, setRoomNumber] = useState('');
    const [pricePerNight, setPricePerNight] = useState('');
    const [roomId, setRoomId] = useState('');
    const [residentId, setResidentId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [availableRooms, setAvailableRooms] = useState([]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/admin/logout');
            console.log(response.data.message);
            navigate('/admin/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    
    const createRoom = async (e) => {
        e.preventDefault();
        setLoading(true); 

        try {
            const response = await adminServices.createRoom({ roomNumber, pricePerNight });

            if (response.data.msg === 'Room created successfully') {
                alert('Room created successfully');
                setRoomNumber('');
                setPricePerNight('');
            } else if (response.data.msg === 'Room already exists with this number') {
                alert('Room already exists with this number');
            }
        } catch (error) {
            console.error('Error creating room:', error);
            setError('An error occurred while creating the room. Please try again.'); 
            alert(error.message || 'An unexpected error occurred.'); 
        } finally {
            setLoading(false); 
        }
    };
    
    
    const deleteRoom = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3001/api/v1/admin/delete-room/${roomId}`);
            console.log(response.data.msg);
            alert("Room deleted succesfully");
            setRoomId('');
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };



//     const allocateRoom = async () => {
//     if (!residentId || !roomId) {
//         alert('Please provide both Resident ID and Room ID.');
//         return;
//     }
//     try {
//         console.log('Starting room allocation...');
//         const roomData = {
//             residentId,
//             roomId,
//         };
//         // Call the allocateRoom function from adminServices
//         const response = await adminServices.allocateRoom(roomData);
//         console.log('API response:', response.data);
//         alert('Room allocated successfully!');
//     } catch (error) {
//         console.error('Error allocating room:', error);
//         alert('Error allocating room: ' + (error.response?.data?.msg || error.message));
//     }
// };
const allocateRoom = async () => {
    console.log('allocateRoom function called'); // Debugging step

    if (!residentId || !roomId) {
        alert('Please provide both Resident ID and Room ID.');
        return;
    }

    try {
        // Prepare room data
        const roomData = { residentId, roomId };

        // Call the allocateRoom function from adminServices
        const response = await adminServices.allocateRoom(roomData);

        // Debugging step: log the full response object
        console.log('Room allocation response:', response);

        if (response && response.data) {
            console.log('Room allocated:', response.data);
            alert('Room allocated successfully!');
        }
    } catch (error) {
        console.error('Error allocating room:', error);
        alert('Error allocating room: ' + (error.response?.data?.msg || error.message));
    }
};
        

    // Handle Room Deallocation
    const deallocateRoom = async (e) => {
        e.preventDefault();
        try {
            const deallocationData = { residentId, roomId };
            const response = await axios.post('http://localhost:3001/api/v1/admin/deallocate-room', deallocationData);
            console.log(response.data.msg);
            alert("Deallocated Succesfully");
            setResidentId('');
            setRoomId('');
        } catch (error) {
            console.error('Error deallocating room:', error);
        }
    };

    // Fetch Available Rooms
    const getAvailableRooms = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/v1/admin/available-rooms');
            setAvailableRooms(response.data.availableRooms);
        } catch (error) {
            console.error('Error fetching available rooms:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Admin Dashboard</h1>
            <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>

            {/* Create Room */}
            <h2>Create Room</h2>
            <form onSubmit={createRoom}>
                <div className="mb-3">
                    <label htmlFor="roomNumber" className="form-label">Room Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="roomNumber"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pricePerNight" className="form-label">Price Per Night</label>
                    <input
                        type="number"
                        className="form-control"
                        id="pricePerNight"
                        value={pricePerNight}
                        onChange={(e) => setPricePerNight(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create Room</button>
            </form>

            {/* Delete Room */}
            <h2 className="mt-5">Delete Room</h2>
            <form onSubmit={deleteRoom}>
                <div className="mb-3">
                    <label className="form-label">Room ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-danger">Delete Room</button>
            </form>

            {/* Allocate Room */}
            <h2 className="mt-5">Allocate Room</h2>
            <form onSubmit={allocateRoom}>
                <div className="mb-3">
                    <label className="form-label">Resident ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={residentId}
                        onChange={(e) => setResidentId(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Room ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success">Allocate Room</button>
            </form>

            {/* Deallocate Room */}
            <h2 className="mt-5">Deallocate Room</h2>
            <form onSubmit={deallocateRoom}>
                <div className="mb-3">
                    <label className="form-label">Resident ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={residentId}
                        onChange={(e) => setResidentId(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Room ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-warning">Deallocate Room</button>
            </form>

            {/* Get Available Rooms */}
            <h2 className="mt-5">Available Rooms</h2>
            <button className="btn btn-info mb-3" onClick={getAvailableRooms}>Get Available Rooms</button>
            <ul className="list-group">
                {availableRooms.length > 0 ? (
                    availableRooms.map(room => (
                        <li key={room._id} className="list-group-item">
                            Room {room.roomNumber}, Price: {room.pricePerNight}
                        </li>
                    ))
                ) : (
                    <li className="list-group-item">No rooms available</li>
                )}
            </ul>
        </div>
    );
};

export default AdminDashboard;
