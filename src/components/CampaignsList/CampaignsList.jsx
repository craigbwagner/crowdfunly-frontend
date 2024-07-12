function CampaignsList(props) {
  return (
    <div>
      <h1>Available Campaigns</h1>
      <ul>
        {props.campaigns.map((campaign) => (
          <li key={campaign._id}>
            <h2>{campaign.title}</h2>
            <p>{campaign.description}</p>
            <p>Goal: ${campaign.goalAmount}</p>
            <p>Raised: ${campaign.amountRaised}</p>
            <p>End Date: {new Date(campaign.endDate).toLocaleDateString()}</p>
            <p>Type: {campaign.campaignType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignsList;
