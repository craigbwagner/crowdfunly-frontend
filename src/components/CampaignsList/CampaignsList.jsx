import React from 'react';
import { Link } from "react-router-dom";
import './CampaignsList.css';

function CampaignsList({ campaigns }) {
  return (
    <div className="campaigns-container">
      <h1>Available Campaigns</h1>
      <div className="campaigns-grid">
        {campaigns.map(campaign => (
          <div key={campaign._id} className="campaign-card">
            <h2>
              <Link to={`/campaigns/${campaign._id}`}>
                {campaign.title}
              </Link>
            </h2>
            <p>{campaign.description}</p>
            <p>Goal: ${campaign.goalAmount}</p>
            <p>Raised: ${campaign.amountRaised}</p>
            <p>
              End Date:{" "}
              {new Date(campaign.endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </p>
            <p>Type: {campaign.campaignType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CampaignsList;