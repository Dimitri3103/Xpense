import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { deleteSheet } from "../../../services-back/sheetService";
import tabExpensesList from "../../../styles/components/tabExpensesList";
import { GridCard } from "../../../styles/others";
import {
  Amount,
  Status,
  TextCard,
  TextDetails,
} from "../../../styles/typography";
import ConfirmDialog from "../../dialogs/confirmDialog";
import { AlertBar } from "../../Notification";
import { MenuIconGrid } from "../../utils";
import { MenuTabExpenses } from "../../utils/menu";

const GridViewExpenses = (props) => {
  const { org, sheets, loadSheets } = props;
  const classes = tabExpensesList();

  const [selected, setSelected] = useState("");

  const [menuExp, setMenuExp] = useState(null);
  const isMenuOpen = Boolean(menuExp);

  const menuId = "expense-menu";
  const handleMenuClose = () => {
    setMenuExp(null);
  };

  useEffect(() => {
    loadSheets();
  }, []);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    loadSheets();
    handleMenuClose();
  };

  const [alertMeta, setAlertMeta] = useState({ severity: "", message: "" });
  const [isAlertOpen, setAlertOpen] = useState(false);

  const showAlert = (severity, message) => {
    setAlertMeta({ severity, message });
    setAlertOpen(true);
  };
  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  const removeSheet = (id) => {
    deleteSheet(org.id, id)
      .then(() => {
        closeConfirmDialog();
      })
      .then(() => showAlert("success", "Note de frais Supprimée"))
      .catch(() => showAlert("error", "Erreur de suppression"));
  };

  let route = {
    pathname: `/sheet/user/${selected}`,
    query: { org: org.id },
  };

  let routeAddExpense = {
    pathname: `/sheet/user/add/${selected}`,
    query: { org: org.id },
  };

  useEffect(() => {}, []);

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 5, marginBottom: 5 }}>
        {sheets.map((sheet) => (
          <Grid key={sheet.id} item xs={3}>
            <Card className={classes.sheetCard}>
              <CardHeader
                action={
                  <MenuIconGrid
                    aria-controls={menuId}
                    onClick={(event) => {
                      setSelected(sheet.id);
                      setMenuExp(event.currentTarget);
                    }}
                  />
                }
                title={
                  <div className={classes.labelSheet}>
                    {sheet.label}
                    <i
                      className="uil uil-invoice"
                      style={{
                        color: "#38D643",
                        marginLeft: 10,
                        fontSize: "1.2vw",
                      }}
                    />
                  </div>
                }
                className={classes.cardHeader}
              />
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid item xs={12}>
                    <Grid container alignItems="center">
                      <GridCard item xs={4}>
                        <TextCard>Date :</TextCard>
                      </GridCard>
                      <Grid item xs={8}>
                        <TextDetails>{sheet.creationDate}</TextDetails>
                      </Grid>
                      <Grid container alignItems="center">
                        <GridCard item xs={4}>
                          <TextCard>Montant :</TextCard>
                        </GridCard>
                        <Grid item xs={8}>
                          <Amount>{sheet.total}</Amount>
                        </Grid>
                      </Grid>
                      <Grid container alignItems="center">
                        <GridCard item xs={4}>
                          <TextCard>Statut :</TextCard>
                        </GridCard>
                        <Grid item xs={8}>
                          <div>
                            {sheet.status === "new" ? (
                              <Status className={classes.statusNew}>
                                Nouvelle
                              </Status>
                            ) : null}
                            {sheet.status == "pending" ? (
                              <Status className={classes.statusPending}>
                                En attente
                              </Status>
                            ) : null}
                            {sheet.status == "approved" ? (
                              <Status className={classes.statusApproved}>
                                Validée
                              </Status>
                            ) : null}
                            {sheet.status == "declined" ? (
                              <Status className={classes.statusDeclined}>
                                Rejetée
                              </Status>
                            ) : null}
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <AlertBar
          open={isAlertOpen}
          onClose={handleAlertClose}
          alertMeta={alertMeta}
        />
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
        <MenuTabExpenses
          menuId={menuId}
          menuExp={menuExp}
          isMenuOpen={isMenuOpen}
          handleMenuClose={handleMenuClose}
          route={route}
          routeAddExpense={routeAddExpense}
          setConfirmDialog={setConfirmDialog}
          remove={removeSheet}
          sheetId={selected}
        />
      </Grid>
    </>
  );
};

export default GridViewExpenses;
