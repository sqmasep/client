import { LinearProgress, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { useUser } from "../../contexts/UserContext";
import {
  AccountBalance,
  AttachMoney,
  Favorite,
  FavoriteBorder,
  Psychology,
  PsychologyOutlined,
} from "@mui/icons-material";

const OwnProfile: React.FC = () => {
  const { user } = useUser();

  return (
    <>
      own profile
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Stack alignItems='center'>
        <Rating
          disabled
          icon={<Favorite />}
          emptyIcon={<FavoriteBorder />}
          value={user?.status.health / 10}
          max={10}
          precision={0.1}
        />
        <Typography>Health {user?.status.health}</Typography>
      </Stack>
      <Stack>
        <LinearProgress
          sx={{ flexGrow: 1 }}
          variant='determinate'
          value={user?.status.xp}
        />
        <Typography>XP {user?.status.xp}</Typography>
      </Stack>
      <Stack>
        <Rating
          disabled
          icon={<Psychology />}
          emptyIcon={<PsychologyOutlined />}
          value={user?.status.retardation / 10}
          max={10}
          precision={0.1}
        />
        <Typography>Retardation {user?.status.retardation}</Typography>
      </Stack>
      <Stack direction='column'>
        <Stack>
          <AttachMoney />
          <Typography>{user?.money.cash}</Typography>
        </Stack>
        <Stack>
          <AccountBalance />
          <Typography>{user?.money.bank}</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default OwnProfile;
