import React from "react";
import {
  createStyles,
  makeStyles,
  SvgIcon,
  SvgIconProps,
} from "@material-ui/core";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const menuIconGridStyle = makeStyles((theme) =>
  createStyles({
    root: {
      cursor: "pointer",
      color: "#9BABC5",
      position: "absolute",
      top: "5%",
      right: "5%",
      [theme.breakpoints.up("sm")]: { height: 20, width: 22, right: "2%" },
      "&:hover": {
        color: "#2F45C5",
        background: "#E2E7FF 0% 0% no-repeat padding-box",
        borderRadius: 8,
      },
    },
    selected: {
      color: "#2F45C5",
      background: "#E2E7FF 0% 0% no-repeat padding-box",
      borderRadius: 8,
      cursor: "pointer",
      position: "absolute",
      top: "5%",
      right: "5%",
      [theme.breakpoints.up("sm")]: { height: 20, width: 22, right: "2%" },
    },
  })
);

const menuIconTabStyle = makeStyles((theme) =>
  createStyles({
    root: {
      cursor: "pointer",
      color: "#9BABC5",
      "&:hover": {
        color: "#2F45C5",
        background: "#E2E7FF 0% 0% no-repeat padding-box",
        borderRadius: "50%",
      },
    },
    selected: {
      cursor: "pointer",
      color: "#2F45C5",
      background: "#E2E7FF 0% 0% no-repeat padding-box",
      borderRadius: 8,
    },
  })
);

export function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

export function GridViewIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <g>
          <path
            d="M5,0H3C2.175,0,1.425,0.337,0.881,0.881S0,2.175,0,3v2c0,0.825,0.337,1.575,0.881,2.119
		C1.425,7.663,2.175,8,3,8h2c0.825,0,1.575-0.337,2.119-0.881C7.663,6.575,8,5.825,8,5V3c0-0.825-0.337-1.575-0.881-2.119
		C6.575,0.337,5.825,0,5,0z"
          />
          <path
            d="M15,0h-2c-0.825,0-1.575,0.337-2.119,0.881C10.337,1.425,10,2.175,10,3v2
		c0,0.825,0.337,1.575,0.881,2.119C11.425,7.663,12.175,8,13,8h2c0.825,0,1.575-0.337,2.119-0.881C17.663,6.575,18,5.825,18,5V3
		c0-0.825-0.337-1.575-0.881-2.119C16.575,0.337,15.825,0,15,0z"
          />
          <path
            d="M5,10H3c-0.825,0-1.575,0.337-2.119,0.881C0.337,11.425,0,12.175,0,13v2
		c0,0.825,0.337,1.575,0.881,2.119C1.425,17.663,2.175,18,3,18h2c0.825,0,1.575-0.337,2.119-0.881C7.663,16.575,8,15.825,8,15v-2
		c0-0.825-0.337-1.575-0.881-2.119C6.575,10.337,5.825,10,5,10z"
          />
          <path
            d="M15,10h-2c-0.825,0-1.575,0.337-2.119,0.881C10.337,11.425,10,12.175,10,13v2
		c0,0.825,0.337,1.575,0.881,2.119C11.425,17.663,12.175,18,13,18h2c0.825,0,1.575-0.337,2.119-0.881C17.663,16.575,18,15.825,18,15
		v-2c0-0.825-0.337-1.575-0.881-2.119C16.575,10.337,15.825,10,15,10z"
          />
        </g>
      </svg>
    </SvgIcon>
  );
}

export function MenuIconGrid(props: SvgIconProps) {
  const classes = menuIconGridStyle();
  const [state, setState] = useState({ clicked: false });

  function changeColor() {
    setState({ clicked: true });
  }

  let btn_class = state.clicked === false ? classes.root : classes.selected;

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setState({ clicked: false });
      }}
    >
      <div className={btn_class} onClick={changeColor}>
        <SvgIcon {...props}>
          <svg>
            <path d="M10 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          </svg>
        </SvgIcon>
      </div>
    </OutsideClickHandler>
  );
}

export function MenuIconTab(props: SvgIconProps) {
  const classes = menuIconTabStyle();
  const [state, setState] = useState({ clicked: false });

  function changeColor() {
    setState({ clicked: true });
  }

  let btn_class = state.clicked === false ? classes.root : classes.selected;

  return (
    <div style={{ marginLeft: "auto" }}>
      <OutsideClickHandler
        onOutsideClick={() => {
          setState({ clicked: false });
        }}
      >
        <div className={btn_class} onClick={changeColor}>
          <SvgIcon {...props}>
            <svg>
              <path d="M10 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>
          </SvgIcon>
        </div>
      </OutsideClickHandler>
    </div>
  );
}

export function TaxIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 24 24"
      >
        <path d="M7.75781,10.75781a3,3,0,1,0-3-3A3.00328,3.00328,0,0,0,7.75781,10.75781Zm0-4a1,1,0,1,1-1,1A1.00067,1.00067,0,0,1,7.75781,6.75781Zm8.48438,6.48438a3,3,0,1,0,3,3A3.00328,3.00328,0,0,0,16.24219,13.24219Zm0,4a1,1,0,1,1,1-1A1.00067,1.00067,0,0,1,16.24219,17.24219ZM19.707,4.293a.99962.99962,0,0,0-1.41406,0l-14,14A.99989.99989,0,1,0,5.707,19.707l14-14A.99962.99962,0,0,0,19.707,4.293Z" />
      </svg>
    </SvgIcon>
  );
}
