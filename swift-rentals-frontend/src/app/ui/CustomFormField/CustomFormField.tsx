import React from "react";

interface InputWithIconProps {
  icon?: React.ElementType;
  placeholder: string;
  errorText: string;
  type: string;
  [key: string]: any;
}

const CustomFormField: React.FC<InputWithIconProps> = ({
  icon: Icon,
  type,
  errorText,
  placeholder,
  ...props
}) => {
  return (
    <div>
      <div className="relative w-full sm:w-3/4">
        <input
          {...props}
          className="border-2 my-0 rounded-full w-full py-2 pl-10"
          type={type}
          placeholder={placeholder}
        />
        {Icon && (
          <Icon
            size={24}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
        )}
      </div>
      <div className="text-red-500 mx-3 mb-2">{errorText}</div>
    </div>
  );
};

export default CustomFormField;
