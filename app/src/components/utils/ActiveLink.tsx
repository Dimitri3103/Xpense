import { Link } from "@material-ui/core";
import { withRouter } from "next/router";
import React from "react";

const ActiveLink = ({ router, href, children }) => {
  const handleClick = (event) => {
    event.preventDefault();
    router.push(href);
  };

  const isCurrentPath = router.pathname === href || router.asPath === href;

  (function prefetchPages() {
    if (typeof window !== "undefined") {
      router.prefetch(router.pathname);
    }
  })();

  return (
    <div
      style={{
        borderRight: isCurrentPath ? "3px solid #FB2B76" : "0px solid #FB2B76",
        height: "3vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      <Link
        href={href}
        onClick={handleClick}
        style={{
          textDecoration: "none",
          font: isCurrentPath
            ? "normal normal 600 1vw Open Sans"
            : "normal normal 600 1vw Open Sans",
          color: isCurrentPath ? "#2F45C5" : "#9BABC5",
          width: "100%",
        }}
      >
        {children}
      </Link>
    </div>
  );
};

export default withRouter(ActiveLink);
