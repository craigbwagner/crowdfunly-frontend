import { Link } from "react-router-dom";

const ContributionsList = ({ contributions, userContributions, campaignId }) => {
  let contributionsJSX = [];
  if (contributions) {
    const campaignContributions = contributions.filter((contribution) => contribution?.campaignId?._id === campaignId);
    contributionsJSX = campaignContributions.map((contribution) => (
      <div key={contribution._id} className="contribution-item">
        <h3>Contributor: {contribution?.contributedBy?.username}</h3>
        <p>Amount: ${contribution?.amount}</p>
        <p>
          Date:{" "}
          {new Date(contribution?.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          })}
        </p>
      </div>
    ));
  } else if (userContributions) {
    contributionsJSX = userContributions.map((contribution) => (
      <div key={contribution._id} className="contribution-item">
        <p>
          <Link to={`/campaigns/${contribution?.campaignId?._id}`}>{contribution.campaignId.title}</Link>
        </p>
        <p>
          {contribution.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}{" "}
          •{" "}
          {new Date(contribution.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          })}
        </p>
      </div>
    ));
  } else {
    <p>Loading...</p>;
  }

  return (
    <div className="contributions-list">
      {contributionsJSX.length === 0 || contributionsJSX === null ? <p>No contributions yet.</p> : contributionsJSX}
    </div>
  );
};

export default ContributionsList;
