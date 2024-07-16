import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const ContributionsList = ({ user, contributions }) => {
  const navigate = useNavigate();
  const userContributions = contributions.filter((contribution) => contribution.contributedBy._id === user._id);

  const handleViewCampaign = (campaignId) => {
    navigate(`/campaigns/${campaignId}`);
  };

  return (
    <div>
      <h1>{user.username}'s Contributions</h1>

      <h2>Contributions</h2>
      {userContributions.length > 0 ? (
        <ul>
          {userContributions.map((contribution) => (
            <li key={contribution._id}>
              <Link to={`/campaigns/${contribution.campaignId._id}`}>
                {contribution.campaignId.title}
              </Link>
              <p>Amount: ${contribution.amount}</p>
              <p>Date: {new Date(contribution.createdAt).toLocaleDateString()}</p>
              <button onClick={() => handleViewCampaign(contribution.campaignId._id)}>
                View Campaign
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No contributions made yet.</p>
      )}
    </div>
  );
};

export default ContributionsList;