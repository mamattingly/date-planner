import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { SAVED_DATE } from "../utils/redux/actions";
import { useDispatch } from "react-redux";

function SavedDate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activity, food, _id } = useSelector((state) => state.SAVED_DATE);
  const openMaps = (address) => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    let url;
    if (isIOS) {
      url = `maps://maps.apple.com/?q=${encodeURIComponent(address)}`;
    } else if (isAndroid) {
      url = `geo:0,0?q=${encodeURIComponent(address)}`;
    } else {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        address
      )}`;
    }
    window.open(url, "_blank");
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("id_token");
    const response = await axios.delete(`/api/users/delete-date/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        _id,
      },
    });
    console.log("Date deleted:", response.data);
    dispatch({
      type: SAVED_DATE,
      payload: {},
    });
    navigate("/saved-dates");
  };

  return (
    <div className="container">
      {activity && (
        <div className="card">
          <h3>Activity</h3>
          <h4>{activity.Name}</h4>
          <p>Category: {activity.Category}</p>
          <p>Cost: {activity.Cost}</p>
          <p>
            Address:{" "}
            <a
              href="#"
              className="map-link"
              onClick={() => openMaps(activity.Address)}
            >
              {activity.Address}
            </a>
          </p>
          <p>Notes: {activity.Notes}</p>
        </div>
      )}
      {food && (
        <div className="card">
          <h3>Food</h3>
          <h4>{food.Name}</h4>
          <p>Category: {food.Category}</p>
          <p>Cost: {food.Cost}</p>
          <p>
            Address:{" "}
            <a
              href="#"
              className="map-link"
              onClick={() => openMaps(food.Address)}
            >
              {food.Address}
            </a>
          </p>
          <p>Notes: {food.Notes}</p>
        </div>
      )}
      <button onClick={handleDelete} className="button">
        Delete Date
      </button>
      <Link to="/saved-dates" className="button">
        Back to Saved Dates
      </Link>
    </div>
  );
}

export default SavedDate;
