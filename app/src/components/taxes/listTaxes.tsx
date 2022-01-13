import { ThemeProvider } from "@material-ui/core";
import React, { useRef, useState } from "react";
import themeDataGrid from "../../theme/themeDataGrid";
import { Pagination } from "@material-ui/lab";
import { MenuIconTab } from "../utils";
import { styleDataGrid } from "../../styles/datagrid/datagrid";
import { styledPagination } from "../../styles/datagrid/pagination";
import { MenuTabs } from "../utils/menu";
import { TaxExpTypeDialog } from "../dialogs/taxExpTypeDialog";
import { GetTax } from "./updateTaxForm";
import ConfirmDialog from "../dialogs/confirmDialog";
import { deleteTax } from "../../services-back/admin/taxService";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridComponentProps,
} from "@material-ui/data-grid";
import Tax from "../../models/tax";

const ListTaxes = ({ org, taxes, loadTaxes }) => {
  const styleTab = styleDataGrid();
  const stylePag = styledPagination();

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: null,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, isOpen: false });
    loadTaxes();
    handleMenuClose();
  };

  const removeTax = (id) => {
    deleteTax(org.id, id).then(() => {
      closeConfirmDialog();
    });
  };

  const [rowTax, setRowTax] = useState<Tax | null>(null);

  const [menuExp, setMenuExp] = useState(null);
  const isMenuOpen = Boolean(menuExp);

  const menuId = "expense-menu";

  const handleMenuClose = () => {
    setMenuExp(null);
  };

  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const openUpdateDialog = () => {
    setUpdateDialogOpen(true);
  };
  const closeUpdateDialog = () => {
    setUpdateDialogOpen(false);
    handleMenuClose();
    loadTaxes();
  };

  const childRef = useRef(null);

  const changeTax = () => {
    childRef.current.changeTax();
  };

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Code",
      flex: 0.5,
      filterable: false,
      sortable: false,
    },
    {
      field: "i18n",
      headerName: "Nom",
      flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      field: "defaultRate",
      headerName: "Taux",
      flex: 0.5,
      filterable: false,
      sortable: false,
    },
    {
      field: "",
      headerName: "",
      flex: 0.2,
      filterable: false,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <>
          <MenuIconTab
            aria-controls={menuId}
            onClick={(event) => {
              setRowTax(params.row);
              setMenuExp(event.currentTarget);
            }}
          />
          <MenuTabs
            menuId={menuId}
            anchorEl={menuExp}
            isMenuOpen={isMenuOpen}
            handleMenuClose={handleMenuClose}
            openUpdateDialog={openUpdateDialog}
            expType={rowTax}
            setConfirmDialog={setConfirmDialog}
            remove={removeTax}
            nameAction="cette taxe"
          />
          <TaxExpTypeDialog
            isOpen={isUpdateDialogOpen}
            handleClose={closeUpdateDialog}
            title="Modifier une taxe"
            onSubmit={changeTax}
            nameBtn="Sauvegarder"
          >
            <GetTax
              tax={rowTax}
              org={org}
              closeUpdateDialog={closeUpdateDialog}
              ref={childRef}
            />
          </TaxExpTypeDialog>
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </>
      ),
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

  return (
    <ThemeProvider theme={themeDataGrid}>
      <DataGrid
        rows={taxes}
        columns={columns}
        pageSize={5}
        page={currentPage}
        paginationMode="client"
        checkboxSelection
        className={styleTab.root}
        disableColumnMenu={true}
        autoHeight={true}
        hideFooterSelectedRowCount={true}
        disableSelectionOnClick={true}
        headerHeight={40}
        rowHeight={38}
        localeText={{ noRowsLabel: "Aucune taxe" }}
        components={{
          Pagination: CustomPagination,
        }}
        componentsProps={{
          pagination: { rowCount: taxes.length, pageSize: 5 },
        }}
      />
    </ThemeProvider>
  );
};

export default ListTaxes;
