import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_IN } from "../utils/redux/actions";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const loggedIn = useSelector((state) => state.LOGGED_IN);
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, [loggedIn, navigate]);

    const handleSignIn = async () => {
        const user = {
            email,
            password,
        };

        try {
            const response = await axios.post("/api/users/login", user);
            console.log(response.data);
            dispatch({ type: SIGN_IN, payload: response.data.token });
            navigate("/");
        } catch (error) {
            console.error(error);
            setErrorMsg(error.response.data.message);
        }
    };

    return (
        <div className="flex-container">
            <div className="card">
                <h2>Sign In</h2>
                {errorMsg && <div>{errorMsg}</div>}
                <form>
                    <div className="input-container">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-container">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="button" onClick={handleSignIn}>
                        Sign In
                    </button>
                    <div>
                        <Link to="/signup">
                            Don't have an account? Sign up here!
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
