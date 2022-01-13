import FormControl from "@material-ui/core/FormControl";
import { Controller } from "react-hook-form";
import { SelectIcon, StyledSelect } from "../styles/others";

const ReactHookFormSelect = ({
  name,
  control,
  defaultValue,
  children,
  ...props
}) => {
  return (
    <FormControl {...props}>
      <Controller
        as={
          <StyledSelect
            disableUnderline
            IconComponent={SelectIcon}
            displayEmpty
          >
            {children}
          </StyledSelect>
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default ReactHookFormSelect;
