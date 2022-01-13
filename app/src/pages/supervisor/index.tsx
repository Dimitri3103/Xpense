import React, { ChangeEvent, useState } from "react";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../utils/getServerSideProps";
import { getUserOrganization } from "../../services-back/orgService";
import { getProfile } from "../../services-back/profileService";
import SupervisorLayout from "../../layouts/SupervisorLayout";
import Sheets from "../../components/sheets";
import myExpenses from "./expenses";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const ListExpenses = () => {
  const [org, setOrg] = React.useState(null);
  if (org == null) {
    getUserOrganization().then((organization) => setOrg(organization));
  }

  const [profile, setProfile] = useState(null);
  if (!profile) {
    getProfile().then((user) => setProfile(user));
  }

  const [value, setValue] = useState(1);
  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <SupervisorLayout>
      {profile ? (
        org ? (
          <Sheets {...{ value, handleChange, org, profile }} />
        ) : (
          <div> </div>
        )
      ) : null}
    </SupervisorLayout>
  );
};

ListExpenses.layout = myExpenses;

export default ListExpenses;
