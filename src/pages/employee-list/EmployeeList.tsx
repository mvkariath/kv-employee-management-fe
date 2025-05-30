import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
import { TitleHeader } from "../../components/title-header/TitleHeader";
import "./EmployeeList.css";
import { EmployeeTable } from "./components/EmployeeTable";
import type { UserDetails } from "../../types/employee.type";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export type selectBoxOption = {
  value: string;
  label: string;
};

const dummyUsers: UserDetails[] = [
  {
    employee_name: "mathew",
    employee_id: "EMP123",
    joining_date: "2025-05-23T05:22:11.080Z",
    role: "HR",
    status: "ACTIVE",
    experience: "10",
    email: "test",
  },
  {
    employee_name: "mathew1",
    employee_id: "EMP123",
    joining_date: "2025-05-23T05:22:11.080Z",
    role: "HR",
    status: "INACTIVE",
    experience: "10",
    email: "test",
  },
  {
    employee_name: "newww",
    employee_id: "EMP123",
    joining_date: "2025-05-23T05:22:11.080Z",
    role: "HR",
    status: "PROBATION",
    experience: "10",
    email: "test",
  },
];

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
  const [employeeList, setEmployeeList] = useState<UserDetails[]>([]);
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleFilterChange(
    value: "active" | "inactive" | "probation" | "all"
  ) {
    if (value === "all") {
      setSearchParams(new URLSearchParams());
      return;
    }
    setSearchParams(new URLSearchParams(`?status=${value}`));
  }

  useEffect(() => {
    setTimeout(() => {
      setisLoading(true);
      setEmployeeList(dummyUsers);
    }, 1);
  }, []);

  const status = searchParams.get("status");
  console.log(status);
  const filteredEmployees = status
    ? employeeList.filter(
        (employee) => employee.status.toLowerCase() === status
      )
    : employeeList;

  const handleEditClicked = () => {
    navigate("/create");
  };
  if (isLoading && !employeeList.length)
    return <>there are no employee to display</>;
  return (
    <>
      <TitleHeader
        title="Employee List"
        endAdonment={
          <div className="employee-list-top-action-button">
            <Select
              value={status || "all"}
              onChange={handleFilterChange}
              label="Filter By"
              selectOptions={statusOptions}
              className="filter-by-select"
            />
            <Button
              text="Create Employee"
              className="create-employee-button"
              onClick={handleEditClicked}
              icon={
                <Link to="create" className="plus-icon">
                  +
                </Link>
              }
            />
          </div>
        }
      />
      <EmployeeTable data={filteredEmployees} />
    </>
  );
};

export default EmployeeList;
