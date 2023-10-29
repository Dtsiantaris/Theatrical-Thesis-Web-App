// pages/user/profile.tsx
import React from "react";
import { useUserContext } from "../../src/contexts/UserContext";
import { Typography } from "@material-ui/core";

const UserProfile = () => {
  const { user } = useUserContext();
  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div>
      <Typography variant="h1">{user.email}</Typography>
      {/* Render other user properties here */}
    </div>
  );
};

export default UserProfile;
