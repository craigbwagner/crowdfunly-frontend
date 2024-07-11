import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const NavBar = ({ user, handleSignout }) => {
  const { userId } = useParams();
  return (
    <>
      {user ? (
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/campaigns">Browse Campaigns</Link>
            </li>
            <li>
              <Link to="/campaigns/create-campaign">Create Campaign</Link>
            </li>
            <li>
              <Link to={`/profile/${user._id}`}>Profile</Link>
            </li>
            <li>
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default NavBar;
