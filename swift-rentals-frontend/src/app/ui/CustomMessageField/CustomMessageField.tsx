import React from "react";

interface InputWithIconProps {
  icon?: React.ElementType;
  iconOnClick: () => void;
  placeholder: string;
  type: string;
  [key: string]: any;
}

const CustomMessageField: React.FC<InputWithIconProps> = ({
  icon: Icon,
  type,
  onClick,
  iconOnClick,
  placeholder,
  ...props
}) => {
  function isEnterPressed(event) {
    if (event.keyCode == 13) {
      iconOnClick();
    }
  }
  return (
    <div>
      <div className="relative w-full px-2 py-1">
        <input
          {...props}
          className="border-2 my-0 rounded-full w-full py-1 pl-10"
          type={type}
          onKeyUp={isEnterPressed}
          placeholder={placeholder}
        />
        {Icon && (
          <Icon
            onClick={iconOnClick}
            size={24}
            className="absolute right-5 top-1/2 transform -translate-y-1/2"
          />
        )}
      </div>
    </div>
  );
};

export default CustomMessageField;
