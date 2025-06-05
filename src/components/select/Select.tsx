import type { selectBoxOption } from "../../pages/employee-list/EmployeeList";
import "./Select.css";

const Select = ({
  label,
  selectOptions,
  className = "",
  value,
  onChange = (label, value) => console.log("this is the depat", label, value),
}: {
  label: string;
  selectOptions: selectBoxOption[];
  className?: string;
  value?: string | number;
  onChange?: (field: string, value: string | number) => void;
}) => {
  return (
    <div className={`select-component ${className}`}>
      <label>{label}</label>
      <select
        value={value}
        onChange={(event) => {
          console.log("from the component", event.target.value);
          onChange(
            label === "Department"
              ? "departmentId"
              : label === "Role"
              ? "role"
              : "status",
            label === "Department"
              ? parseInt(event.target.value)
              : event.target.value
          );
        }}
      >
        {selectOptions.length &&
          selectOptions.map((option) => {
            return <option value={option.value}>{option.label}</option>;
          })}
      </select>
    </div>
  );
};

export default Select;
