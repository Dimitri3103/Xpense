import React from "react";
import {
  Dialog,
  FormControl,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import {
  CloseButon,
  CommonDialogActions,
  CommonDialogContent,
  CommonDialogTitle,
} from "../../styles/dialogs";
import formAddStyle from "../../styles/components/formAddExpense";
import { TitleDialog } from "../../styles/typography";
import { ButtonBlue, ButtonPink } from "../../styles/others";
import { uploadFile } from "../../services-back/uploadFileService";

const useStyles = makeStyles((theme) => ({
  btnSubmit: { width: "60%" },
  btnClose: { width: "40%" },
}));

export const UploadDialog = ({ isOpen, handleClose, expenseId }) => {
  const uploadImg = require("../../assets/img/upload-file.png");
  const classes = formAddStyle();
  const fileInputRef = React.useRef<HTMLInputElement>();
  const [isPreviewAvailable, setIsPreviewAvailable] = React.useState(false);
  const [previewSrc, setPreviewSrc] = React.useState("");
  const [fileSelected, setFileSelected] = React.useState(null);

  const handleChangeUpload = (event) => {
    const file = event.target.files[0];
    setFileSelected(file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
    setIsPreviewAvailable(file.name.match(/\.(jpeg|jpg|png)$/));
  };

  const classes2 = useStyles();

  const upload = () => {
    uploadFile("exp", expenseId, fileSelected).then(() => {
      handleClose();
    });
  };
  return (
    <>
      <Dialog
        PaperProps={{
          style: {
            boxShadow: "0px 3px 23px #00000033",
            borderRadius: 17,
            width: "25%",
            height: "60%",
          },
        }}
        open={isOpen}
        onClose={handleClose}
      >
        <CommonDialogTitle id="max-width-dialog-title">
          <TitleDialog>Ajouter Justificatif</TitleDialog>
          <CloseButon onClick={handleClose}>
            <i className="uil uil-times-circle" style={{ fontSize: "1.5vw" }} />
          </CloseButon>
        </CommonDialogTitle>
        <CommonDialogContent dividers>
          <Grid item xs={12}>
            <FormControl style={{ width: "100%" }}>
              {previewSrc ? (
                isPreviewAvailable ? (
                  <div>
                    <img src={previewSrc} className={classes.imgPreview2} />
                    <Grid container alignItems="center">
                      <Grid item xs={9}>
                        <div className={classes.fileName}>
                          {fileSelected.name}
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <IconButton onClick={() => setPreviewSrc("")}>
                          <i
                            className="uil uil-times"
                            style={{ fontSize: "1vw" }}
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </div>
                ) : (
                  <Grid container alignItems="center">
                    <Grid item xs={9}>
                      <div className={classes.fileName}>
                        {fileSelected.name}
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <IconButton onClick={() => setPreviewSrc("")}>
                        <i
                          className="uil uil-times"
                          style={{ fontSize: "1vw" }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                )
              ) : (
                <div className={classes.uploadPart}>
                  <img
                    src={uploadImg}
                    className={classes.imgUploadFile}
                    onClick={(event) => {
                      event.preventDefault();
                      fileInputRef.current.click();
                    }}
                  />
                </div>
              )}

              <input
                type="file"
                name="attachments"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleChangeUpload}
              />
            </FormControl>
          </Grid>
        </CommonDialogContent>
        <CommonDialogActions>
          <Grid container spacing={2}>
            <Grid item xs={6} style={{ textAlign: "end" }}>
              <ButtonBlue className={classes2.btnSubmit} onClick={upload}>
                Sauvegarder
              </ButtonBlue>
            </Grid>
            <Grid item xs={6}>
              <ButtonPink onClick={handleClose} className={classes2.btnClose}>
                Annuler
              </ButtonPink>
            </Grid>
          </Grid>
        </CommonDialogActions>
      </Dialog>
    </>
  );
};

UploadDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
