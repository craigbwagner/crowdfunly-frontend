import { Link } from "react-router-dom";

const ContributionsList = ({
  contributions,
  parentComponent,
  userContributions,
}) => {
  let userContributionsJSX = [];
  if (userContributions) {
    userContributionsJSX = userContributions.map((contribution) => (
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
    ));
  }
  const contributionsJSX = contributions.map((contribution) => (
    <li key={contribution._id}>
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
    </li>
  ));
  return (
    <ul>
      {contributions.length === 0 ? (
        <p>No contributions found.</p>
      ) : parentComponent === "profilePage" ? (
        userContributionsJSX
      ) : (
        contributionsJSX
      )}
    </ul>
  );
};

export default ContributionsList;
