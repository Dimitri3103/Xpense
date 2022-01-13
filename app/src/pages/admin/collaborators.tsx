import React, { ChangeEvent } from "react";
import Layout from "../../layouts/AdminLayout";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../utils/getServerSideProps";

import Collaborators from "../../components/collaborators";
import { getUserOrganization } from "../../services-back/orgService";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const myCollaborators = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const [org, setOrg] = React.useState(null);

  if (org == null) {
    getUserOrganization().then((organization) => setOrg(organization));
  }

  return (
    <>
      {org ? (
        <Collaborators value={value} handleChange={handleChange} org={org} />
      ) : (
        <div></div>
      )}
    </>
  );
};
myCollaborators.layout = Layout;
// @ts-ignore

export default myCollaborators;
