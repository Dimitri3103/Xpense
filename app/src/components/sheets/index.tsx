import React, { useState } from "react";
import { getSheetsByUser } from "../../services-back/admin/userService";
import { createSheet } from "../../services-back/sheetService";
import listSheets from "../../styles/components/listSheets";
import { TaxExpTypeDialog } from "../dialogs/taxExpTypeDialog";
import GridViewExpenses from "../expense/listExpenses/gridViewExpenses";
import TabExpensesList from "../expense/listExpenses/user";
import { HeaderExpenses } from "../headers/headerExpenses";
import { TabPanel } from "../utils";
import { SheetForm } from "./sheetForm";

const Sheets = (props) => {
  const { value, handleChange, org, profile } = props;

  const [fields, setFields] = React.useState({
    label: "",
    description: "",
    creationDate: new Date(),
    status: "new",
    submittedOn: null,
    exported: false,
    total: 0,
    orgId: org.id,
    userId: profile.id,
  });
  const handleChangeField = (value, event) => {
    setFields({
      ...fields,
      [value]: event.target.value,
    });
  };

  const classes = listSheets();

  const [isAddSheetOpen, setIsAddSheetOpen] = React.useState(false);
  const handleAddSheetDialogClose = () => {
    setIsAddSheetOpen(false);
    loadSheets();
  };
  const handleAddSheetDialog = () => {
    setIsAddSheetOpen(true);
  };
  const handleSubmit = () => {
    createSheet(org.id, fields).then(() => {
      handleAddSheetDialogClose();
    });
  };

  const [sheets, setSheets] = useState([]);
  function loadSheets() {
    getSheetsByUser().then((res) => setSheets(res));
  }

  return (
    <>
      <HeaderExpenses
        classes={classes}
        value={value}
        handleChange={handleChange}
        handleAddSheet={handleAddSheetDialog}
      />
      <div style={{ marginTop: 5 }}>
        <TabPanel value={value} index={0}>
          <GridViewExpenses {...{ org, sheets, loadSheets }} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {org ? (
            <TabExpensesList key={org.id} {...{ org, sheets, loadSheets }} />
          ) : (
            <div></div>
          )}
        </TabPanel>
      </div>
      <TaxExpTypeDialog
        isOpen={isAddSheetOpen}
        handleClose={handleAddSheetDialogClose}
        title="Ajouter une note de frais"
        onSubmit={handleSubmit}
        nameBtn="Ajouter"
      >
        <SheetForm fields={fields} handleChangeField={handleChangeField} />
      </TaxExpTypeDialog>
    </>
  );
};
export default Sheets;
