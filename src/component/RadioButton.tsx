import { RadioButtonProps } from '@/type';
import React, { ReactNode } from 'react';



const RadioButton: React.FC<RadioButtonProps> = ({
    label,
    name,
    value,
    checked,
    onChange,
    color,
    className = '',
    children
}) => {
    return (
        <label
            style={{
                backgroundColor: color,
                border: checked ? '2px solid white' : 'transparent',
            }}
            className={`w-12 h-12 rounded-full cursor-pointer flex justify-center items-center ${className}`}
        >
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                style={{ display: 'none' }}
                id={value}
            />
            <span className="custom-radio" />
            {label && <span className="text-white ml-2">{label}</span>}
            {children}
        </label>
    );
};

export default RadioButton;
