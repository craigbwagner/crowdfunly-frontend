import { Link } from "react-router-dom";


function CampaignsList(props) {
  console.log(props.campaigns);
  return (
    <div>
      <h1>Available Campaigns</h1>
      <ul>
        {props.campaigns.map((campaign) => (
          <li key={campaign._id}>
            <h2>
              <Link key={campaign._id} to={`/campaigns/${campaign._id}`}>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CampaignsList;
