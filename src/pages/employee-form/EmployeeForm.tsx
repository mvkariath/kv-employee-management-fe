import "./EmployeeForm.css";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Select from "../../components/select/Select";
import AddressForm from "./components/address-form/AddressForm";
import { TitleHeader } from "../../components/title-header/TitleHeader";
import { useParams } from "react-router-dom";
interface EmployeeFormProps {
  context: "create" | "edit";
}
export type selectBoxOption = {
  value: string;
  label: string;
};
const departmentOptions: selectBoxOption[] = [
  { value: "UI", label: "UI" },
  { value: "UX", label: "UX" },
  { value: "DEV", label: "Developer" },

  { value: "HR", label: "HR" },
];
const statusOptions: selectBoxOption[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "probation", label: "Probation" },
];

const EmployeeForm = ({ context = "create" }: EmployeeFormProps) => {
  const { id } = useParams();
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
            <Input placeholder="Employee Name" type="text" />

            <Input
              placeholder="Employee ID"
              type="text"
              isDisabled={context === "edit"}
            />

            <Input placeholder="Joining Date" type="date" />

            <Select label="Department" selectOptions={departmentOptions} />

            <Select label="Status" selectOptions={statusOptions} />

            <Input placeholder="Experience(yrs)" type="number" />

            <AddressForm />
          </div>
          <div className="button-group">
            <Button
              className="create-button"
              text={context === "edit" ? "Save" : "Create"}
            />

            <Button className="cancel-button" text="Cancel" />
          </div>
        </form>
      </section>
    </>
  );
};

export default EmployeeForm;
