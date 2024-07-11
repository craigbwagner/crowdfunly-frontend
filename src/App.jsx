import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import * as authService from "../src/services/authService";
import CampaignForm from "./components/CampaignForm/CampaignForm";

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const navigate = useNavigate();

  const handleAddCampaign = async (campaignFormData) => {
    // need to build campaign service functions and call upon service here
    navigate("/campaigns");
  };

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <Navbar user={user} handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/profile/:userId" element={<Profile user={user} />} />
          </>
        ) : (
          <Route path="/" element={<Landing />} />
        )}

        <Route path="/campaigns/create-campaign" element={<CampaignForm handleAddCampaign={handleAddCampaign}/>} />
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
    </>
  );
};

export default App;
