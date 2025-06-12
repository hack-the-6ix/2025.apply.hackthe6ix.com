import React from "react";
import Text from "../Text/Text";
import Input from "../Input/Input";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundColor?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  onChange,
  backgroundColor = "#475D7B",
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Text
        textType="paragraph-sm"
        textFont="rubik"
        textColor="white"
        className="ml-[10px]"
      >
        {label}
        {required && "*"}
      </Text>
      <Input
        backgroundColor={backgroundColor}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
