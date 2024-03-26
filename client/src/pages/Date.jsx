import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewDate = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/places/new-date');
        if (!response.data) {
          throw new Error('Failed to fetch new date');
        }
        console.log(response.data);
        setDate(response.data);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchNewDate();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {date && (
        <div>
          <div>
            <h3>Activity</h3>
            <p>Name: {date.activity.Name}</p>
            <p>Category: {date.activity.Category}</p>
            <p>Cost: {date.activity.Cost}</p>
            <p>Address: {date.activity.Address}</p>
            <p>Notes: {date.activity.Notes}</p>
          </div>
          <div>
            <h3>Food Place</h3>
            <p>Name: {date.foodPlace.Name}</p>
            <p>Category: {date.foodPlace.Category}</p>
            <p>Cost: {date.foodPlace.Cost}</p>
            <p>Address: {date.foodPlace.Address}</p>
            <p>Notes: {date.foodPlace.Notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
