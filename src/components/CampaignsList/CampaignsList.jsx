import React from 'react';
import { Link } from "react-router-dom";

function CampaignsList(props) {
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredCampaigns = selectedType
    ? props.campaigns.filter(
        (campaign) => campaign.campaignType === selectedType
      )
    : props.campaigns;

  return (
    <div className="campaigns-container">
      <h1>Available Campaigns</h1>
      <label htmlFor="campaignFilterType">Filter By Campaign Type: </label>
      <select
        name="campaignType"
        id="campaignFilterType"
        value={selectedType}
        onChange={handleTypeChange}
      >
        <option value="">All</option>
        <option value="Charity">Charity</option>
        <option value="Education">Education</option>
        <option value="Creative">Creative</option>
        <option value="Sports">Sports</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Business">Business</option>
        <option value="Events">Events</option>
        <option value="Environment">Environment</option>
      </select>

      <ul>
        {props.campaigns.length === 0 ? (
          <p>No campaigns found.</p>
        ) : filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((campaign) => (
            <li key={campaign._id}>
              <h2>
                <Link to={`/campaigns/${campaign._id}`}>{campaign.title}</Link>
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
            </li>
          ))
        ) : (
          <p>No {selectedType} campaigns found.</p>
        )}
      </ul>
    </div>
  );
}

export default CampaignsList;