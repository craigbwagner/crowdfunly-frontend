import { useParams, useNavigate } from "react-router-dom";
import * as campaignService from "../../services/campaignService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ShowPage({user, handleDeleteCampaign}) {
  const [campaign, setCampaign] = useState(null);
  const { campaignId } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCampaign = async () => {
      const campaignData = await campaignService.show(campaignId);
      setCampaign(campaignData);
      console.log("campaignData", campaignData);
    };
    fetchCampaign();
  }, [campaignId]);

  if (!campaign) return <main>Loading...</main>;
  console.log("userData", user);
  return (
    <>
      <h1>{campaign.title}</h1>
      <h2>{campaign.campaignType}</h2>
      <h3>Goal: {campaign.goalAmount}</h3>
      <h3>Amount Raised: {campaign.amountRaised}</h3>
      <h3>Created by: {campaign.createdBy.username}</h3>
      <h3>
        Created:{" "}
        {new Date(campaign.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })}
      </h3>
      <h3>
        End Date:{" "}
        {new Date(campaign.endDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          timeZone: "UTC",
        })}
      </h3>

      {/* need to create condition to render if youre the creator */}
      {user ? (campaign.createdBy._id === user._id && (
        <>
          <Link to={`/campaigns/${campaign._id}/edit`}>Edit</Link>
          <button onClick={() => handleDeleteCampaign(campaignId)}>
            Delete
          </button>
        </>
      )) : null}

      <p>{campaign.description}</p>
      <h2>Contributions</h2>
    </>
  );
}

export default ShowPage;
