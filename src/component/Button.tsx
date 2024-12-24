import { ButtonProps } from "@/type";

const Button: React.FC<ButtonProps> = ({ text, onClick, className, disabled, children, type, ...props }) => {
    return (
        <button
            type='submit'
            className={`px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children || text}
        </button>
    );
};

export default Button;
