import * as React from "react";
import Layout from "../../layouts/AdminLayout";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../utils/getServerSideProps";
import { TitleHead } from "../../styles/typography";
import ChartRapport from "../../components/report/";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const Report = () => {
  return (
    <>
      <TitleHead>Rapport</TitleHead>
      <ChartRapport />
    </>
  );
};

Report.layout = Layout;
// @ts-ignore

export default Report;
