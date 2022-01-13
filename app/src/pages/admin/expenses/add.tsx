import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import NoExpense from "../../../components/expense/noExpense";
import AdminLayout from "../../../layouts/AdminLayout";
import { createExpense, getExpenses } from "../../../services/expenseService";
import TabAddExpense from "../../../components/expense/addEpense/tabAddExpense";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../../utils/getServerSideProps";
import myExpenses from ".";
import { TextDialog, TitleHead } from "../../../styles/typography";
import { AddExpense } from "../../../components/expense/addEpense";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const addExpense = () => {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (exp) => {
    createExpense(exp);
    loadExpenses();
  };

  function loadExpenses() {
    getExpenses().then((res) => setExpenses(res.data));
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  const routeAdd = "/admin/expenses/list";

  return (
    <AdminLayout>
      <Grid container>
        <Grid item xs={12}>
          <TitleHead>Ajouter des notes frais à votre dépense</TitleHead>
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
    </AdminLayout>
  );
};

addExpense.layout = myExpenses;

export default addExpense;
