import { Link, useNavigate } from "react-router-dom";
import ContributionsList from "../ContributionsList/ContributionsList";
import { useEffect, useState } from "react";

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
    <div>
      <h1>{user.username}'s Profile</h1>

      <h2>Created Campaigns</h2>
      {userCampaigns.length > 0 ? (
        <ul>
          {userCampaigns.map((campaign) => (
            <li key={campaign._id}>
              <Link to={`/campaigns/${campaign._id}`}>{campaign.title}</Link>
              <p>{campaign.description}</p>
              <p>Goal: ${campaign.goalAmount}</p>
              <p>Raised: ${campaign.amountRaised}</p>
              <p>End Date: {new Date(campaign.endDate).toLocaleDateString()}</p>
              <p>Type: {campaign.campaignType}</p>
              <button onClick={() => handleEdit(campaign._id)}>Edit</button>
              <button onClick={() => handleDelete(campaign._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No campaigns created yet.</p>
      )}

      <h2>Contributions</h2>
      {userContributions.length > 0 ? (
        <ul>
          <ContributionsList
            user={user}
            contributions={contributions}
            userContributions={userContributions}
          ></ContributionsList>
        </ul>
      ) : (
        <p>No contributions made yet.</p>
      )}
    </div>
  );
};

export default Profile;
