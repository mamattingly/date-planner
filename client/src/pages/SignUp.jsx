import "../styles/SignUpStyles.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { SIGN_IN } from "../utils/redux/actions";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.LOGGED_IN);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
        confirmPassword,
      });

      const token = response.data.token;
      if (token) {
        localStorage.removeItem("id_token");
        dispatch({ type: SIGN_IN, payload: token });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(error.response.data.message);
    }
  };

  return (
    <div className="flex-container">
      <div className="card container">
        <h2>Sign Up</h2>
        {errorMsg && <div className="error">{errorMsg}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="input-container">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <button type="submit">Sign Up</button>
          <div>
            <Link to="/signin">Already have an account? Sign in here!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
