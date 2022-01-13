import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import { Grid, IconButton } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import addGroup from "../../styles/components/addGroup";
import { TextDialog, TitleDialog } from "../../styles/typography";
import {
  BootstrapInput,
  ButtonBlue,
  ButtonDashed,
  ButtonPink,
} from "../../styles/others";
import {
  CloseButon,
  CommonDialogActions,
  CommonDialogContent,
  CommonDialogTitle,
} from "../../styles/dialogs";

const AddGroup = (props: any) => {
  const { handleClose, open, handleAddGroup } = props;
  const classes = addGroup();
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {
    fields.forEach((field) => handleAddGroup(field));
  };

  const [fields, setFields] = useState([{ id: uuidv4(), name: "" }]);

  const handleChange = (id, event) => {
    const newFields = fields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setFields(newFields);
  };
  const handleAddFields = () => {
    setFields([...fields, { id: uuidv4(), name: "" }]);
  };
  const handleRemoveFields = (id) => {
    const values = [...fields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setFields(values);
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
        <TitleDialog>Ajouter des groupes</TitleDialog>
        <CloseButon onClick={handleClose}>
          <i className="uil uil-times-circle" style={{ fontSize: "1.5vw" }} />
        </CloseButon>
      </CommonDialogTitle>
      <CommonDialogContent dividers>
        <TextDialog>Nom du groupe</TextDialog>

        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => (
            <div key={field.id} style={{ width: "100%" }}>
              <Grid container alignItems="center">
                <Grid item xs={11}>
                  <BootstrapInput
                    className={classes.inputGroup}
                    inputRef={register({ required: true })}
                    name="name"
                    value={field.name}
                    placeholder=""
                    onChange={(event) => handleChange(field.id, event)}
                  />
                </Grid>
                {fields.length === 1 ? null : (
                  <Grid item xs={1}>
                    <IconButton onClick={() => handleRemoveFields(field.id)}>
                      <i
                        className="uil uil-times"
                        style={{ fontSize: "1.2vw" }}
                      />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </div>
          ))}
        </form>
        <div style={{ textAlign: "center" }}>
          <ButtonDashed
            className={classes.btnAddField}
            onClick={handleAddFields}
          >
            + Ajouter plus
          </ButtonDashed>
        </div>
      </CommonDialogContent>
      <CommonDialogActions>
        <Grid container spacing={2}>
          <Grid item xs={6} style={{ textAlign: "end" }}>
            <ButtonBlue
              onClick={handleSubmit(onSubmit)}
              className={classes.btnAddGroup}
            >
              Ajouter <i className="uil uil-angle-right-b"></i>
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

export default AddGroup;
