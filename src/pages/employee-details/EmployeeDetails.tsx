import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
import { TitleHeader } from "../../components/title-header/TitleHeader";
import "./EmployeeList.css";
import { EmployeeCard } from "./components/EmployeeCard";
import type { UserDetails } from "../../types/employee.type";
import { useGetSingleEmployeeQuery } from "../../api-services/employees/employee.api";

export type selectBoxOption = {
  value: string;
  label: string;
};

const EmployeeDetails = () => {
  const statusOptions: selectBoxOption[] = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "probation", label: "Probation" },
  ];
  //const [employee, setEmployee] = useState<UserDetails>();
  const { data: employee } = useGetSingleEmployeeQuery(
    location.pathname.split("/").slice(-1)[0]
  );
  console.log(employee);
  // const [isLoading, setisLoading] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setisLoading(true);
  //     setEmployee(dummyUser);
  //   }, 2000);
  // }, []);
  if (!employee) return <>there are no employee to display</>;
  return (
    <>
      <TitleHeader
        title="Employee Details"
        endAdonment={
          <div className="employee-list-top-action-button">
            <Button
              text="Edit Employee"
              className="create-employee-button"
              icon={<div className="plus-icon">E</div>}
            />
          </div>
        }
      />
      <EmployeeCard data={employee} />
    </>
  );
};

export default EmployeeDetails;
