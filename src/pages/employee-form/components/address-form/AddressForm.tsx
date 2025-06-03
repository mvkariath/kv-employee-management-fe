import Input from "../../../../components/input/Input";
import type { UserForm } from "../../EmployeeForm";
import "./AddressForm.css";
const AddressForm = ({
  userForm,
  setUserForm,
}: {
  userForm: UserForm;
  setUserForm: React.Dispatch<React.SetStateAction<UserForm>>;
}) => {
  function handleChange(field: string, value: string | number) {
    setUserForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }
  return (
    <div className="address-form">
      <div className="input-component">
        <label>Address</label>
      </div>
      <Input
        placeholder="House No"
        type="text"
        value={userForm.address_houseNo}
        isLabelled={false}
        handleChange={(event) => {
          handleChange("address_houseNo", event.target.value);
        }}
      />
      <Input
        placeholder="Line 1"
        type="text"
        value={userForm.address_line1}
        isLabelled={false}
        handleChange={(event) => {
          handleChange("address_line1", event.target.value);
        }}
      />
      <Input
        placeholder="Line 2"
        type="text"
        value={userForm.address_line2}
        isLabelled={false}
        handleChange={(event) => {
          handleChange("address_line2", event.target.value);
        }}
      />
      <Input
        placeholder="Pincode"
        type="number"
        value={userForm.address_pincode}
        isLabelled={false}
        handleChange={(event) => {
          handleChange("address_pincode", event.target.value);
        }}
      />
    </div>
  );
};
export default AddressForm;
