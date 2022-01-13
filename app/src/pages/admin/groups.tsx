import { GetServerSidePropsContext } from "next";
import React from "react";
import ListGroups from "../../components/group/listGroups";
import Layout from "../../layouts/AdminLayout";
import { getUserOrganization } from "../../services-back/orgService";
import serverRuntimeConfig from "../../utils/getServerSideProps";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const groups = () => {
  const [org, setOrg] = React.useState(null);

  if (org == null) {
    getUserOrganization().then((organization) => setOrg(organization));
  }

  return (
    <>
      {org ? (
        <ListGroups {...org} />
      ) : (
        <div></div>
      )}
    </>
  );
};

groups.layout = Layout;

export default groups;
