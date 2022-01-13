import React from "react";
import { useForm } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import { Grid } from "@material-ui/core";
import { BootstrapInput, ButtonBlue, ButtonPink } from "../../styles/others";
import {
  CloseButon,
  CommonDialogActions,
  CommonDialogContent,
  CommonDialogTitle,
} from "../../styles/dialogs";
import addGroup from "../../styles/components/addGroup";
import { TextDialog, TitleDialog } from "../../styles/typography";

const UpdateGroup = (props: any) => {
  const { handleClose, open, selected, handleUpdateGroup } = props;
  const classes = addGroup();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    handleUpdateGroup(data);
  };

  return (
    <Dialog
      maxWidth="md"
      PaperProps={{
        style: {
          boxShadow: "0px 3px 23px #00000033",
          borderRadius: 17,
          width: "27%",
        },
      }}
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <CommonDialogTitle id="form-dialog-title">
        <TitleDialog>Modifier groupe</TitleDialog>
        <CloseButon onClick={handleClose}>
          <i className="uil uil-times-circle" style={{ fontSize: "1.5vw" }} />
        </CloseButon>
      </CommonDialogTitle>
      <CommonDialogContent dividers>
        <TextDialog>Nom du groupe</TextDialog>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container alignItems="center">
            <Grid item xs={11}>
              <BootstrapInput
                className={classes.inputGroup}
                inputRef={register({ required: true })}
                name="name"
                defaultValue={selected.name}
              />
            </Grid>
          </Grid>
        </form>
      </CommonDialogContent>
      <CommonDialogActions>
        <Grid container spacing={2}>
          <Grid item xs={6} style={{ textAlign: "end" }}>
            <ButtonBlue
              onClick={handleSubmit(onSubmit)}
              className={classes.btnAddGroup}
            >
              Sauvegarder <i className="uil uil-angle-right-b"></i>
            </ButtonBlue>
          </Grid>
          <Grid item xs={6}>
            <ButtonPink onClick={handleClose} className={classes.btnClose}>
              Annuler
            </ButtonPink>
          </Grid>
        </Grid>
      </CommonDialogActions>
    </Dialog>
  );
};

export default UpdateGroup;
