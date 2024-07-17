import * as authService from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../SigninForm/SignForms.css";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
  });

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
      <form className="signForms" onSubmit={handleSubmit}>
        <fieldset
          className="signForms-fieldset"
          aria-labelledby="signForms-legend"
        >
          <legend className="signForms-legend">Sign Up</legend>

          <div className="signFormsInputDiv">
            <label htmlFor="username">Username:</label>
            <input
              className="signForms-inputs"
              type="text"
              id="name"
              value={username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="signFormsInputDiv">
            <label htmlFor="email">Email Address:</label>
            <input
              className="signForms-inputs"
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="signFormsInputDiv">
            <label htmlFor="password">Password:</label>
            <input
              className="signForms-inputs"
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="signFormsInputDiv">
            <label htmlFor="confirm">Confirm Password:</label>
            <input
              className="signForms-inputs"
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
            />
          </div>
          <div className="signFormsButtonDiv">
            <button className="signForms-buttons" disabled={isFormInvalid()}>
              Sign Up
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};

export default SignupForm;
