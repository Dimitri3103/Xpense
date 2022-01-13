import React from "react";
import { useAuth } from "../../utils/firebase/auth";
import LayoutUser from "../../layouts/UserLayout";
import settingsStyle from "../../styles/components/settingsStyle";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../utils/getServerSideProps";
import { HeaderSettings } from "../../components/headers/headerSettings";
import { SettingsContainer } from "../../components/settings";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const Settings = () => {
  const classes = settingsStyle();
  const { auth } = useAuth();

  const [tab, setTab] = React.useState("Paramètres du compte");
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
      <SettingsContainer
        classes={classes}
        value={value}
        handleChange={handleChange}
        handleChangeName={handleChangeName}
      />
    </div>
  );
};

Settings.layout = LayoutUser;

export default Settings;
