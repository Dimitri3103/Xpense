import { Grid } from "@material-ui/core";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AddExpense } from "../../../../components/expense/addEpense";
import TabAddExpense from "../../../../components/expense/addEpense/tabAddExpense";
import NoExpense from "../../../../components/expense/noExpense";
import UserLayout from "../../../../layouts/UserLayout";
import { getExpenseTypes } from "../../../../services-back/admin/expenseTypeService";
import { getTaxes } from "../../../../services-back/admin/taxService";
import {
  createExpense,
  getExpenses,
} from "../../../../services-back/expenseService";
import { updateSheet } from "../../../../services-back/sheetService";
import { TextDialog, TitleHead } from "../../../../styles/typography";
import serverRuntimeConfig from "../../../../utils/getServerSideProps";
import Router from "next/router";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const AddExpenses = () => {
  const router = useRouter();
  const { sid, org } = router.query;

  const handleAddExpense = (exp) => {
    createExpense(sid.toString(), exp).then(() => loadExpenses());
  };

  const [expenses, setExpenses] = useState([]);
  function loadExpenses() {
    getExpenses(sid.toString()).then((res) => setExpenses(res));
  }
  const [total, setTotal] = useState(0);
  function getTotal() {
    getExpenses(sid.toString()).then((res) => {
      if (res.length > 0) {
        setTotal(
          res.map((datum) => Number(datum.amount)).reduce((a, b) => a + b, 0)
        );
      } else {
        setTotal(0);
      }
    });
  }

  const [expenseTypes, setExpenseTypes] = useState([]);
  function loadExpenseTypes() {
    getExpenseTypes(org.toString()).then((res) => setExpenseTypes(res));
  }

  const [taxes, setTaxes] = useState([]);
  function loadTaxes() {
    getTaxes(org.toString()).then((res) => setTaxes(res));
  }

  useEffect(() => {
    loadExpenses();
    getTotal();
    loadExpenseTypes();
    loadTaxes();
  }, [expenses, total]);

  let obj = { total: total };

  const handleSaveSheet = () => {
    updateSheet(org.toString(), sid.toString(), obj).then(() =>
      Router.push("/")
    );
  };

  const routeAdd = "/";
  const sheetId = sid.toString();

  return (
    <UserLayout>
      <Grid container>
        <Grid item xs={12}>
          <TitleHead>Ajouter des dépenses votre note de frais</TitleHead>
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 5 }}>
        <Grid item xs={12}>
          <TextDialog>Dépenses</TextDialog>
          {expenses.length === 0 ? (
            <NoExpense />
          ) : (
            <TabAddExpense
              {...{
                sheetId,
                expenses,
                loadExpenses,
                expenseTypes,
                taxes,
              }}
            />
          )}
        </Grid>
      </Grid>
      {org ? (
        <AddExpense
          {...{
            expenseTypes,
            taxes,
            handleAddExpense,
            routeAdd,
            handleSaveSheet,
          }}
        />
      ) : null}
    </UserLayout>
  );
};

export default AddExpenses;
