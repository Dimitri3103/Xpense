import * as React from "react";
import Layout from "../../layouts/SupervisorLayout";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../utils/getServerSideProps";
import { TitleHead } from "../../styles/typography";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const Report = () => {
  return <TitleHead>Report</TitleHead>;
};

Report.layout = Layout;
// @ts-ignore

export default Report;
