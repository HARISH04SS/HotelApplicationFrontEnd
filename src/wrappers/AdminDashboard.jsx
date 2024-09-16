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

    // Handle Admin Logout
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/admin/logout');
            console.log(response.data.message);
            navigate('/admin/login'); // Redirect to login page after logout
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Handle Room Creation
    // const createRoom = async (roomData) => {
    //     try {
    //         const response = await axios.post('http://localhost:3001/api/v1/admin/create-room', roomData);
    //         console.log('Room created successfully:', response.data);
    //     } catch (error) {
    //         console.error('Error creating room:', error);
    //     }
    // };
    // const createRoom = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:3001/api/v1/admin/create-room', {
    //             roomNumber,
    //             pricePerNight
    //         });
    //         console.log('Room created successfully:', response.data);
    //         // Optionally clear form or provide feedback

    //     } catch (error) {
    //         console.error('Error creating room:', error);
    //     }
    // };
    // const createRoom = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await adminServices.createRoom({ roomNumber, pricePerNight });

    //         if (response.data.msg === 'Room created successfully') {
    //             alert('Room created successfully');
    //             // Reset the form fields
    //             setRoomNumber('');
    //             setPricePerNight('');
    //         } else if (response.data.msg === 'Room already exists with this number') {
    //             alert('Room already exists with this number');
    //         }
    //     } catch (error) {
    //         console.error('Error creating room:', error);
    //         alert('An error occurred while creating the room. Please try again.');
    //     }
    // };
    const createRoom = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            const response = await adminServices.createRoom({ roomNumber, pricePerNight });

            if (response.data.msg === 'Room created successfully') {
                alert('Room created successfully');
                // Reset the form fields
                setRoomNumber('');
                setPricePerNight('');
            } else if (response.data.msg === 'Room already exists with this number') {
                alert('Room already exists with this number');
            }
        } catch (error) {
            console.error('Error creating room:', error);
            setError('An error occurred while creating the room. Please try again.'); // Set error message
            alert(error.message || 'An unexpected error occurred.'); // Display error message
        } finally {
            setLoading(false); // Stop loading
        }
    };
    
    

    // Handle Room Deletion
    const deleteRoom = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3001/api/v1/admin/deleteroom/${roomId}`);
            console.log(response.data.msg);
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    // Handle Room Allocation
    const allocateRoom = async (e) => {
        e.preventDefault();
        try {
            const allocationData = { residentId, roomId };
            const response = await axios.post('http://localhost:3001/api/v1/admin/allocateroom', allocationData);
            console.log(response.data.msg);
        } catch (error) {
            console.error('Error allocating room:', error);
        }
    };

    // Handle Room Deallocation
    const deallocateRoom = async (e) => {
        e.preventDefault();
        try {
            const deallocationData = { residentId, roomId };
            const response = await axios.post('http://localhost:3001/api/v1/admin/deallocateroom', deallocationData);
            console.log(response.data.msg);
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
