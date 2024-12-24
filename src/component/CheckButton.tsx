import { RadioButtonProps } from '@/type';

const CheckBoxButton: React.FC<RadioButtonProps> = ({
    label,
    name,
    value,
    checked,
    onChange,
    color,
    className = '',
    children,
    ...props
}) => {
    return (
        <label
            style={{
                backgroundColor: color,
                border: checked ? '2px solid #4ea8de' : 'transparent',
            }}
            className={`w-4 h-4 mt-1 rounded-full cursor-pointer flex justify-center items-center ${className}`}
        >
            <input
                type="checkbox"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="hidden"
                id={value}
                {...props}
            />
            {children}
        </label>
    );
};

export default CheckBoxButton;


