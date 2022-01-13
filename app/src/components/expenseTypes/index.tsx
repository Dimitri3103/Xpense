import React, { ChangeEvent, useEffect, useState } from "react";
import {
  createExpenseType,
  getExpenseTypes,
} from "../../services-back/admin/expenseTypeService";
import listExpTypes from "../../styles/components/listExpTypes";
import { TaxExpTypeDialog } from "../dialogs/taxExpTypeDialog";
import HeaderExpTypes from "../headers/headerExpenseTypes";
import { TabPanel } from "../utils";
import { ExpenseTypeForm } from "./expenseTypeForm";
import ListExpenseTypes from "./listExpensesTypes";

const ExpenseTypes = (props) => {
  const { value, handleChange, org } = props;

  const [fields, setFields] = useState({
    code: "",
    i18n: "",
    type: "",
    multiplicator: "",
    status: "",
    orgId: org.id,
    attachmentRequired: false,
  });
  const handleChangeField = (value, event) => {
    setFields({
      ...fields,
      [value]: event.target.value,
    });
  };
  const handleChangeSwitch = (event: ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [event.target.name]: event.target.checked });
  };

  const classes = listExpTypes();

  const [isAddExpTypesOpen, setIsAddExpTypesOpen] = useState(false);
  const handleAddExpTypesDialogClose = () => {
    setIsAddExpTypesOpen(false);
    loadExpenseTypes();
  };
  const handleAddExpTypesDialog = () => {
    setIsAddExpTypesOpen(true);
  };
  const handleSubmit = () => {
    createExpenseType(org.id, fields).then(() => {
      handleAddExpTypesDialogClose();
    });
  };

  const [expTypes, setExpTypes] = useState([]);
  function loadExpenseTypes() {
    getExpenseTypes(org.id).then((res) => setExpTypes(res));
  }

  useEffect(() => {
    loadExpenseTypes();
  }, []);

  return (
    <>
      <HeaderExpTypes
        classes={classes}
        value={value}
        handleChange={handleChange}
        handleAddExpTypes={handleAddExpTypesDialog}
      />
      <br />
      <div style={{ marginTop: 5 }}>
        <TabPanel value={value} index={0}>
          Grid View
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ListExpenseTypes
            key={org.id}
            {...{ org, expTypes, loadExpenseTypes }}
          />
        </TabPanel>
      </div>
      <TaxExpTypeDialog
        isOpen={isAddExpTypesOpen}
        handleClose={handleAddExpTypesDialogClose}
        title="Ajouter un type de dépense"
        onSubmit={handleSubmit}
        nameBtn="Ajouter"
      >
        <ExpenseTypeForm
          fields={fields}
          handleChangeField={handleChangeField}
          handleChangeSwitch={handleChangeSwitch}
        />
      </TaxExpTypeDialog>
    </>
  );
};

export default ExpenseTypes;
