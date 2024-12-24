import { InputProps } from "@/type";

const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
    return (
        <>
            {label && (
                <label className="mb-2 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                className={`px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                {...props}
            />
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </>

    );
};

export default Input;
