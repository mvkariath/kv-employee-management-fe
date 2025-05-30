import Input from "../../../../components/input/Input"
import "./AddressForm.css"
const AddressForm = () =>{
    return(
        <div className="address-form">
            <div className="input-component">
                <label>Address</label>
            </div>
            <Input placeholder="House No" type="text" isLabelled={false}/>
            <Input placeholder="Line 1" type="text" isLabelled={false}/>
            <Input placeholder="Line 2" type="text" isLabelled={false}/>
        </div> 
    )
}
export default AddressForm;