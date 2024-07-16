import * as authService from "../../services/authService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignForms.css";

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);

      props.setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <fieldset aria-labelledby="signForms-legend">
          <legend className="signForms-legend">Sign In</legend>

          <div className="signForms-inputs">
            <label htmlFor="email">Username:</label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="signForms-inputs">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="signForms-buttons">
            <button>Sign In</button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};

export default SigninForm;
