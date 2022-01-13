import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FormApproval from "../../../components/expense/detailExpense/formApprovalExpense";
import TabExpensesDetails from "../../../components/expense/detailExpense/tabDetailsExpense";
import { Expense } from "../../../models/expense";
import { getExpenses } from "../../../services-back/expenseService";
import sheetId from "../../../styles/components/sheetId";
import { GetServerSidePropsContext } from "next";
import serverRuntimeConfig from "../../../utils/getServerSideProps";
import { getUsersByOrg } from "../../../services-back/admin/userService";
import { getSheet, updateSheet } from "../../../services-back/sheetService";
import { HeaderSheetApproval } from "../../../components/headers/headerSheetDetails";
import SupervisorLayout from "../../../layouts/SupervisorLayout";
import ConfirmDialog from "../../../components/dialogs/confirmDialog";
import Router from "next/router";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return serverRuntimeConfig(ctx);
};

const SheetApproval = () => {
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

  const [users, setUsers] = useState([]);
  function loadUsers() {
    getUsersByOrg(org.toString()).then((res) => setUsers(res));
  }

  const [currentSheet, setCurrentSheet] = useState(null);
  function getCurrentSheet() {
    getSheet(org.toString(), sid.toString()).then((sheet) => {
      setCurrentSheet(sheet);
    });
  }
  useEffect(() => {
    loadExpenses();
    loadUsers();
    getCurrentSheet();
  }, []);

  let obj = { status: "approved" };
  let obj2 = { status: "declined" };

  const handleValidateSheet = () => {
    updateSheet(org.toString(), sid.toString(), obj)
      .then(() => {
        closeConfirmDialog();
      })
      .then(() => Router.push("/supervisor/approvals"));
  };
  const handleRejectSheet = () => {
    updateSheet(org.toString(), sid.toString(), obj2)
      .then(() => {
        closeConfirmDialog();
      })
      .then(() => Router.push("/supervisor/approvals"));
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

  return (
    <SupervisorLayout>
      <HeaderSheetApproval
        classes={classes}
        currentSheet={currentSheet}
        users={users}
      />
      <TabExpensesDetails rows={rows} handleRowSelection={handleRowSelection} />
      <FormApproval
        rowSelected={selectedRow}
        orgId={org.toString()}
        handleValidateSheet={handleValidateSheet}
        handleRejectSheet={handleRejectSheet}
        setConfirmDialog={setConfirmDialog}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </SupervisorLayout>
  );
};

export default SheetApproval;
