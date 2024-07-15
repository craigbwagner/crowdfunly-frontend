import { Link } from "react-router-dom";
import './Navbar.css';

const NavBar = ({ user, handleSignout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/campaigns">Browse Campaigns</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/campaigns/new">Create Campaign</Link>
            </li>
            <li>
              <Link to={`/profile/${user._id}`}>Profile</Link>
            </li>
            <li>
              <Link to="" onClick={handleSignout}>Sign Out</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
