import { Link, useNavigate } from "react-router-dom";
import ContributionsList from "../ContributionsList/ContributionsList";
import { useEffect, useState } from "react";
import "./Profile.css";

const Profile = ({ user, campaigns, onDeleteCampaign, contributions }) => {
  const navigate = useNavigate();
  const userContributions = contributions.filter(
    (contribution) => contribution.contributedBy._id === user._id,
  );
  const userCampaigns = campaigns.filter(
    (campaign) => campaign.createdBy._id === user._id,
  );

  const handleEdit = (campaignId) => {
    navigate(`/campaigns/${campaignId}/edit`);
  };

  const handleDelete = async (campaignId) => {
    await onDeleteCampaign(campaignId);
    navigate(`/profile/${user._id}`);
  };

  return (
    <div className="profile-page">
    <h1>{user.username}'s Profile</h1>
    <div className="columns">
      <div className="campaigns">
        <h2>My Campaigns</h2>
        {userCampaigns.length > 0 ? (
          <ul>
            {userCampaigns.map((campaign) => (
              <li key={campaign._id}>
               <p><Link to={`/campaigns/${campaign._id}`}>{campaign.title}</Link>  ending on {new Date(campaign.endDate).toLocaleDateString()}</p>
                <p>{campaign.amountRaised.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} has been raised towards your goal of {campaign.goalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}.</p>
            
              </li>
            ))}
          </ul>
        ) : (
          <p>No campaigns created yet.</p>
        )}
      </div>
      <div className="contributions">
        <h2>My Contributions</h2>
        {userContributions.length > 0 ? (
          <ul>
            <ContributionsList
              user={user}
              contributions={contributions}
              userContributions={userContributions}
              parentComponent={"profilePage"}
            ></ContributionsList>
          </ul>
        ) : (
          <p>No contributions made yet.</p>
        )}
      </div>
    </div>
  </div>
  );
};

export default Profile;
