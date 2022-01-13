import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import NoExpense from "../../../components/expense/noExpense";
import { TextDialog, TitleHead } from "../../../styles/typography";
import myExpenses from ".";
import SupervisorLayout from "../../../layouts/SupervisorLayout";
import TabAddExpense from "../../../components/expense/addEpense/tabAddExpense";
import {
  createExpense,
  getExpenses,
} from "../../../services-back/expenseService";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../../utils/getServerSideProps";
import { AddExpense } from "../../../components/expense/addEpense";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const addExpense = () => {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (exp) => {
    // createExpense("sheet:simon", exp);
    // loadExpenses();

    console.log(exp);
  };

  function loadExpenses() {
    getExpenses("sheet:simon").then((res) => setExpenses(res));
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  const routeAdd = "/";

  return (
    <SupervisorLayout>
      <Grid container>
        <Grid item xs={12}>
          <TitleHead>Ajout d’une feuille de dépenses</TitleHead>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 5 }}>
        <Grid item xs={12}>
          <TextDialog>Notes de frais</TextDialog>
          {expenses.length === 0 ? (
            <NoExpense />
          ) : (
            <TabAddExpense loadExpenses={loadExpenses} expenses={expenses} />
          )}
        </Grid>
      </Grid>

      <AddExpense handleSubmit={handleAddExpense} routeAdd={routeAdd} />
    </SupervisorLayout>
  );
};

addExpense.layout = myExpenses;

export default addExpense;
