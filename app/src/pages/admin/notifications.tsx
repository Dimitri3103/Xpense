import React, { useState } from "react";
import PageListNotifications from "../../components/notifications/pageList";
import Layout from "../../layouts/AdminLayout";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../utils/getServerSideProps";
import { TitleHead } from "../../styles/typography";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const Notifications = () => {
  const [notificationsToShow, setNotificationsToShow] = useState(5);

  const handleShowMoreNotifications = () => {
    setNotificationsToShow((prevVisibleNotifs) => prevVisibleNotifs + 4);
  };

  return (
    <>
      <TitleHead>Notifications</TitleHead>
      <PageListNotifications
        notifications={notificationsToShow}
        handleShowMoreNotifications={handleShowMoreNotifications}
      />
    </>
  );
};

Notifications.layout = Layout;

export default Notifications;
