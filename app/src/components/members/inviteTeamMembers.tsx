import React, { useEffect, useState } from "react";
import { TextGrid } from "../../styles/typography";
import { v4 as uuidv4 } from "uuid";
import { Grid, Icon, IconButton } from "@material-ui/core";
import { getRoles } from "../../services-back/admin/roleService";
import inviteTeamMembers from "../../styles/components/inviteTeamMembers";
import Role from "../../models/role";
import {
  BootstrapInput,
  ButtonBlue,
  ButtonDashed,
  MenuItemCRuD,
  SelectIcon,
  StyledSelect,
} from "../../styles/others";

const InviteTeamMembers = () => {
  const classes = inviteTeamMembers();
  const [fields, setFields] = useState([{ id: uuidv4(), email: "", role: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fields.forEach((field) => console.log(field));
  };
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
    setFields([...fields, { id: uuidv4(), email: "", role: "" }]);
  };
  const handleRemoveFields = (id) => {
    const values = [...fields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setFields(values);
  };

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
    loadRoles();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.boxContent}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div className={classes.personAddBox}>
              <Icon style={{ fontSize: "2vw" }}>
                <i className="uil uil-user-plus" />
              </Icon>
            </div>
          </Grid>
          <Grid item xs={12}>
            <p className={classes.invitation}>
              Invitez les membres de votre équipe
            </p>
          </Grid>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <p className={classes.slogan}>
              Démarrez votre suivi plus rapidement en invitant directement les
              membres de votre équipe
            </p>
            <Grid item xs={1} />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={1} />
          <Grid item xs={5}>
            <TextGrid>Adresse</TextGrid>
          </Grid>
          <Grid item xs={5}>
            <TextGrid>Rôle</TextGrid>
          </Grid>
          <Grid item xs={1} />
        </Grid>

        <form onSubmit={handleSubmit} className={classes.form}>
          {fields.map((field) => (
            <div key={field.id}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={1} />
                <Grid item xs={5}>
                  <BootstrapInput
                    className={classes.inputEmail}
                    name="email"
                    value={field.email}
                    placeholder="name@exemple.com"
                    onChange={(event) => handleChange(field.id, event)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <StyledSelect
                    IconComponent={SelectIcon}
                    displayEmpty
                    className={classes.selectRole}
                    name="role"
                    value={field.role}
                    disableUnderline
                    onChange={(event) => handleChange(field.id, event)}
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
                {fields.length === 1 ? null : (
                  <Grid item xs={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveFields(field.id)}
                    >
                      <i className="uil uil-times" />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </div>
          ))}
        </form>

        <br />

        <Grid container spacing={1}>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <ButtonDashed
              className={classes.btnAddFields}
              onClick={handleAddFields}
            >
              + Ajouter plus
            </ButtonDashed>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <br />
        <ButtonBlue className={classes.btnInv} onClick={handleSubmit}>
          Envoyer les invitations <i className="uil uil-angle-right-b" />
        </ButtonBlue>
      </div>
    </div>
  );
};

export default InviteTeamMembers;
