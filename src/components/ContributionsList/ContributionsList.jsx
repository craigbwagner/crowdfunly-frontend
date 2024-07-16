import { Link } from "react-router-dom";

const ContributionsList = ({ contributions }) => {
  console.log(contributions);
  return (
    <ul>
      {contributions.length === 0 ? (
        <p>No contributions found.</p>
      ) : (
        contributions.map((contribution) => (
          <li key={contribution._id}>
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
          </li>
        ))
      )}
    </ul>
  );
};

export default ContributionsList;
