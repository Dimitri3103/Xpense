import * as React from "react";
import Layout from "../../layouts/SupervisorLayout";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../utils/getServerSideProps";
import { TitleHead } from "../../styles/typography";
import ProfileUser from "../../components/profile/index";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const Profile = () => {
  return (
    <>
      <TitleHead>Profil</TitleHead>
      <br />
      <ProfileUser />
    </>
  );
};

Profile.layout = Layout;
// @ts-ignore

export default Profile;
