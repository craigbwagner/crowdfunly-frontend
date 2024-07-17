import * as authService from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignForms.css";

const SigninForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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

  const { username, password } = formData;

  const isFormInvalid = () => {
    return username === "" || password === "";
  };

  return (
    <main>
      <form className="signForms" autoComplete="off" onSubmit={handleSubmit}>
        <fieldset
          className="signForms-fieldset"
          aria-labelledby="signForms-fieldset"
        >
          <legend className="signForms-legend">Sign In</legend>

          <div className="signFormsInputDiv">
            <label htmlFor="email">Username:</label>
            <input
              className="signForms-inputs"
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="signFormsInputDiv">
            <label htmlFor="password">Password:</label>
            <input
              className="signForms-inputs"
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div className="signFormsButtonDiv">
            <button className="signForms-buttons" disabled={isFormInvalid()}>
              Sign In
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};

export default SigninForm;
