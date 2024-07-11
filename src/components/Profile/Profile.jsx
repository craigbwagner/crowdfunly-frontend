function Profile({ user }) {
  return (
    <>
      <h1>{user.username}'s Profile</h1>
      <h3>Joined:</h3>
      <h2>Campaigns</h2>
      <h2>Contributions</h2>
    </>
  );
}

export default Profile;
