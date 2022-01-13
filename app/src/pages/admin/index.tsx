import React from "react";
import Layout from "../../layouts/AdminLayout";
import InviteTeamMembers from "../../components/members/inviteTeamMembers";
import Collaborators from "../../components/dashboard/collaborators";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../utils/getServerSideProps";
import { getUserOrganization } from "../../services-back/orgService";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const dashboardAdmin = () => {
  const [org, setOrg] = React.useState(null);

  if (org == null) {
    getUserOrganization().then((organization) => setOrg(organization));
  }

  return <>{org ? <Collaborators {...org} /> : <InviteTeamMembers />}</>;
};

dashboardAdmin.layout = Layout;
export default dashboardAdmin;
