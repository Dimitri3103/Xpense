import * as React from "react";
import Layout from "../../../layouts/AdminLayout";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../../utils/getServerSideProps";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const myExpenses = ({ children }) => {
  return <div>{children}</div>;
};
myExpenses.layout = Layout;
// @ts-ignore

export default myExpenses;
