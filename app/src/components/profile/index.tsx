import React, { useState } from "react";
import User from "../../models/user";
import { getProfile } from "../../services-back/profileService";
import { plainToClass } from "class-transformer";
import { Grid } from "@material-ui/core";
import { UserCard } from "./UserCard";
import { UpdateProfileForm } from "./updateProfileForm";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  if (!profile) {
    getProfile().then((user) => {
      const profile = plainToClass(User, user);
      setProfile(profile);
    });
  }
  return (
    <div>
      {profile ? (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <UserCard {...profile} />
          </Grid>
          <Grid item xs={9}>
            <UpdateProfileForm {...profile} />
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Profile;
