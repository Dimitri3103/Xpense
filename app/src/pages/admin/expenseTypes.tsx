import * as React from "react";
import Layout from "../../layouts/AdminLayout";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../utils/getServerSideProps";
import { getUserOrganization } from "../../services-back/orgService";
import ExpenseTypes from "../../components/expenseTypes";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const expenseTypes = () => {
  const [org, setOrg] = React.useState(null);

  if (org == null) {
    getUserOrganization().then((organization) => setOrg(organization));
  }

  const [value, setValue] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {org ? <ExpenseTypes {...{ value, handleChange, org }} /> : <div> </div>}
    </>
  );
};

expenseTypes.layout = Layout;
// @ts-ignore

export default expenseTypes;
