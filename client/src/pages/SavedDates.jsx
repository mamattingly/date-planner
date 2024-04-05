import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UPDATE_TOKEN, SAVED_DATE } from "../utils/redux/actions";

const SavedDates = () => {
    const [savedDates, setSavedDates] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSavedDates = async () => {
            try {
                const response = await axios.get("/api/users/saved-dates", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "id_token"
                        )}`,
                    },
                });

                dispatch({
                    type: UPDATE_TOKEN,
                    payload: response.headers.authorization,
                });
                setSavedDates(response.data.savedDates);
            } catch (error) {
                console.error("Error retrieving saved dates:", error);
            }
        };
        fetchSavedDates();
    }, []);

    const updatedDateRedux = (date) => {
        dispatch({
            type: SAVED_DATE,
            payload: date,
        });
    };

    return (
        <div className="container">
            {savedDates.length > 0 ? (
                <>
                    <h2>Saved Dates</h2>
                    <p>You have {savedDates.length} saved date.</p>
                    <ul className="card">
                        {savedDates.map((date) => (
                            <Link
                                to={{
                                    pathname: "/saved-date",
                                    state: {
                                        foodPlace: date.foodPlace,
                                        activity: date.activity,
                                    },
                                }}
                                key={date._id}
                                onClick={() => updatedDateRedux(date)}
                                className="saved-date-link"
                            >
                                <h3>{date.name}</h3>
                            </Link>
                        ))}
                    </ul>
                </>
            ) : (
                <p className="no-saved-dates-message">No saved dates found.</p>
            )}
        </div>
    );
};

export default SavedDates;
