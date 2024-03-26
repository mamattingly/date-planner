import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DateStyles.css'; // Import CSS file

function App() {
  const [activity, setActivity] = useState(null);
  const [foodPlace, setFoodPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNewDate = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/places/new-date');
      if (!response.data) {
        throw new Error('Failed to fetch new date');
      }
      console.log(response.data);
      setActivity(response.data.activity);
      setFoodPlace(response.data.foodPlace);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const fetchActivityOrFoodPlace = async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/places/new-${type}`);
      if (!response.data) {
        throw new Error(`Failed to fetch new ${type}`);
      }
      console.log(response.data);
      if (type === 'activity') {
        setActivity(response.data);
      } else if (type === 'food-place') {
        setFoodPlace(response.data);
      }
      setError(null);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNewDate();
  }, []);

  const openMaps = (address) => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    let url;
    if (isIOS) {
      url = `maps://maps.apple.com/?q=${encodeURIComponent(address)}`;
    } else if (isAndroid) {
      url = `geo:0,0?q=${encodeURIComponent(address)}`;
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="container">
      {error && <p className="error">Error: {error}</p>}
      {activity && (
        <div className="card">
          <h3>Activity</h3>
          <p>Name: {activity.Name}</p>
          <p>Category: {activity.Category}</p>
          <p>Cost: {activity.Cost}</p>
          <p >Address: <a href="#" className='map-link' onClick={() => openMaps(activity.Address)}>{activity.Address}</a></p>
          <p>Notes: {activity.Notes}</p>
          <button className="button" onClick={() => fetchActivityOrFoodPlace('activity')}>Get Activity</button>
        </div>
      )}
      {foodPlace && (
        <div className="card">
          <h3>Food</h3>
          <p>Name: {foodPlace.Name}</p>
          <p>Category: {foodPlace.Category}</p>
          <p>Cost: {foodPlace.Cost}</p>
          <p>Address: <a href="#" className='map-link' onClick={() => openMaps(foodPlace.Address)}>{foodPlace.Address}</a></p>
          <p>Notes: {foodPlace.Notes}</p>
          <button className="button" onClick={() => fetchActivityOrFoodPlace('food-place')}>Get Food</button>
        </div>
      )}
    </div>
  );
}

export default App;
