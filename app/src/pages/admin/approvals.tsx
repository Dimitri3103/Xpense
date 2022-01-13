import { makeStyles } from "@material-ui/core";
import React, { ChangeEvent, useState } from "react";
import Layout from "../../layouts/AdminLayout";
import ListView from "../../components/approvals/listView";
import GridView from "../../components/approvals/gridView";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../utils/getServerSideProps";
import { HeaderApprovals } from "../../components/headers/headerApprovals";
import { TabPanel } from "../../components/utils";
import { getUserOrganization } from "../../services-back/orgService";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const useStyles = makeStyles((theme) => ({
  datePicker: { width: "100%" },
  inputDatePicker: {
    color: "#07114B",
    font: "normal normal normal 0.9vw Open Sans",
  },
  inputSort: { width: "100%", font: "normal normal normal 0.5vw Open Sans" },
}));

const myApprovals = () => {
  const classes = useStyles();

  const [org, setOrg] = React.useState(null);

  if (org == null) {
    getUserOrganization().then((organization) => setOrg(organization));
  }

  const [value, setValue] = useState(1);
  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {org ? (
        <div>
          <HeaderApprovals {...{ org, handleChange, value, classes }} />
          <div style={{ marginTop: 5 }}>
            <TabPanel value={value} index={0}>
              <GridView {...org} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ListView {...org} />
            </TabPanel>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
myApprovals.layout = Layout;
// @ts-ignore

export default myApprovals;
