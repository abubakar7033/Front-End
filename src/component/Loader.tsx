import { LoaderProps } from '@/type';
import React from 'react';

const Loader: React.FC<LoaderProps> = ({ variant, className }) => {
    if (variant === "threeDot") {
        return (
            <div className="flex justify-center items-center space-x-2">
                <div className="w-3 h-3 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 rounded-full animate-bounce delay-200"></div>
                <div className="w-3 h-3 rounded-full animate-bounce delay-400"></div>
            </div>
        );
    }

    return <div>Loading...</div>;
};

export default Loader;
