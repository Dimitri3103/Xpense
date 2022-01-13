import React, { useEffect, useState } from "react";
import { createTax, getTaxes } from "../../services-back/admin/taxService";
import listTaxes from "../../styles/components/listTaxes";
import { TaxExpTypeDialog } from "../dialogs/taxExpTypeDialog";
import HeaderTaxes from "../headers/headerTaxes";
import { TabPanel } from "../utils";
import ListTaxes from "./listTaxes";
import { TaxForm } from "./taxForm";

const Taxes = (props) => {
  const { value, handleChange, org } = props;

  const [fields, setFields] = React.useState({
    code: "",
    i18n: "",
    defaultRate: "",
    orgId: org.id,
  });
  const handleChangeField = (value, event) => {
    setFields({
      ...fields,
      [value]: event.target.value,
    });
  };

  const classes = listTaxes();

  const [isAddTaxesOpen, setIsAddTaxesOpen] = React.useState(false);
  const handleAddTaxesDialogClose = () => {
    setIsAddTaxesOpen(false);
    loadTaxes();
  };
  const handleAddTaxesDialog = () => {
    setIsAddTaxesOpen(true);
  };
  const handleSubmit = () => {
    createTax(org.id, fields).then(() => {
      handleAddTaxesDialogClose();
    });
  };

  const [taxes, setTaxes] = useState([]);
  function loadTaxes() {
    getTaxes(org.id).then((res) => setTaxes(res));
  }

  useEffect(() => {
    loadTaxes();
  }, []);

  return (
    <>
      <HeaderTaxes
        classes={classes}
        value={value}
        handleChange={handleChange}
        handleAddTaxes={handleAddTaxesDialog}
      />
      <br />
      <div style={{ marginTop: 5 }}>
        <TabPanel value={value} index={0}>
          Grid View
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ListTaxes key={org.id} {...{ org, taxes, loadTaxes }} />
        </TabPanel>
      </div>
      <TaxExpTypeDialog
        isOpen={isAddTaxesOpen}
        handleClose={handleAddTaxesDialogClose}
        title="Ajouter une taxe"
        onSubmit={handleSubmit}
        nameBtn="Ajouter"
      >
        <TaxForm fields={fields} handleChangeField={handleChangeField} />
      </TaxExpTypeDialog>
    </>
  );
};

export default Taxes;
