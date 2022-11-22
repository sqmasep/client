import { Rating } from "@mui/material";
import React from "react";
import { useUser } from "../../contexts/UserContext";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const OwnProfile: React.FC = () => {
  const { user } = useUser();

  return (
    <>
      own profile
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Rating
        disabled
        icon={<Favorite />}
        emptyIcon={<FavoriteBorder />}
        value={user?.status.health / 100}
        max={10}
        precision={0.1}
      />
    </>
  );
};

export default OwnProfile;
