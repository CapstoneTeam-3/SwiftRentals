"use client"
import { useState } from "react";
import { TiTick } from "react-icons/ti";
import { IoChevronDown } from "react-icons/io5";
interface Option {
    value: string;
    label: string;
}

interface DropdownProps {
    label: String;
    options: Option[];
    onChange: (selectedOption: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange(option);
    };

    return (
        <div className="relative">
            <button
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedOption ? selectedOption.label : label}
                <IoChevronDown className="ms-3" />
            </button>

            {isOpen && (
                <div className="absolute mt-3 bg-white shadow-lg rounded-md">
                    <ul
                        className="py-1 rounded-md shadow-xs max-h-60"
                        tabIndex={-1}
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-option-3"
                    >
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className="flex items-center justify-between text-gray-900 cursor-pointer select-none relative py-2 px-3"
                                onClick={() => handleOptionClick(option)}
                            >
                                <span
                                    className={`me-2 ${selectedOption && selectedOption.value === option.value
                                        ? 'font-semibold'
                                        : 'font-normal'
                                        } block truncate`}
                                >
                                    {option.label}
                                </span>
                                {selectedOption && selectedOption.value === option.value && (
                                    <TiTick className="ms-2" />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;