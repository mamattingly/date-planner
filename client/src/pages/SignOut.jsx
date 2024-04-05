import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SIGN_OUT } from "../utils/redux/actions";

const SignOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignOut = () => {
        dispatch({ type: SIGN_OUT });
        navigate("/");
    };
    return (
        <div className="flex-container">
            <div className="card">
                <h2>Sign Out</h2>
                <div className="input-container">
                    <p>Are you sure you want to sign out?</p>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            </div>
        </div>
    );
};

export default SignOut;
