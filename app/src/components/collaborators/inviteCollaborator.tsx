import { Grid, makeStyles, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import _ from "lodash/fp";
import { useForm } from "react-hook-form";
import { getRoles } from "../../services-back/admin/roleService";
import { TextDialog } from "../../styles/typography";
import Role from "../../models/role";
import {
  BootstrapInput,
  ButtonDashed,
  MenuItemCRuD,
  SelectIcon,
  StyledSelect,
} from "../../styles/others";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  selectGroupRole: { width: "100%" },
  inputEmail: { width: "100%", font: "normal normal normal 0.8vw Open Sans" },
  btnAddField: { width: "30%", marginTop: theme.spacing(0.5) },
}));

const InviteCollaborators = (props) => {
  const classes = useStyles();
  const { register } = useForm();

  const [roles, setRoles] = useState([]);
  function loadRoles() {
    if (roles.length == 0) {
      getRoles()
        .then((data: Role[]) => {
          const result = [];
          data.forEach((r) => result.push({ label: r.nameFR, value: r.id }));
          return result;
        })
        .then(setRoles);
    }
  }

  useEffect(() => {
    props.loadGroups();
    loadRoles();
  }, []);

  return (
    <>
      <div className={classes.content}>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <TextDialog>Adresse</TextDialog>
          </Grid>
          <Grid item xs={3}>
            <TextDialog>Rôle</TextDialog>
          </Grid>
          <Grid item xs={3}>
            <TextDialog>Groupe</TextDialog>
          </Grid>
          <Grid item></Grid>
        </Grid>

        <form onSubmit={props.handleSubmit} style={{ width: "100%" }}>
          {props.fields.map((field) => (
            <div key={field.id}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={5}>
                  <BootstrapInput
                    name="email"
                    id="email"
                    className={classes.inputEmail}
                    value={field.email}
                    inputRef={register({ required: true })}
                    onChange={(event) =>
                      props.handleChangeField(field.id, event)
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <StyledSelect
                    IconComponent={SelectIcon}
                    displayEmpty
                    className={classes.selectGroupRole}
                    name="roleId"
                    disableUnderline
                    value={field.roleId}
                    onChange={(event) =>
                      props.handleChangeField(field.id, event)
                    }
                  >
                    <MenuItemCRuD disabled value="">
                      Choisir un rôle
                    </MenuItemCRuD>
                    {roles.map((role) => (
                      <MenuItemCRuD key={role.label} value={role.value}>
                        {role.label}
                      </MenuItemCRuD>
                    ))}
                  </StyledSelect>
                </Grid>
                <Grid item xs={3}>
                  <StyledSelect
                    IconComponent={SelectIcon}
                    displayEmpty
                    className={classes.selectGroupRole}
                    name="groupId"
                    disableUnderline
                    value={field.groupId}
                    onChange={(event) =>
                      props.handleChangeField(field.id, event)
                    }
                  >
                    <MenuItemCRuD disabled value="">
                      Choisir un groupe
                    </MenuItemCRuD>
                    {props.groups.map((group) => (
                      <MenuItemCRuD key={group.id} value={group.id}>
                        {group.name}
                      </MenuItemCRuD>
                    ))}
                  </StyledSelect>
                </Grid>
                {props.fields.length === 1 ? null : (
                  <Grid item xs={1}>
                    <IconButton
                      onClick={() => props.handleRemoveFields(field.id)}
                    >
                      <i
                        className="uil uil-times"
                        style={{ fontSize: "1.5vw" }}
                      />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </div>
          ))}
        </form>

        <ButtonDashed
          className={classes.btnAddField}
          onClick={props.handleAddFields}
        >
          + Ajouter plus
        </ButtonDashed>
      </div>
    </>
  );
};

export default InviteCollaborators;
