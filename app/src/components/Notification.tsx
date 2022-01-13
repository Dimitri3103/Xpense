import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export const AlertBar = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={props.open}
      autoHideDuration={1000}
      onClose={props.onClose}
    >
      <Alert
        variant="filled"
        severity={props.alertMeta.severity}
        onClose={props.onClose}
      >
        {props.alertMeta.message}
      </Alert>
    </Snackbar>
  );
};
