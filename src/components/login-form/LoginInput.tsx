interface LoginInputProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.RefObject<HTMLInputElement | null>;
  endAdornment?: React.ReactNode;
}

const LoginInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  endAdornment = null,
  ref,
}: LoginInputProps) => {
  return (
    <div className="form-input">
      <input
        type={type}
        value={value}
        ref={ref}
        onChange={onChange}
        id={id}
        placeholder=" "
        required
      />
      <label htmlFor={id}>{label}</label>
      {endAdornment ? endAdornment : null}
    </div>
  );
};

export default LoginInput;
