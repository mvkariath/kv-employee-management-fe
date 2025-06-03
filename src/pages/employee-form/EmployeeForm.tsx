import "./EmployeeForm.css";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Select from "../../components/select/Select";
import AddressForm from "./components/address-form/AddressForm";
import { TitleHeader } from "../../components/title-header/TitleHeader";
import { useEffect, useState } from "react";

import {
  EmployeeRole,
  EmployeeStatus,
  type Employee,
  type Role,
  type Status,
} from "../../store/employee/employee.types";
import {
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetSingleEmployeeQuery,
} from "../../api-services/employees/employee.api";
import type { Department } from "../../api-services/department/types";
import { useGetDepartmentsQuery } from "../../api-services/department/department.api";
import { useLocation, useNavigate } from "react-router-dom";
import { QueryStatus } from "@reduxjs/toolkit/query";
interface EmployeeFormProps {
  context: "create" | "edit";
}
export type selectBoxOption = {
  value: string | number;
  label: string;
};

const statusOptions: selectBoxOption[] = [
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
  { value: "PROBATION", label: "Probation" },
];

export type UserForm = {
  name: string;
  employeeId: string;
  dateOfJoining: string;
  role: Role;
  status: Status;
  email: string;
  experience: number;
  age: number;
  departmentId: number;
  password: string;
  address_line1: string;
  address_line2: string;
  address_pincode: number;
  address_houseNo: number;
};

const EmployeeForm = ({ context = "create" }: EmployeeFormProps) => {
  // const dispatch = useAppDispatch
  const location = useLocation();
  const navigate = useNavigate();

  const [
    addEmployee,
    { isLoading: isCreatingEmployee, status: createEmployeeStatus },
  ] = useCreateEmployeeMutation();
  const [
    editEmployee,
    { isLoading: isUpdatingEmployee, status: updateEmployeeStatus },
  ] = useUpdateEmployeeMutation();
  const { data: departmentList } = useGetDepartmentsQuery();
  const { data: employee } = useGetSingleEmployeeQuery(
    location.pathname.split("/").slice(-1)[0],
    {
      skip: context === "create" ? true : false,
    }
  );
  const user_id = location.pathname.split("/").slice(-1)[0];
  console.log("this is the employee", user_id);
  const departmentOptions = departmentList?.map((department: Department) => {
    return {
      label: department.name,
      value: department.id,
    };
  });

  const [userForm, setUserForm] = useState<UserForm>({
    name: "",
    employeeId: "",
    dateOfJoining: "",
    role: EmployeeRole.HR,
    status: EmployeeStatus.ACTIVE,
    email: "",
    experience: 0,
    age: 0,
    departmentId: 1,
    password: "",
    address_line1: "",
    address_line2: "",
    address_pincode: 0,
    address_houseNo: 0,
  });
  function handleChange(field: string, value: string | number) {
    console.log("we are changing");
    console.log(field);
    console.log(value);
    setUserForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }
  console.log("this is the staus of the request", updateEmployeeStatus);

  async function handleSubmit() {
    const samplePayload: Partial<Employee> = {
      name: userForm.name,
      employeeId: userForm.employeeId,
      dateOfJoining: userForm.dateOfJoining,
      role: userForm.role,
      status: userForm.status,
      email: userForm.email,
      experience: userForm.experience,
      age: userForm.age,
      department_id: userForm.departmentId,
      password: userForm.password,
      address: {
        houseNo: userForm.address_houseNo,
        line1: userForm.address_line1,
        line2: userForm.address_line2,
        pincode: userForm.address_pincode,
      },
    };
    if (context === "create") {
      await addEmployee(samplePayload as Employee);
    } else if (context === "edit") {
      await editEmployee({
        user_id: employee?.id || "-1",
        employee: samplePayload as Employee,
      });
    }
    navigate("/employee");
    console.log("this is hte payload", samplePayload);
  }
  useEffect(() => {
    if (context == "edit") {
      console.log("from te=he useEffect:", employee);
      setUserForm({
        name: employee?.name || "",
        employeeId: employee?.employeeId || "100",
        dateOfJoining: employee?.dateOfJoining || "",
        role: employee?.role || EmployeeRole.HR,
        status: employee?.status || EmployeeStatus.PROBATION,
        email: employee?.email || "",
        experience: employee?.experience || 0,
        age: employee?.age || 0,
        //@ts-ignore
        departmentId: employee?.department.id || 1,
        password: "",
        address_line1: employee?.address.line1 || "",
        address_line2: employee?.address.line2 || "",
        address_pincode: employee?.address.pincode || -1,
        address_houseNo: employee?.address.houseNo || -1,
      });
    } else {
      setUserForm({
        name: "",
        employeeId: "",
        dateOfJoining: "",
        role: EmployeeRole.HR,
        status: EmployeeStatus.ACTIVE,
        email: "",
        experience: 0,
        age: 0,
        departmentId: 1,
        password: "",
        address_line1: "",
        address_line2: "",
        address_pincode: 0,
        address_houseNo: 0,
      });
    }
  }, [employee, location]);
  useEffect(() => {
    if (
      updateEmployeeStatus === QueryStatus.fulfilled ||
      createEmployeeStatus === QueryStatus.fulfilled
    )
      navigate(-1);
  }, [updateEmployeeStatus, createEmployeeStatus]);

  return (
    <>
      <section className="form-header">
        <TitleHeader
          title={`${context === "create" ? "Create" : "Edit"} Employee`}
        />
      </section>
      <section>
        <form className="employee-form">
          <div className="employee-form-input-container">
            <Input
              placeholder="Employee Name"
              type="text"
              value={userForm.name}
              handleChange={(event) => {
                handleChange("name", event.target.value);
              }}
            />
            <Input
              placeholder="Employee ID"
              type="text"
              isDisabled={context === "edit"}
              value={userForm.employeeId}
              handleChange={(event) => {
                handleChange("employeeId", event.target.value);
              }}
            />
            <Input
              placeholder="Joining Date"
              type="date"
              value={userForm.dateOfJoining.slice(0, 10)}
              handleChange={(event) => {
                handleChange("dateOfJoining", event.target.value);
              }}
            />
            <Input
              placeholder="Email"
              type="email"
              value={userForm.email}
              handleChange={(event) => {
                handleChange("email", event.target.value);
              }}
            />
            <Input
              placeholder="Age"
              type="number"
              value={userForm.age}
              handleChange={(event) => {
                handleChange("age", parseInt(event.target.value));
              }}
            />
            {context !== "edit" && (
              <Input
                placeholder="Password"
                type="text"
                value={userForm.password}
                handleChange={(event) => {
                  handleChange("password", event.target.value);
                }}
              />
            )}
            <Select
              label="Department"
              selectOptions={departmentOptions || [{ label: "HR", value: 1 }]} // this is afall back that is added in case there are no options
              value={userForm.departmentId}
              onChange={handleChange}
            />
            <Select
              label="Status"
              selectOptions={statusOptions}
              value={userForm.status}
              onChange={handleChange}
            />
            <Input
              placeholder="Experience(yrs)"
              type="number"
              value={userForm.experience}
              handleChange={(event) => {
                handleChange("experience", parseInt(event.target.value));
              }}
            />
            <AddressForm userForm={userForm} setUserForm={setUserForm} />
          </div>
          <div className="button-group">
            <button
              className="create-button"
              onClick={handleSubmit}
              disabled={isUpdatingEmployee || isCreatingEmployee}
              type="button"
            >
              {context === "edit" ? "Save" : "Create"}
              {isCreatingEmployee || isUpdatingEmployee ? "..." : ""}
            </button>

            <Button className="cancel-button" text="Cancel" />
          </div>
        </form>
      </section>
    </>
  );
};

export default EmployeeForm;
