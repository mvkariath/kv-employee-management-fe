import "./Button.css";

interface ButtonProps {
  text: string;
  className: string;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const Button = ({
  text,
  className,
  disabled = false,
  onClick,
  icon,
}: ButtonProps) => {
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={"button"}
    >
      {icon && icon}
      {text}
    </button>
  );
};
export default Button;
