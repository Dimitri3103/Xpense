import { forwardRef, useImperativeHandle, useState } from "react";
import { updateTax } from "../../services-back/admin/taxService";
import { TaxForm } from "./taxForm";

export const GetTax = forwardRef((props: any, ref) => {
  const { tax, org, closeUpdateDialog } = props;

  const [fields, setFields] = useState({
    code: tax.code,
    i18n: tax.i18n,
    defaultRate: tax.defaultRate,
  });
  const handleChangeField = (value, event) => {
    setFields({
      ...fields,
      [value]: event.target.value,
    });
  };

  useImperativeHandle(ref, () => ({
    changeTax() {
      updateTax(org.id, tax.id, fields).then(() => closeUpdateDialog());
    },
  }));

  return (
    <div>
      <TaxForm fields={fields} handleChangeField={handleChangeField} />
    </div>
  );
});
