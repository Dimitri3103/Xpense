import { IconButton, ThemeProvider } from "@material-ui/core";
import React, { useState } from "react";
import themeDataGrid from "../../../theme/themeDataGrid";
import tabDetails from "../../../styles/components/tabDetails";
import { Pagination } from "@material-ui/lab";
import { styledPagination } from "../../../styles/datagrid/pagination";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridRowSelectedParams,
  GridComponentProps,
} from "@material-ui/data-grid";

const TabExpensesDetails = (props: any) => {
  const { handleRowSelection, rows } = props;
  const styleTab = tabDetails();
  const stylePag = styledPagination();

  const columns: GridColDef[] = [
    {
      field: "label",
      headerName: "Libellé",
      flex: 1.75,
      filterable: false,
      sortable: false,
    },
    {
      field: "date",
      headerName: "Date de dépense",
      type: "date",
      flex: 1.25,
      filterable: false,
      sortable: false,
    },
    {
      field: "amount",
      headerName: "Montant",
      flex: 1,
      filterable: false,
      sortable: false,
    },
    {
      field: "attachments",
      headerName: "Facture",
      type: "date",
      flex: 0.5,
      renderCell: (params: GridCellParams) => (
        <>
          {params.row.attachments.length > 0 ? (
            <IconButton
              size="small"
              style={{ color: "#2F45C5", fontSize: "1.3vw" }}
            >
              <i className="uil uil-receipt-alt" />
            </IconButton>
          ) : null}
        </>
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

  return (
    <ThemeProvider theme={themeDataGrid}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={3}
        page={currentPage}
        paginationMode="client"
        className={styleTab.root}
        disableColumnMenu={true}
        autoHeight={true}
        hideFooterSelectedRowCount={true}
        headerHeight={30}
        rowHeight={28}
        onRowSelected={(params: GridRowSelectedParams) =>
          handleRowSelection(params)
        }
        localeText={{
          noRowsLabel: "Pas de dépenses pour cette note de frais",
        }}
        components={{
          Pagination: CustomPagination,
        }}
        componentsProps={{
          pagination: { rowCount: rows.length, pageSize: 3 },
        }}
      />
    </ThemeProvider>
  );
};

export default TabExpensesDetails;
