import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/global.css';

const ManageLocations = () => {
  const [locations, setLocations] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    // Fetch existing authorized locations from the backend
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/locations');
        setLocations(response.data.locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const addLocation = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/locations', { latitude, longitude });
      setLocations([...locations, { latitude, longitude }]);
      setLatitude('');
      setLongitude('');
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  const deleteLocation = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/api/locations/${index}`);
      setLocations(locations.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  return (
    <div>
      <h2>Manage Authorized Locations</h2>
      <div>
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button onClick={addLocation}>Add Location</button>
      </div>
      <ul>
        {locations.map((location, index) => (
          <li key={index}>
            Latitude: {location.latitude}, Longitude: {location.longitude}
            <button onClick={() => deleteLocation(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageLocations;
