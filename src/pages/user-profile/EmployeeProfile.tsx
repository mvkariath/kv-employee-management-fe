import Button from "../../components/button/Button";
import { TitleHeader } from "../../components/title-header/TitleHeader";
import "./EmployeeList.css";
import { useNavigate } from "react-router-dom";
import { EmployeeCard } from "../employee-details/components/EmployeeCard";
import { jwtDecode } from "jwt-decode";
import { useGetSingleEmployeeQuery } from "../../api-services/employees/employee.api";

export type selectBoxOption = {
  value: string;
  label: string;
};

const EmployeeProfile = () => {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("token");

  const { id } = jwtDecode(access_token || "");
  // console.log(us, "form the profile");
  const { data: employee } = useGetSingleEmployeeQuery(id);
  if (!employee) return <>there are no employee to display</>;
  return (
    <>
      <TitleHeader
        title={`${employee.name}'s Profile`}
        endAdonment={
          <div className="employee-list-top-action-button">
            <Button
              key="edit-employee"
              text="Edit Profile"
              className="create-employee-button"
              icon={
                <div className="plus-icon">
                  <img src="/assets/edit.png" />
                </div>
              }
              onClick={() => {
                navigate(`/employee/edit/${id}`);
              }}
            />
          </div>
        }
      />
      <div className="profile-image-container">
        <img src="/assets/profile.jpeg"></img>
        <div className="profile-main-details">
          <h1>{employee.name}</h1>
          <p>{employee.role}</p>
        </div>
      </div>
      <EmployeeCard data={employee} />
    </>
  );
};

export default EmployeeProfile;
