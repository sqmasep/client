import React from "react";
import { useParams } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { username } = useParams();
  return <>other's profile. username: {username}</>;
};

export default UserProfile;
