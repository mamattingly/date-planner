import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_TOKEN } from "../utils/redux/actions";
import axios from "axios";

const History = () => {
    const dispatch = useDispatch();
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const response = axios.get("/api/users/history", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("id_token")}`,
                },
            });
            dispatch({
                type: UPDATE_TOKEN,
                payload: response.headers.authorization,
            });
            setHistory(response.data.history);
        } catch (error) {
            console.error("Error retrieving history:", error);
        }
    }, []);

    console.log(history);

    return (
        <div className="container">
            {history.length > 0 ? (
                <>
                    <h2>History</h2>
                    <p>You have {history.length} saved date.</p>
                    <ul className="card">
                        {history.map((date) => (
                            <Link
                                to={{
                                    pathname: "/saved-date",
                                    state: {
                                        foodPlace: date.foodPlace,
                                        activity: date.activity,
                                    },
                                }}
                                key={date._id}
                                className="saved-date-link"
                            >
                                <h3>{date.name}</h3>
                            </Link>
                        ))}
                    </ul>
                </>
            ) : (
                <h2>No history found.</h2>
            )}
        </div>
    );
};

export default History;
