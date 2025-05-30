import type React from "react";
import type { UserDetails } from "../../../types/employee.type";
import "./EmployeeCard.css";
import { formatTimeStampToDate } from "../../../helpers/format-timestamp";

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
  // console.log(status, textColor, backgroundColor);
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
function formatValue({ key, value }: { key: string; value: string }) {
  switch (key) {
    case "experience":
      return <p>{value} years</p>;
    case "status":
      return <StatusCell status={value} />;
    case "joining_date":
      return formatTimeStampToDate(value);
    default:
      return value;
  }
}

export const EmployeeCard = ({ data }: { data: UserDetails }) => {
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
      <hr />
      <div className="employee-card-line">
        <EmployeeDetailField
          className="employee-address"
          label="Employee Addresss"
          value={
            <>
              <p>LIne1</p>
              <p>line2</p>
              <p>house no</p>
            </>
          }
        />
        {/* <EmployeeDetailField label={"Employee Id"} value={"EMP123"} /> */}
      </div>
    </div>
  );
};
