import { Rating } from "@mui/material";
import React from "react";
import { useUser } from "../../contexts/UserContext";
import { Favorite, FavoriteOutlined } from "@mui/icons-material";

const OwnProfile: React.FC = () => {
  const { user } = useUser();

  return (
    <>
      own profile
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Rating
        disabled
        icon={<Favorite />}
        emptyIcon={<FavoriteOutlined />}
        // {/* @ts-ignore */}
        value={user?.status.health / 2}
        max={10}
        precision={100}
      />
    </>
  );
};

export default OwnProfile;
