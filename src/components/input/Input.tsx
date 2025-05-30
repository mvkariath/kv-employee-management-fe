import "./Input.css";
interface InputProps {
  placeholder: string;
  className?: string;
  type: string;
  isLabelled?: boolean;
  isDisabled?: boolean;
}
const Input = ({
  placeholder,
  className,
  type,
  isLabelled = true,
  isDisabled = false,
}: InputProps) => {
  return (
    <div className={`input-component ${className}`}>
      {isLabelled && <label>{placeholder}</label>}
      <input type={type} placeholder={placeholder} disabled={isDisabled} />
    </div>
  );
};
export default Input;
