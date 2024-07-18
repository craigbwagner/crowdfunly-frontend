import { Link } from "react-router-dom";
import ContributionsList from "../ContributionsList/ContributionsList";
import "./Profile.css";

const Profile = ({ user, campaigns, contributions }) => {
  const userContributions = contributions.filter(
    (contribution) => contribution.contributedBy._id === user._id,
  );
  const userCampaigns = campaigns.filter(
    (campaign) => campaign.createdBy._id === user._id,
  );
  
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  const greeting = getGreeting();


  return (
    <div className="profile-page">
      <div className="greeting">
      <h1>{greeting}, {user.username}!</h1>
      </div>
      <div className="columns">
        <div className="campaigns">
          <h2>My Campaigns</h2>
          {userCampaigns.length > 0 ? (
            <ul>
              {userCampaigns.map((campaign) => (
                <li key={campaign._id}>
                  <p>
                    <Link to={`/campaigns/${campaign._id}`}>
                      {campaign.title}
                    </Link>{" "}
                    ending on {new Date(campaign.endDate).toLocaleDateString()}
                  </p>
                  <p>
                    {campaign.amountRaised.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}{" "}
                    has been raised towards your goal of{" "}
                    {campaign.goalAmount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                    .
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No campaigns created yet.</p>
          )}
        </div>
        <div className="contributions">
          <h2>My Contributions</h2>
          {userContributions.length > 0 ? (
            <ul>
              <ContributionsList
                user={user}
                userContributions={userContributions}
                parentComponent={"profilePage"}
              ></ContributionsList>
            </ul>
          ) : (
            <p>No contributions made yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
