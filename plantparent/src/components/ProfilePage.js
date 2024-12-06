import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [plants, setPlants] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        username: '',
        email: '',
        password: '',
        location: '',
    });

    useEffect(() => {
        // Retrieve user data
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
            setUpdatedUser(userData); // Initialize with current user data
        } else {
            alert('No user is logged in.');
            navigate('/');
        }

        // Retrieve plant data
        const plantData = JSON.parse(localStorage.getItem('plants')) || {};
        const plantList = Object.keys(plantData).map((id) => ({
            id,
            name: plantData[id].name,
            image: plantData[id].image,
        }));
        setPlants(plantList);
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const saveProfile = () => {
        setUser(updatedUser); // Update user state
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Save updated user data to localStorage
        setIsEditing(false);
        alert('Profile updated successfully!');
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="profile-page">
            <h1>Welcome, {user?.username || 'User'}!</h1>
            <h2>Profile Information</h2>
            {isEditing ? (
                <div className="profile-edit-form">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="username"
                            value={updatedUser.username}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={updatedUser.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={updatedUser.password}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Location:
                        <input
                            type="text"
                            name="location"
                            value={updatedUser.location}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button onClick={saveProfile} className="save-button">
                        Save
                    </button>
                </div>
            ) : (
                <div className="profile-info">
                    <p><strong>Name:</strong> {user?.username}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Password:</strong> {user?.password}</p>
                    <p><strong>Location:</strong> {user?.location || 'Not specified'}</p>
                    <button onClick={() => setIsEditing(true)} className="edit-button">
                        Edit Profile
                    </button>
                </div>
            )}

            <h2>Your Plants</h2>
            <div className="plants-list">
                {plants.map((plant) => (
                    <div key={plant.id} className="plant-item">
                        <h3>{plant.name}</h3>
                        {plant.image ? (
                            <img src={plant.image} alt={plant.name} className="plant-thumbnail" />
                        ) : (
                            <div className="placeholder">No Image</div>
                        )}
                    </div>
                ))}
            </div>

            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
        </div>
    );
};

export default ProfilePage;