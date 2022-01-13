import React, { ChangeEvent, useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../../utils/getServerSideProps";
import myExpenses from ".";
import { getUserOrganization } from "../../../services-back/orgService";
import Sheets from "../../../components/sheets";
import { getProfile } from "../../../services-back/profileService";

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
    <AdminLayout>
      {profile ? (
        org ? (
          <Sheets {...{ value, handleChange, org, profile }} />
        ) : (
          <div> </div>
        )
      ) : null}
    </AdminLayout>
  );
};

ListExpenses.layout = myExpenses;

export default ListExpenses;
