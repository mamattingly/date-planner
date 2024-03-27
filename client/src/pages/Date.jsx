import { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DateStyles.css';

function App() {
  const [activity, setActivity] = useState(null);
  const [foodPlace, setFoodPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarSupported, setCalendarSupported] = useState(false);

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

  const openCalendarInvite = () => {
    const { Name, Address } = activity || foodPlace;
    const title = encodeURIComponent(`Date with ${Name}`);
    const location = encodeURIComponent(Address);
    const startTime = new Date(selectedDate).toISOString().replace(/-|:|\.\d+/g, '');
    const endTime = new Date(new Date(selectedDate).getTime() + (1 * 60 * 60 * 1000)).toISOString().replace(/-|:|\.\d+/g, '');
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    if (isIOS || isAndroid) {
      setCalendarSupported(true);
    } else {
      setCalendarSupported(false);
      console.log("Calendar invite not supported on this device.");
      return;
    }

    let url;
    if (isIOS) {
      url = `webcal://?action=add&title=${title}&location=${location}&start=${startTime}&end=${endTime}`;
    } else if (isAndroid) {
      url = `content://com.android.calendar/events?title=${title}&eventLocation=${location}&dtstart=${startTime}&dtend=${endTime}&eventTimezone=UTC`;
    }

    window.open(url, '_blank');
  };

  useEffect(() => {
    fetchNewDate();
  }, []);

  return (
    <div className="container">
      {error && <p className="error">Error: {error}</p>}
      {activity && (
        <div className="card">
          <h3>Activity</h3>
          <h4>{activity.Name}</h4>
          <p>Category: {activity.Category}</p>
          <p>Cost: {activity.Cost}</p>
          <p>Address: <a href="#" className='map-link' onClick={() => openMaps(activity.Address)}>{activity.Address}</a></p>
          <p>Notes: {activity.Notes}</p>
          <button className="button" onClick={() => fetchActivityOrFoodPlace('activity')}>Get Activity</button>
          {calendarSupported && <button className="button" onClick={openCalendarInvite}>Add Activity to Calendar</button>}
        </div>
      )}
      {foodPlace && (
        <div className="card">
          <h3>Food</h3>
          <h4>{foodPlace.Name}</h4>
          <p>Category: {foodPlace.Category}</p>
          <p>Cost: {foodPlace.Cost}</p>
          <p>Address: <a href="#" className='map-link' onClick={() => openMaps(foodPlace.Address)}>{foodPlace.Address}</a></p>
          <p>Notes: {foodPlace.Notes}</p>
          <button className="button" onClick={() => fetchActivityOrFoodPlace('food-place')}>Get Food</button>
          {calendarSupported && <button className="button" onClick={openCalendarInvite}>Add Food Place to Calendar</button>}
        </div>
      )}
      {calendarSupported && (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      )}
    </div>
  );
}

export default App;
