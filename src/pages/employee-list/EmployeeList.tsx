import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
import { TitleHeader } from "../../components/title-header/TitleHeader";
import "./EmployeeList.css";
import { EmployeeTable } from "./components/EmployeeTable";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { Employee, Status } from "../../store/employee/employee.types";
import { useGetEmployeesQuery } from "../../api-services/employees/employee.api";

export type selectBoxOption = {
  value: string | number;
  label: string;
};

const EmployeeList = () => {
  const statusOptions: selectBoxOption[] = [
    {
      value: "all",
      label: "All",
    },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "probation", label: "Probation" },
  ];

  const { data: employeeList, error, isLoading } = useGetEmployeesQuery();

  console.log("employeeList");

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilterChange(field: string, value: Status | "all") {
    console.log(value);
    if (value === "all") {
      setSearchParams(new URLSearchParams());
      return;
    }
    setSearchParams(new URLSearchParams(`?status=${value}`));
  }

  const status = searchParams.get("status");
  console.log("this sis thec current ", status);

  const handleEditClicked = () => {
    navigate("/employee/create");
  };
  if (error) {
    return <p>An error has occured</p>;
  }
  if (isLoading) {
    return <p>Still Loading the data</p>;
  }
  if (!employeeList) {
    return <p>There is no data to be displayed</p>;
  }
  const filteredEmployees = status
    ? employeeList?.filter(
        (employee: Employee) => employee.status.toLowerCase() === status
      )
    : employeeList;

  return (
    <>
      <TitleHeader
        title="Employee List"
        endAdonment={
          <div className="employee-list-top-action-button">
            <Select
              value={status || "all"}
              //@ts-ignore
              onChange={handleFilterChange}
              label="Filter By"
              selectOptions={statusOptions}
              className="filter-by-select"
            />
            <Button
              key="create-employee"
              text="Create Employee"
              className="create-employee-button"
              onClick={handleEditClicked}
              icon={<div className="plus-icon">+</div>}
            />
          </div>
        }
      />
      <EmployeeTable data={filteredEmployees} />
    </>
  );
};

export default EmployeeList;
