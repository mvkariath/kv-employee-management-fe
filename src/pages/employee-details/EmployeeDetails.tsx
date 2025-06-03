import Button from "../../components/button/Button";
import { TitleHeader } from "../../components/title-header/TitleHeader";
import "./EmployeeList.css";
import { useNavigate } from "react-router-dom";
import { EmployeeCard } from "./components/EmployeeCard";
import { useGetSingleEmployeeQuery } from "../../api-services/employees/employee.api";

export type selectBoxOption = {
  value: string;
  label: string;
};

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const employee_id = location.pathname.split("/").slice(-1)[0];
  const { data: employee } = useGetSingleEmployeeQuery(employee_id);
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
              icon={
                <div className="plus-icon">
                  <img src="/assets/edit.png" />
                </div>
              }
              onClick={() => {
                navigate(`/employee/edit/${employee_id}`);
              }}
            />
          </div>
        }
      />
      <EmployeeCard data={employee} />
    </>
  );
};

export default EmployeeDetails;
