import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import * as authService from "../src/services/authService";
import CampaignsList from "./components/CampaignsList/CampaignsList";
import CampaignForm from "./components/CampaignForm/CampaignForm";
import Profile from "./components/Profile/Profile";
import ShowPage from "./components/ShowPage/ShowPage";
import * as campaignService from "../src/services/campaignService";
import "./App.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./components/PaymentForm/PaymentForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY
);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCampaigns = async () => {
      const campaignsData = await campaignService.index();
      setCampaigns(campaignsData);
    };
    fetchAllCampaigns();
  }, []);

  const handleAddCampaign = async (campaignFormData) => {
    const newCampaign = await campaignService.create(campaignFormData);
    setCampaigns([newCampaign, ...campaigns]);
    navigate(`/campaigns/${newCampaign._id}`);
  };

  const handleDeleteCampaign = async (campaignId) => {
    const deleteCampaign = await campaignService.deleteCampaign(campaignId);
    setCampaigns(
      campaigns.filter((campaign) => campaign._id !== deleteCampaign._id)
    );
    navigate("/campaigns");
  };

  const handleUpdateCampaign = async (campaignId, campaignFormData) => {
    const updateCampaign = await campaignService.update(
      campaignId,
      campaignFormData
    );
    setCampaigns(
      campaigns.map((campaign) =>
        campaignId === campaign._id ? updateCampaign : campaign
      )
    );
    navigate(`/campaigns/${campaignId}`);
  };

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <Elements stripe={stripePromise}>
      <Navbar user={user} handleSignout={handleSignout} />
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<CampaignsList campaigns={campaigns} />} />
            <Route
              path="/profile/:userId"
              element={
                <Profile
                  user={user}
                  campaigns={campaigns}
                  onEditCampaign={handleUpdateCampaign}
                  onDeleteCampaign={handleDeleteCampaign}
                />
              }
            />
            <Route
              path="/campaigns"
              element={<CampaignsList campaigns={campaigns} />}
            />
            <Route
              path="/campaigns/new"
              element={<CampaignForm handleAddCampaign={handleAddCampaign} />}
            />
            <Route
              path="/campaigns/:campaignId/edit"
              element={
                <CampaignForm handleUpdateCampaign={handleUpdateCampaign} />
              }
            />
            <Route
              path="/contributions/:campaignId"
              element={<ContributionForm />}
            />
            <Route path="/profile/:userId/payment" element={<PaymentForm />} />
          </>
        ) : (
          <>
            <Route path="/signup" element={<SignupForm setUser={setUser} />} />
            <Route path="/signin" element={<SigninForm setUser={setUser} />} />
          </>
        )}
        <Route path="/" element={<Landing />} />
        <Route
          path="/campaigns"
          element={<CampaignsList campaigns={campaigns} />}
        />
        <Route
          path="/campaigns/:campaignId"
          element={
            <ShowPage user={user} handleDeleteCampaign={handleDeleteCampaign} />
          }
        />
      </Routes>
    </Elements>
  );
};

export default App;
