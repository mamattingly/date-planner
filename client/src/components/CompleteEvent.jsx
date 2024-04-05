/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UPDATE_TOKEN } from "../utils/redux/actions";
import axios from "axios";

export default function CompleteEvent({ eventId }) {
    const dispatch = useDispatch();
    const [completed, setCompleted] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [updated, setUpdated] = useState(false);

    const handleUpdate = async () => {
        try {
            const response = await axios.post(
                "/api/users/update-history",
                { eventId: eventId },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "id_token"
                        )}`,
                    },
                }
            );

            dispatch({
                type: UPDATE_TOKEN,
                payload: response.headers.authorization,
            });
            setUpdated(true);
        } catch (error) {
            console.error("Error updating history:", error);
        }
    };

    return (
        <div className="container">
            {updated ? (
                <p>Event completed!</p>
            ) : (
                <>
                    {!confirmation && (
                        <button
                            onClick={() => {
                                setCompleted(!completed);
                                setConfirmation(true);
                            }}
                        >
                            Complete?
                        </button>
                    )}
                    {confirmation && (
                        <div>
                            <p>Do you want to submit?</p>
                            <button onClick={() => handleUpdate()}>Yes</button>
                            <br />
                            <br />
                            <button
                                onClick={() => {
                                    setCompleted(false);
                                    setConfirmation(false);
                                }}
                            >
                                No
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
