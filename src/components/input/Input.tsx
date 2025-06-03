import "./Input.css";
interface InputProps {
  placeholder: string;
  className?: string;
  type: string;
  value: string | number;
  isLabelled?: boolean;
  isDisabled?: boolean;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}
const Input = ({
  placeholder,
  className,
  value,
  type,
  isLabelled = true,
  isDisabled = false,
  handleChange,
}: InputProps) => {
  return (
    <div className={`input-component ${className}`}>
      {isLabelled && <label>{placeholder}</label>}
      <input
        type={type}
        placeholder={placeholder}
        disabled={isDisabled}
        value={value}
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
};
export default Input;
