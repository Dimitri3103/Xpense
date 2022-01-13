import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUsersByOrg } from "../../services-back/admin/userService";
import { getSheets } from "../../services-back/sheetService";
import { List, AutoSizer, CellMeasurerCache } from "react-virtualized";
import { Scrollbars } from "react-custom-scrollbars";

const useStyles = makeStyles((theme) => ({
  nameUser: {
    font: "normal normal 600 1vw Open Sans",
    color: "#2F45C5",
    marginLeft: theme.spacing(0.5),
  },
  date: {
    font: "normal normal 600 1vw Open Sans",
    color: "#07114BC2",
    marginLeft: theme.spacing(0.5),
  },
}));

const PendingExpenses = (org) => {
  const classes = useStyles();

  const [sheets, setSheets] = useState([]);
  function loadSheets() {
    getSheets(org.id).then((res) =>
      setSheets(
        res.filter((sheet) => {
          return sheet.status === "pending";
        })
      )
    );
  }

  const [users, setUsers] = useState([]);
  function loadUsers() {
    getUsersByOrg(org.id).then((res) => setUsers(res));
  }

  useEffect(() => {
    loadSheets();
    loadUsers();
  }, []);

  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: "100%",
    })
  );

  const renderRow = ({ index, key }) => {
    const sheet = sheets[index];
    return (
      <div key={key}>
        <Grid container key={sheet.id}>
          <Grid item xs={6}>
            <div className={classes.nameUser}>
              {users.map((user) =>
                user.id === sheet.userId ? (
                  <div key={user.id}>{user.displayName}</div>
                ) : null
              )}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className={classes.date}>{sheet.submittedOn}</div>
          </Grid>
        </Grid>
      </div>
    );
  };

  const listStyle = { overflowX: false, overflowY: false };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AutoSizer>
        {({ width, height }) => (
          <Scrollbars style={{ height, width }} autoHide>
            <List
              width={width}
              height={height}
              rowHeight={cache.current.rowHeight}
              deferredMeasurementCache={cache.current}
              rowCount={sheets.length}
              rowRenderer={renderRow}
              style={listStyle}
            />
          </Scrollbars>
        )}
      </AutoSizer>
    </div>
  );
};

export default PendingExpenses;
