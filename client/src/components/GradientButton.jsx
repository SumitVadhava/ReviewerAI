import React from "react";
import { clsx } from "clsx";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const GradientButton = ({ text, padding, isArrow, to, newTab = false }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (newTab) {
            window.open(to, '_blank', 'noopener,noreferrer');
        } else {
            navigate(to);
        }
    }

    return (
        <div className="relative group">
            <button
                onClick={handleClick}
                className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-600 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
            >
                {/* Gradient border background */}
                <span
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                ></span>

                {/* Actual button content */}
                {/* <span className={clsx("relative z-10 block py-3 rounded-xl bg-gray-950", padding)}>
                    <div className="relative z-10 flex items-center space-x-2">
                        <span className="transition-all duration-500 group-hover:translate-x-1 font-lexend">
                            {text}
                        </span>
                        {!isArrow && <svg
                            className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                clipRule="evenodd"
                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                fillRule="evenodd"
                            />
                        </svg>}
                        {isArrow && <GoArrowUpRight className='text-2xl' />}
                    </div>
                </span> */}
                <span className={clsx("relative z-10 block py-3 rounded-xl bg-gray-950", padding)}>
                    <div className="relative z-10 flex items-center space-x-2 group">
                        <span className="transition-all duration-500 group-hover:translate-x-1 font-lexend">
                            {text}
                        </span>

                        {!isArrow && (
                            <svg
                                className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                    fillRule="evenodd"
                                />
                            </svg>
                        )}

                        {isArrow && (
                            <GoArrowUpRight
                                className="text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />
                        )}
                    </div>
                </span>
            </button>
        </div>

    );
};

export default GradientButton;