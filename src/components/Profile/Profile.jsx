import { Link } from "react-router-dom";

const Profile = ({ user, campaigns }) => {
  const userCampaigns = campaigns.filter((campaign) => campaign.createdBy._id === user._id);

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
              <button onClick={() => onEditCampaign(campaign._id)}>Edit</button>
              <button onClick={() => onDeleteCampaign(campaign._id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No campaigns created yet.</p>
      )}
    </div>
  );
};

export default Profile;
