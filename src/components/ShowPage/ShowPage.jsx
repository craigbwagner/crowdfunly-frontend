import { useParams } from "react-router-dom";
import * as campaignService from "../../services/campaignService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ShowPage.css";
import ContributionsList from "../ContributionsList/ContributionsList";

function ShowPage({ user, handleDeleteCampaign, contributions }) {
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
      <div className="showPage">
        <h1>{campaign.title}</h1>
        <p>({campaign.campaignType})</p>
        <h3>
          Created by: <span>{campaign.createdBy.username}</span>
        </h3>
        <div className="showPage-amounts">
          <h3>
            Goal: <span>${campaign.goalAmount}</span>
          </h3>
          <h3>
            Amount Raised: <span>${campaign.amountRaised}</span>
          </h3>
        </div>

        <div className="showPage-dates">
          <h3>
            Created:{" "}
            <span>
              {new Date(campaign.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </span>
          </h3>
          <h3>
            End Date:{" "}
            <span>
              {new Date(campaign.endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </span>
          </h3>
        </div>
        <p>{campaign.description}</p>
        <div className="showPage-buttons">
          {user
            ? campaign.createdBy._id === user._id && (
                <>
                  <button>
                    <Link to={`/campaigns/${campaign._id}/edit`}>Edit</Link>
                  </button>
                  <button onClick={confirmDelete} type="button">
                    Delete
                  </button>
                </>
              )
            : null}
          {user ? (
            <button>
              <Link to={`/contributions/${campaign._id}`}>Contribute</Link>
            </button>
          ) : (
            <h3>Create an account to contribute</h3>
          )}
        </div>
        <h3>Contributions</h3>
            {contributions.length === 0 ? (
              <p>No contributions yet.</p>
            ) : (
              <ContributionsList contributions={contributions} parentComponent={"showPage"} />
            )}
      </div>
    </>
  );
}

export default ShowPage;
