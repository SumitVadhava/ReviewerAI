import React, { useEffect, useState } from 'react'
import logo from '../assets/logo_4.png'
// import { GoArrowUpRight } from "react-icons/go";
import StorySet1 from '../assets/home_story_set1.png';
import StorySetVideo from '../assets/v2.mp4';
import PageEditPng from '../assets/page_edit.png'
import Tick from '../assets/tick_cards.png'
import Robot from '../assets/robot_cards.png'
import Down from '../assets/down_cards.png'
import { useNavigate } from 'react-router-dom';
import GradientButton from '../components/GradientButton';
import GoogleOneTapLogin from '../components/GoogleOneTap';
import { useAuth } from './../context/AuthContext';


const HomePage = () => {
    const navigate = useNavigate();
    const [showGoogleOneTap, setShowGoogleOneTap] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated()) {
            setShowGoogleOneTap(false);
            if (window.google?.accounts?.id) {
                window.google.accounts.id.cancel(); // 🔥 This cancels the prompt
            }
            console.log(isAuthenticated);
            
        }
        else {
            setShowGoogleOneTap(true);
            console.log(isAuthenticated);
        }
    }, [isAuthenticated()]);
    return (
        <>
            {!isAuthenticated() && <GoogleOneTapLogin />}
            <div className='max-w-[1350px] mx-auto flex-grow'>

                <div className='flex flex-row justify-between items-center mt-9'>
                    <div className='flex flex-col gap-8 max-w-4xl p-4'>
                        <h3 className='text-white font-lexend text-[45px] font-medium'>Your AI Assistant for
                            Code Review</h3>
                        <p className='text-white font-lexend  text-xl font-medium'>Write Code, upload Codes , brains form and explore
                            with a powerful conversational AI.</p>
                        <div className='w-full flex gap-10'>
                            {/* <button onClick={() => navigate('/overview')} className='flex gap-3 items-center font-lexend text-center text-white text-xl font-medium bg-[#2C2C2C] px-6 py-3 group'>
                                Try Now
                                <GoArrowUpRight className='text-3xl' />
                            </button> */}
                            <GradientButton text='Try Now' padding='px-6 py-4' isArrow={true} to='/overview' />
                            <GradientButton text='Watch Demo' padding='px-6 py-4' to={'https://www.youtube.com/@ReviewerAi-1.0'} newTab={true} />
                            {/* <button className='font-lexend text-center text-white text-xl font-medium bg-gray-950 border border-white px-6 py-3'>
                                Watch Demo
                            </button>    */}
                        </div>
                    </div>
                    <div>
                        <video autoPlay loop muted playsinline>
                            <source src={StorySetVideo} type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div>
                    <h1 className='text-white font-lexend font-medium text-[45px] max-w-4xl mb-14'>What You Can Do ?</h1>
                    <div className='flex flex-row justify-between'>
                        <div className='w-[18rem] h-[21rem] bg-white flex flex-col gap-4 items-center p-5 rounded-lg'>
                            <img src={PageEditPng} alt="" className='w-[107px] h-[107px]' />
                            <h3 className='text-2xl font-medium'>Write or Upload Code</h3>
                            <p className='text-center text-base'>
                                Write your code in the editor or upload a file to get instant feedback and suggestions.
                            </p>
                        </div>
                        <div className='w-[18rem] h-[21rem] bg-white flex flex-col gap-4 items-center p-5 rounded-lg'>
                            <img src={Tick} alt="" className='w-[107px] h-[107px]' />
                            <h3 className='text-2xl font-medium'>Selected Review Type</h3>
                            <p className='text-center text-base'>
                                Select the kind of code review you want: general feedback, performance review, maintainability check, security scan, or more.
                            </p>
                        </div>
                        <div className='w-[18rem] h-[21rem] bg-white flex flex-col gap-4 items-center p-5 rounded-lg'>
                            <img src={Robot} alt="" className='w-[107px] h-[107px]' />
                            <h3 className='text-2xl font-medium'>AI-Powered Review</h3>
                            <p className='text-center text-base'>
                                Our AI analyzes your code and provides smart insights: time & space complexity, edge case coverage, refactoring tips, and standard violations.

                            </p>
                        </div>
                        <div className='w-[18rem] h-[21rem] bg-white flex flex-col gap-4 items-center p-5 rounded-lg'>
                            <img src={Down} alt="" className='w-[107px] h-[107px]' />
                            <h3 className='text-2xl font-medium'>Download & Share</h3>
                            <p className='text-center text-base'>
                                Easily download your review as a report or share it with teammates. Improve collaboration by sharing precise, structured feedback.
                            </p>
                        </div>
                    </div>
                </div>
                <footer className='pb-4 max-w-7xl mx-auto w-full'>
                    <hr className="my-6 border border-purple-400 opacity-50 w-full mx-auto rounded-md" />
                    <div className='text-white'>
                        © 2025 ReviewerAI. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    )
}

export default HomePage