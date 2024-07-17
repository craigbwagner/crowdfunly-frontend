import { Link } from "react-router-dom";

const ContributionsList = ({
  contributions,
  userContributions,
  campaignId,
}) => {
  let contributionsJSX = [];
  if (campaignId) {
    const campaignContributions = contributions.filter(
      (contribution) => contribution.campaignId._id === campaignId,
    );
    contributionsJSX = campaignContributions.map((contribution) => (
      <div key={contribution._id} className="contribution-item">
        <h3>Contributor: {contribution.contributedBy.username}</h3>
        <p>Amount: ${contribution.amount}</p>
        <p>
          Date:{" "}
          {new Date(contribution.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          })}
        </p>
      </div>
    ));
  }
  if (userContributions) {
    contributionsJSX = userContributions.map((contribution) => (
      <div key={contribution._id} className="contribution-item">
        <h3>
          Campaign:&nbsp;
          <Link to={`/campaigns/${contribution.campaignId._id}`}>
            {contribution.campaignId.title}
          </Link>
        </h3>
        <p>Amount: ${contribution.amount}</p>
        <p>
          Date:{" "}
          {new Date(contribution.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
          })}
        </p>
      </div>
    ));
  }

  return (
    <div className="contributions-list">
      {contributionsJSX.length === 0 ? (
        <p>No contributions yet.</p>
      ) : (
        contributionsJSX
      )}
    </div>
  );
};

export default ContributionsList;
