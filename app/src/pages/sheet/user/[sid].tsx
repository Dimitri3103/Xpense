import React, { useEffect, useState } from "react";
import TabExpensesDetails from "../../../components/expense/detailExpense/tabDetailsExpense";
import UserLayout from "../../../layouts/UserLayout";
import { useRouter } from "next/dist/client/router";
import { getExpenses } from "../../../services-back/expenseService";
import sheetId from "../../../styles/components/sheetId";
import { Expense } from "../../../models/expense";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../../utils/getServerSideProps";
import { HeaderSheetUser } from "../../../components/headers/headerSheetDetails";
import { getSheet, updateSheet } from "../../../services-back/sheetService";
import { FormDetailsSheet } from "../../../components/expense/detailExpense/formDetailsExpense";
import Router from "next/router";
import ConfirmDialog from "../../../components/dialogs/confirmDialog";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const SheetUser = () => {
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

  let obj = { status: "pending", submittedOn: new Date() };

  const handleSubmitSheet = () => {
    updateSheet(org.toString(), sid.toString(), obj)
      .then(() => {
        closeConfirmDialog();
      })
      .then(() => Router.push("/"));
  };

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
  };

  const routeCancel = "/";

  return (
    <UserLayout>
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
        setConfirmDialog={setConfirmDialog}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </UserLayout>
  );
};

export default SheetUser;
