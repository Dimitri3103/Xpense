import React, { useEffect, useState } from "react";
import {
  deleteExpense,
  getExpenses,
} from "../../../services-back/expenseService";
import ConfirmDialog from "../../dialogs/confirmDialog";
import themeDataGrid from "../../../theme/themeDataGrid";
import { Pagination } from "@material-ui/lab";
import { styleDataGrid } from "../../../styles/datagrid/datagrid";
import { styledPagination } from "../../../styles/datagrid/pagination";
import {
  createStyles,
  IconButton,
  ThemeProvider,
  withStyles,
} from "@material-ui/core";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridComponentProps,
} from "@material-ui/data-grid";
import { UploadDialog } from "../../dialogs/uploadDialog";
import { UpdateExpense } from "../updateExpense";
import { Expense } from "../../../models/expense";

const IconCrud = withStyles((theme) =>
  createStyles({
    root: {
      background: "#9BABC566 0% 0% no-repeat padding-box",
      width: 10,
      height: 10,
      color: "white",
      [theme.breakpoints.up("sm")]: {
        width: 25,
        height: 25,
      },
    },
  })
)(IconButton);

const TabAddExpense = (props) => {
  const { sheetId, expenses, loadExpenses, expenseTypes, taxes } = props;
  const classes = styleDataGrid();
  const stylePag = styledPagination();

  useEffect(() => {
    loadExpenses();
  }, []);

  const [isUploadDialog, setIsUploadDialog] = useState(false);
  const [isUpdateDialog, setIsUpdateDialog] = useState(false);

  const handleCloseUploadDialog = () => {
    setIsUploadDialog(false);
    loadExpenses();
  };
  const handleCloseUpdateDialog = () => {
    setIsUpdateDialog(false);
    loadExpenses();
  };

  const [selected, setSelected] = React.useState("");
  const [rowExpense, setRowExpense] = useState<Expense | null>(null);

  const columns: GridColDef[] = [
    {
      field: "label",
      headerName: "Libellé",
      flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      field: "date",
      headerName: "Date de dépense",
      type: "date",
      flex: 0.7,
      filterable: false,
      sortable: false,
    },
    {
      field: "amount",
      headerName: "Montant",
      flex: 0.5,
      filterable: false,
      sortable: false,
    },
    {
      field: "attachments",
      headerName: "Facture",
      flex: 0.5,
      renderCell: (params: GridCellParams) => (
        <IconButton
          size="small"
          style={{ color: "#2F45C5", fontSize: "1.3vw" }}
        >
          {params.row.attachments.length > 0 ? (
            <i className="uil uil-receipt-alt" />
          ) : null}
        </IconButton>
      ),
      filterable: false,
      sortable: false,
    },
    {
      field: "",
      headerName: "",
      flex: 0.5,
      renderCell: (params: GridCellParams) => (
        <div style={{ marginLeft: "auto" }}>
          <IconCrud
            size="small"
            onClick={() => {
              setSelected(params.row.id);
              setIsUploadDialog(true);
            }}
          >
            <i className="uil uil-file-upload" style={{ fontSize: "1.2vw" }} />
          </IconCrud>
          <IconCrud
            size="small"
            style={{ marginLeft: 10 }}
            onClick={() => {
              setRowExpense(params.row);
              setIsUpdateDialog(true);
            }}
          >
            <i className="uil uil-pen" style={{ fontSize: "1.2vw" }} />
          </IconCrud>
          <IconCrud
            size="small"
            style={{ marginLeft: 10 }}
            onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title:
                  "Êtes-vous sûr de vouloir supprimer cette dépense ?",
                subTitle: "Vous ne pouvez pas annuler cette opération !!!",
                onConfirm: () => {
                  removeExpense(params.getValue("id"));
                },
              });
            }}
          >
            <i className="uil uil-times" style={{ fontSize: "1.2vw" }} />
          </IconCrud>
          <UploadDialog
            isOpen={isUploadDialog}
            handleClose={handleCloseUploadDialog}
            expenseId={selected}
          />
          <UpdateExpense
            isOpen={isUpdateDialog}
            handleClose={handleCloseUpdateDialog}
            expense={rowExpense}
            sheetId={sheetId}
            expenseTypes={expenseTypes}
            taxes={taxes}
          />
        </div>
      ),
      filterable: false,
      sortable: false,
    },
  ];

  const [currentPage, setPage] = useState(0);

  const CustomPagination = (props: GridComponentProps) => {
    const { rowCount, pageSize } = props;
    let pageCount = Math.ceil(rowCount / pageSize);
    return (
      <Pagination
        className={stylePag.root}
        size="small"
        page={currentPage + 1}
        count={pageCount}
        onChange={(event, value) => setPage(value - 1)}
      />
    );
  };

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });
  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    loadExpenses();
  };
  const removeExpense = (id) => {
    deleteExpense(sheetId, id).then(() => {
      closeConfirmDialog();
    });
  };

  return (
    <ThemeProvider theme={themeDataGrid}>
      <DataGrid
        rows={props.expenses}
        columns={columns}
        pageSize={2}
        page={currentPage}
        paginationMode="client"
        className={classes.root}
        disableColumnMenu={true}
        autoHeight={true}
        headerHeight={30}
        rowHeight={30}
        hideFooterSelectedRowCount={true}
        disableSelectionOnClick={true}
        components={{
          Pagination: CustomPagination,
        }}
        componentsProps={{
          pagination: { rowCount: expenses.length, pageSize: 2 },
        }}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </ThemeProvider>
  );
};

export default TabAddExpense;
