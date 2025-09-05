import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import FileImg from '../assets/file.png'
import { useNavigate } from 'react-router-dom';
import './../index.css';

const Overview = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className='max-w-7xl mx-auto flex flex-col gap-8'>
                <div className='flex flex-col gap-3 items-center w-full text-white p-6'>
                    <div className="flex items-center">
                        <h1 className="text-4xl font-bold">Welcome to Code Reviewer</h1>
                        <div className="flex items-center space-x-2">
                            <span className="text-4xl animate-wave origin-[70%_70%] inline-block">
                                👋
                            </span>
                        </div>
                    </div>
                    <p className="text-blue-400 text-[20px] mt-1">Ready to review your code</p>
                    <p className="text-gray-400 text-sm mt-2 italic">
                        "Clean code always looks like it was written by someone who cares." — Robert C. Martin
                    </p>
                    <h2 className="text-white mt-6 text-2xl font-bold">How would you like to get your code reviewed ?</h2>
                </div>
                <div className='flex justify-center w-full gap-10'>
                    <div className="group max-w-[400px] rounded-md p-[2px] cursor-pointer" onClick={() => navigate('/onlineCompiler')}>
                        <div className="flex flex-col gap-3 items-center bg-[#00020b] rounded-md p-7 border border-gray-500 z-10 
                group-hover:scale-105 transition-all duration-500 ease-in-out 
                group-hover:border-blue-500 
                group-hover:shadow-[0_0_10px_5px_rgba(29,146,237,0.6)] 
                group-hover:blur-[0.5px]">
                            <FontAwesomeIcon icon={faCode} style={{ color: "#1d92ed" }} size="2x" />

                            <h1 className="text-white mt-6 text-2xl font-bold">Use Live Code Editor</h1>

                            <p className="text-gray-400 text-sm mt-2 text-center">
                                Paste or write your code directly in our live code editor
                                and get instant feedback.
                            </p>
                        </div>
                    </div>
                    <div className="group max-w-[400px] rounded-md p-[2px] cursor-pointer" onClick={() => navigate('/upload')}>
                        <div className="flex flex-col gap-3 items-center bg-[#00020b] rounded-md p-7 border border-gray-500 z-10 
                group-hover:scale-105 transition-all duration-500 ease-in-out 
                group-hover:border-blue-500 
                group-hover:shadow-[0_0_10px_5px_rgba(29,146,237,0.6)] 
                group-hover:blur-[0.5px]">
                            {/* <FontAwesomeIcon icon={faCode} style={{ color: "#1d92ed" }} size="2x" /> */}
                            <img src={FileImg} alt="" className='w-10' />

                            <h1 className="text-white mt-4 text-2xl font-bold">Upload a Code file</h1>

                            <p className="text-gray-400 text-sm mt-2 text-center">
                                Upload your code file (.js, -py, Java, etc.) and we'll review it for you.
                            </p>
                        </div>
                    </div>
                    
                </div>
                <div className='flex flex-col items-center'>
                    <p className='text-gray-400 text-sm  text-center max-w-2xl'>
                        Our AI-powered code reviewer provides instant feedback, suggestions, and improvements to help you write cleaner, more efficient code.
                    </p>
                </div>
                <footer className='pb-4 max-w-7xl mx-auto w-full'>
                    <hr className="my-5 border border-purple-400 opacity-50 w-full mx-auto rounded-md" />
                    <div className='text-white'>
                        © 2025 ReviewerAI. All rights reserved.
                    </div>
                </footer> 
            </div>
        </div>
    )
}

export default Overview