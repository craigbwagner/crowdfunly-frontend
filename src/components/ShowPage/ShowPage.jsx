import { useParams } from "react-router-dom";
import * as campaignService from "../../services/campaignService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function ShowPage({ user, handleDeleteCampaign }) {
  const [campaign, setCampaign] = useState(null);
  const { campaignId } = useParams();

  useEffect(() => {
    const fetchCampaign = async () => {
      const campaignData = await campaignService.show(campaignId);
      setCampaign(campaignData);
    };
    fetchCampaign();
  }, [campaignId]);

  const confirmDelete = async () => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      await handleDeleteCampaign(campaignId);
    }
  };

  if (!campaign) return <main>Loading...</main>;
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
      {user
        ? campaign.createdBy._id === user._id && (
            <>
              <Link to={`/campaigns/${campaign._id}/edit`}>Edit</Link>
              <button onClick={confirmDelete} type="button">
                Delete
              </button>
            </>
          )
        : null}
      {user ? (
        <Link to={`/contributions/${campaign._id}`}>Contribute to this Campaign</Link>
      ) : (
        <h3>Create an account to contribute</h3>
      )}
      <p>{campaign.description}</p>
      <h2>Contributions</h2>
    </>
  );
}

export default ShowPage;
