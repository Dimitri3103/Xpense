import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TabExpensesDetails from "../../../components/expense/detailExpense/tabDetailsExpense";
import SupervisorLayout from "../../../layouts/SupervisorLayout";
import { Expense } from "../../../models/expense";
import { getExpenses } from "../../../services-back/expenseService";
import sheetId from "../../../styles/components/sheetId";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../../utils/getServerSideProps";
import { HeaderSheetUser } from "../../../components/headers/headerSheetDetails";
import { getSheet, updateSheet } from "../../../services-back/sheetService";
import { FormDetailsSheet } from "../../../components/expense/detailExpense/formDetailsExpense";
import Router from "next/router";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const SheetAdmin = () => {
  const classes = sheetId();

  const router = useRouter();
  const { sid, org } = router.query;

  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState<Expense | null>(null);

  const handleRowSelection = (row) => {
    const newState = row.data as Expense;
    setSelectedRow(() => newState);
  };

  function loadExpenses() {
    getExpenses(sid.toString()).then((res) => setRows(res));
  }

  const [currentSheet, setCurrentSheet] = useState(null);
  function getCurrentSheet() {
    getSheet(org.toString(), sid.toString()).then((sheet) => {
      setCurrentSheet(sheet);
    });
  }
  useEffect(() => {
    loadExpenses();
    getCurrentSheet();
  }, []);

  let obj = { status: "pending" };

  const handleSubmitSheet = () => {
    updateSheet(org.toString(), sid.toString(), obj).then(() =>
      Router.push("/supervisor")
    );
  };

  const routeCancel = "/supervisor";

  return (
    <SupervisorLayout>
      <HeaderSheetUser
        classes={classes}
        routeCancel={routeCancel}
        currentSheet={currentSheet}
      />
      <TabExpensesDetails rows={rows} handleRowSelection={handleRowSelection} />
      <br />
      <FormDetailsSheet
        rowSelected={selectedRow}
        orgId={org.toString()}
        handleSubmitSheet={handleSubmitSheet}
      />
    </SupervisorLayout>
  );
};

export default SheetAdmin;
