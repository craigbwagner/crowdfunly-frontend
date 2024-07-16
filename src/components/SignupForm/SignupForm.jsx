import * as authService from "../../services/authService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, email, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && email && password && password === passwordConf);
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <fieldset aria-labelledby="signForm-legend">
          <legend className="signForm-legend">Sign Up</legend>

          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="name" value={username} name="username" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" value={email} name="email" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} name="password" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="confirm">Confirm Password:</label>
            <input type="password" id="confirm" value={passwordConf} name="passwordConf" onChange={handleChange} />
          </div>
          <div>
            <button disabled={isFormInvalid()}>Sign Up</button>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        </fieldset>
      </form>
    </main>
  );
};

export default SignupForm;
