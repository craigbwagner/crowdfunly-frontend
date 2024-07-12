import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Landing from "./components/Landing/Landing";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import * as authService from "../src/services/authService";
import CampaignList from "./components/CampaignList";
import CampaignForm from "./components/CampaignForm/CampaignForm";
import Profile from "./components/Profile/Profile";
import * as campaignService from "../src/services/campaignService";

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [campaigns, SetCampaigns] = useState([]);
  const navigate = useNavigate();

  const handleAddCampaign = async (campaignFormData) => {
    const newCampaign = await create(campaignFormData);
    setCampaigns([newCampaign, ...campaigns]);
    navigate("/campaigns");
  };

  const handleDeleteCampaign = async (campaignId) => {
    const deleteCampaign = await deleteCampaign(campaignId);
    SetCampaigns(campaigns.filter((campaign) => campaign._id !== deletedCampaign._id));
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

        <Route path="/campaigns" element={<CampaignList campaigns={campaigns} />} />
        <Route path="/campaigns/create-campaign" element={<CampaignForm handleAddCampaign={handleAddCampaign} />} />
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
    </>
  );
};

export default App;
