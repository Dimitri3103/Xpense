import { forwardRef, useImperativeHandle, useState } from "react";
import { updateExpenseType } from "../../services-back/admin/expenseTypeService";
import { ExpenseTypeForm } from "./expenseTypeForm";

export const GetExpenseType = forwardRef((props: any, ref) => {
  const { expType, org, closeUpdateDialog } = props;
  const [fields, setFields] = useState({
    code: expType.code,
    i18n: expType.i18n,
    type: expType.type,
    multiplicator: expType.multiplicator,
    status: expType.status,
    attachmentRequired: expType.attachmentRequired,
  });
  const handleChangeField = (value, event) => {
    setFields({
      ...fields,
      [value]: event.target.value,
    });
  };
  const handleChangeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({ ...fields, [event.target.name]: event.target.checked });
  };

  useImperativeHandle(ref, () => ({
    changeExpenseType() {
      updateExpenseType(org.id, expType.id, fields).then(() =>
        closeUpdateDialog()
      );
    },
  }));

  return (
    <div>
      <ExpenseTypeForm
        fields={fields}
        handleChangeField={handleChangeField}
        handleChangeSwitch={handleChangeSwitch}
      />
    </div>
  );
});
