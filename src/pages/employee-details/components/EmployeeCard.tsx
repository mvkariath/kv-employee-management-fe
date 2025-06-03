import type React from "react";
import "./EmployeeCard.css";
import { formatTimeStampToDate } from "../../../helpers/format-timestamp";
import type { Address, Employee } from "../../../store/employee/employee.types";
import type { Department } from "../../../api-services/department/types";

function StatusCell({ status }: { status: string }) {
  let textColor;
  let backgroundColor;
  switch (status) {
    case "ACTIVE":
      textColor = "green";
      backgroundColor = "#D3F4BE";
      break;
    case "INACTIVE":
      textColor = "red";
      backgroundColor = "#FFBFBF";
      break;

    case "PROBATION":
      textColor = "#baab27";
      backgroundColor = "#F5ECB8";
      break;

    default:
      textColor = "white";
      backgroundColor = "gray";
  }

  return (
    <div
      style={{ color: textColor, background: backgroundColor }}
      className="status-badge"
    >
      {status}
    </div>
  );
}

function EmployeeDetailField({
  label,
  value,
  className,
}: {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`employee-details-field ${className}`}>
      <label>{label}</label>
      <p>{value}</p>
    </div>
  );
}
function formatValue({
  key,
  value,
}: {
  key: string;
  value: string | Address | Department;
}) {
  switch (key) {
    case "experience":
      return <p>{value as string} years</p>;
    case "deleted_at":
    case "password":
      return null;
    case "status":
      return <StatusCell status={value as string} />;
    case "dateOfJoining":
    case "updatedAt":
    case "createdAt":
      return formatTimeStampToDate(value as string);
    case "address":
      const address: Address = value as Address;
      return (
        <>
          <p>{address.houseNo}</p>
          <p>{address.line1}</p>
          <p>{address.line2}</p>
          <p>{address.pincode}</p>
        </>
      );
    case "department":
      return (value as Department).name;
    default:
      return value;
  }
}

export const EmployeeCard = ({ data }: { data: Employee }) => {
  const address = data.address;
  console.log(address);

  return (
    <div className="employee-card">
      <div className="employee-card-line">
        {(function () {
          return (
            <>
              {Object.entries(data).map(([key, value]) => {
                return (
                  <EmployeeDetailField
                    label={key}
                    value={formatValue({ key, value })}
                  />
                );
              })}
            </>
          );
        })()}
      </div>

      <div className="employee-card-line">
        {/* <EmployeeDetailField
          className="employee-address"
          label="Employee Addresss"
          value={<></>}
        /> */}
        {/* <EmployeeDetailField label={"Employee Id"} value={"EMP123"} /> */}
      </div>
    </div>
  );
};
