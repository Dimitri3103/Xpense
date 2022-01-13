import React from "react";
import { Dialog, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import formDetailsExpense from "../../styles/components/formDetailsExpense";
import { CommonDialogContent } from "../../styles/dialogs";

export const ReceiptDialog = ({
  isOpen,
  handleClose,
  receipt,
  rowSelected,
}) => {
  const classes = formDetailsExpense();

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          style: {
            boxShadow: "0px 3px 23px #00000033",
            borderRadius: 17,
            width: "60%",
          },
        }}
      >
        <CommonDialogContent dividers>
          <div>
            {rowSelected
              ? rowSelected.attachments.map((attachment) => (
                  <div key={attachment.name}>
                    <img
                      src={require(`../../../../api/public/files/${attachment.name}`)}
                      alt=""
                      className={classes.imgReceipt}
                    />
                  </div>
                ))
              : null}

            <IconButton
              className={classes.avatarClose}
              size="small"
              onClick={handleClose}
            >
              <i className="uil uil-times" style={{ fontSize: "1.2vw" }} />
            </IconButton>
          </div>
        </CommonDialogContent>
      </Dialog>
    </>
  );
};

ReceiptDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
