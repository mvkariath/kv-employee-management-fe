import type { selectBoxOption } from "../../pages/employee-list/EmployeeList";
import "./Select.css";

const Select = ({
  label,
  selectOptions,
  className = "",
  value,
  onChange = (value) => console.log("hello"),
}: {
  label: string;
  selectOptions: selectBoxOption[];
  className?: string;
  value?: string;
  onChange?: (value: "active" | "inactive" | "probation" | "all") => void;
}) => {
  return (
    <div className={`select-component ${className}`}>
      <label>{label}</label>
      <select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value as "active" | "inactive" | "probation" | "all"
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
