import React from "react";
import { useAuth } from "../../utils/firebase/auth";
import LayoutAdmin from "../../layouts/AdminLayout";
import settingsStyle from "../../styles/components/settingsStyle";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../utils/getServerSideProps";
import { SettingsContainerAdmin } from "../../components/settings/admin";
import { HeaderSettings } from "../../components/headers/headerSettings";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const Settings = () => {
  const classes = settingsStyle();
  const { auth } = useAuth();

  const [tab, setTab] = React.useState("Paramètres de l'organisation");
  const handleChangeName = (txt) => {
    handleClick(txt);
  };
  function handleClick(ms) {
    setTab(ms);
  }
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <HeaderSettings classes={classes} auth={auth} tab={tab} />
      <SettingsContainerAdmin
        classes={classes}
        value={value}
        handleChange={handleChange}
        handleChangeName={handleChangeName}
      />
    </div>
  );
};

Settings.layout = LayoutAdmin;

export default Settings;
