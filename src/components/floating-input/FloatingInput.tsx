import { useEffect, useState } from "react";
import "./FloatingInput.css";

interface InputProps {
  placeholder: string;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  inputChecker: (value: string) => { isInvalid: boolean; limit: number };
  ref?: React.RefObject<HTMLInputElement | null>;
  endAdonment: React.ReactNode;
}

const FloatingInput = ({
  placeholder,
  type,
  onChange,
  value,
  inputChecker,
  ref,
  endAdonment,
}: InputProps) => {
  const [inputError, setInputError] = useState(false);
  const [inputErrorMessage, setInputErrorMessage] = useState(0);

  useEffect(() => {
    const result = inputChecker(value);
    console.log(result);
    setInputErrorMessage(result.limit);
    if (result.isInvalid) setInputError(true);

    return () => {
      console.log(inputError); // this will get executed after the new useEffect has been called
      setInputError(false);
    };
  }, [value]);

  return (
    <>
      <label className="float-input-box" id="floating-input">
        <input
          ref={ref}
          type={type}
          id="name"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          aria-label="Username"
        />
        <span>{placeholder}</span>

        {endAdonment && endAdonment}
      </label>
      {inputError && (
        <p className="input-error">
          The {placeholder} has exceeded {inputErrorMessage} charas
        </p>
      )}
    </>
  );
};

export default FloatingInput;
