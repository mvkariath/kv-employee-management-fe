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
  disabled = true,
  onClick,
  icon,
}: ButtonProps) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {icon && icon}
      {text}
    </button>
  );
};
export default Button;
