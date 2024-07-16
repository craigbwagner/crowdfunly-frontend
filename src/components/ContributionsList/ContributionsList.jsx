
import { Link } from 'react-router-dom';

const ContributionsList = ({ contributions, campaigns }) => {
  return (
    <ul>
      {contributions.length === 0 ? (
        <p>No contributions found.</p>
      ) : (
        contributions.map((contribution) => (
          <li key={contribution._id}>
            <h2>
              <Link to={`/campaigns/${contribution.campaignId}`}>
                {campaigns.find(campaign => campaign._id === contribution.campaignId)?.title}
              </Link>
            </h2>
            <p>Contributor: {contribution.contributedBy.username}</p>
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
            <p>Comment: {contribution.comment}</p>
          </li>
        ))
      )}
    </ul>
  );
};

export default ContributionsList;