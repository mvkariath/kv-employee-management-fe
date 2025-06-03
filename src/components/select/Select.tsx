import type { selectBoxOption } from "../../pages/employee-list/EmployeeList";
import type { Role, Status } from "../../store/employee/employee.types";
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
        onChange={(event) =>
          onChange(
            label === "Department" ? "departmentId" : "status",
            event.target.value
          )
        }
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
