import { Grid, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import formDetailsExpense from "../../../styles/components/formDetailsExpense";
import { ButtonBlue, ButtonPink, StyledDivider } from "../../../styles/others";
import { ReceiptDialog } from "../../dialogs/receiptDialog";
import {
  Amount,
  AmountDetails,
  DetailsLabel,
  TextDetails,
} from "../../../styles/typography";
import { getSheet } from "../../../services-back/sheetService";
import { getGroups } from "../../../services-back/admin/groupService";
import Router from "next/router";
import { getExpense } from "../../../services-back/expenseService";
import { getExpenseTypes } from "../../../services-back/admin/expenseTypeService";
import { getTaxes } from "../../../services-back/admin/taxService";

const FormDetails = (props: any) => {
  const { rowSelected, orgId } = props;
  const classes = formDetailsExpense();
  const [stateZoom, setStateZoom] = useState(false);

  const [receipt, setReceipt] = useState("");

  const handleClose = () => {
    setStateZoom(false);
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Grid container spacing={1}>
            <Grid item container xs={3} direction="column">
              <Grid item>
                <DetailsLabel>Libellé</DetailsLabel>
              </Grid>
              <Grid item>
                <TextDetails>
                  {rowSelected ? rowSelected.label : null}
                </TextDetails>
              </Grid>
            </Grid>
            <Grid item container xs={3} direction="column">
              <Grid item>
                <DetailsLabel>Date de dépense</DetailsLabel>
              </Grid>
              <Grid item>
                <TextDetails>
                  {rowSelected ? rowSelected.date : null}
                </TextDetails>
              </Grid>
            </Grid>
            <Grid item container xs={2} direction="column">
              <Grid item>
                <DetailsLabel>Catégorie</DetailsLabel>
              </Grid>
              <Grid item>
                {rowSelected ? (
                  <CategoryComponent
                    sheetId={rowSelected.sheetId}
                    expenseId={rowSelected.id}
                  />
                ) : null}
              </Grid>
            </Grid>
            <Grid item container xs={4} direction="column">
              <Grid item>
                <DetailsLabel>Taxes</DetailsLabel>
              </Grid>
              <Grid item container style={{ marginBottom: 5 }} spacing={1}>
                <Grid item>
                  {rowSelected ? (
                    <TaxComponent
                      sheetId={rowSelected.sheetId}
                      expenseId={rowSelected.id}
                      orgId={orgId}
                    />
                  ) : null}
                </Grid>
                <Grid item>
                  <AmountDetails className={classes.amount}>
                    {rowSelected ? rowSelected.taxAmount : null}
                  </AmountDetails>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ marginTop: 10 }}>
            <Grid item container xs={3} direction="column">
              <Grid item>
                <DetailsLabel>Mode de paiement</DetailsLabel>
              </Grid>
              <Grid item>
                {rowSelected ? (
                  <PaymentComponent
                    sheetId={rowSelected.sheetId}
                    expenseId={rowSelected.id}
                  />
                ) : null}
              </Grid>
            </Grid>
            <Grid item container xs={3} direction="column">
              <Grid item>
                <DetailsLabel>Type de dépense</DetailsLabel>
              </Grid>
              <Grid item>
                {rowSelected ? (
                  <ExpTypeComponent
                    sheetId={rowSelected.sheetId}
                    expenseId={rowSelected.id}
                    orgId={orgId}
                  />
                ) : null}
              </Grid>
            </Grid>
            <Grid item container xs={2} direction="column">
              <Grid item>
                <DetailsLabel>Groupe</DetailsLabel>
              </Grid>
              <Grid item>
                {rowSelected ? (
                  <GroupComponent sheetId={rowSelected.sheetId} orgId={orgId} />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <StyledDivider style={{ margin: "20px 0px 20px 0px" }} />
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            justify="flex-end"
          >
            <Grid item xs={3}>
              <Grid container spacing={1} className={classes.itemAmount}>
                <Grid item className={classes.pinkText}>
                  Montant
                </Grid>
                <Grid item>
                  <Amount style={{ marginLeft: 10 }}>
                    {rowSelected ? rowSelected.amount : null}
                  </Amount>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2}>
          <div className={classes.uploadPart}>
            {rowSelected
              ? rowSelected.attachments.map((attachment) => (
                  <div key={attachment.name}>
                    <img
                      src={require(`../../../../../api/public/files/${attachment.name}`)}
                      alt=""
                      className={classes.imgReceipt}
                    />
                    <IconButton
                      className={classes.avatarZoom}
                      size="small"
                      onClick={(event) => {
                        setReceipt(`${attachment.name}`);
                        setStateZoom(true);
                      }}
                    >
                      <i
                        className="uil uil-search-plus"
                        style={{ fontSize: "1.2vw" }}
                      />
                    </IconButton>
                  </div>
                ))
              : null}
          </div>

          <ReceiptDialog
            isOpen={stateZoom}
            handleClose={handleClose}
            receipt={receipt}
            rowSelected={rowSelected}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export const GroupComponent = ({ sheetId, orgId }) => {
  const [currentSheet, setCurrentSheet] = useState(null);
  function getCurrentSheet() {
    getSheet(orgId, sheetId).then((sheet) => {
      setCurrentSheet(sheet);
    });
  }

  const [groups, setGroups] = useState([]);
  function loadGroups() {
    getGroups(orgId).then((groups) => {
      setGroups(groups);
    });
  }

  useEffect(() => {
    loadGroups();
    getCurrentSheet();
  }, []);
  return (
    <>
      {currentSheet
        ? groups.map((group) =>
            group?.members.includes(currentSheet.userId) == true ? (
              <TextDetails key={group.id}>{group.name}</TextDetails>
            ) : null
          )
        : null}
    </>
  );
};

export const TaxComponent = ({ sheetId, expenseId, orgId }) => {
  const [currentExp, setCurrentExp] = useState(null);
  function getCurrentExp() {
    getExpense(sheetId, expenseId).then((exp) => {
      setCurrentExp(exp);
    });
  }

  const [taxes, setTaxes] = useState([]);
  function loadTaxes() {
    getTaxes(orgId).then((res) => {
      setTaxes(res);
    });
  }

  useEffect(() => {
    loadTaxes();
    getCurrentExp();
  }, []);
  return (
    <>
      {currentExp
        ? taxes.map((tax) =>
            tax.id == currentExp.tax ? (
              <div key={tax.id}>
                <TextDetails>{tax.i18n}</TextDetails>
              </div>
            ) : null
          )
        : null}
    </>
  );
};
export const ExpTypeComponent = ({ sheetId, expenseId, orgId }) => {
  const [currentExp, setCurrentExp] = useState(null);
  function getCurrentExp() {
    getExpense(sheetId, expenseId).then((exp) => {
      setCurrentExp(exp);
    });
  }

  const [expTypes, setExpTypes] = useState([]);
  function loadExpTypes() {
    getExpenseTypes(orgId).then((expTypes) => {
      setExpTypes(expTypes);
    });
  }

  useEffect(() => {
    loadExpTypes();
    getCurrentExp();
  }, []);
  return (
    <>
      {currentExp
        ? expTypes.map((expt) =>
            expt.id == currentExp.type ? (
              <div key={expt.id}>
                <TextDetails>{expt.i18n}</TextDetails>
              </div>
            ) : null
          )
        : null}
    </>
  );
};

export const CategoryComponent = ({ sheetId, expenseId }) => {
  const [currentExp, setCurrentExp] = useState(null);
  function getCurrentExp() {
    getExpense(sheetId, expenseId).then((exp) => {
      setCurrentExp(exp);
    });
  }

  const categories = [
    { id: "transport", title: "Transport" },
    { id: "meal", title: "Repas" },
  ];

  useEffect(() => {
    getCurrentExp();
  }, []);
  return (
    <>
      {currentExp
        ? categories.map((cat) =>
            cat.id == currentExp.category ? (
              <div key={cat.id}>
                <TextDetails>{cat.title}</TextDetails>
              </div>
            ) : null
          )
        : null}
    </>
  );
};

export const PaymentComponent = ({ sheetId, expenseId }) => {
  const [currentExp, setCurrentExp] = useState(null);
  function getCurrentExp() {
    getExpense(sheetId, expenseId).then((exp) => {
      setCurrentExp(exp);
    });
  }

  const payments = [
    { id: "check", title: "Chèque" },
    { id: "cash", title: "Espèce" },
    { id: "card", title: "Carte" },
  ];

  useEffect(() => {
    getCurrentExp();
  }, []);
  return (
    <>
      {currentExp
        ? payments.map((cat) =>
            cat.id == currentExp.payMethod ? (
              <div key={cat.id}>
                <TextDetails>{cat.title}</TextDetails>
              </div>
            ) : null
          )
        : null}
    </>
  );
};

export const FormDetailsSheet = (props: any) => {
  const { rowSelected, orgId, handleSubmitSheet, setConfirmDialog } = props;
  const classes = formDetailsExpense();

  return (
    <div>
      <FormDetails rowSelected={rowSelected} orgId={orgId} />
      <StyledDivider style={{ marginTop: 10, marginBottom: 10 }} />
      <div>
        <Grid container>
          <Grid item xs={12} style={{ textAlign: "end" }}>
            <ButtonBlue
              className={classes.btnConfirm}
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title:
                    "Êtes-vous sûr de vouloir soumettre cette note de frais ?",
                  subTitle: "Vous ne pouvez pas annuler cette opération !!!",
                  onConfirm: handleSubmitSheet,
                });
              }}
            >
              Soumettre
            </ButtonBlue>

            <ButtonPink
              className={classes.btnCancel}
              onClick={() => {
                Router.push("/");
              }}
            >
              Annuler
            </ButtonPink>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default FormDetails;
