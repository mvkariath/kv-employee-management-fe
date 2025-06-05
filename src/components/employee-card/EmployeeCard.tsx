import type React from "react";
import "./EmployeeCard.css";
import { formatTimeStampToDate } from "../../helpers/format-timestamp";
import type { Address, Employee } from "../../store/employee/employee.types";
import type { Department } from "../../api-services/department/types";

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
function formatLabel(label: string) {
  let formatted_string = "";
  for (let i = 0; i < label.length; i++) {
    if (/[A-Z]/.test(label[i])) {
      formatted_string += " ";
    }
    formatted_string += label[i];
    console.log(label[i]);
  }
  return formatted_string;
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
      <label>{formatLabel(label)}</label>
      <div>{value}</div>
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
    case "deletedAt":
      return "N/A";
    case "password":
      return "****";
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
      return value as String;
  }
}
function GenerateUi(data: Employee) {
  const cards = [];
  for (let i = 0; i < 15; i += 5) {
    cards.push(
      <>
        <div className="employee-card-line">
          {Object.entries(data)
            .slice(i, i + 5)
            .map(([key, value]) => {
              return (
                <EmployeeDetailField
                  label={key}
                  value={formatValue({ key, value })}
                />
              );
            })}
        </div>
        {i < 10 && <hr />}
      </>
    );
  }

  return <>{cards}</>;
}

export const EmployeeCard = ({ data }: { data: Employee }) => {
  return <div className="employee-card">{GenerateUi(data)}</div>;
};
