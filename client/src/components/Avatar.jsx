import React, { useState } from 'react';
import { User, LogOut, Settings, Bell, ChevronRight, Mail, Shield, Heart, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContexts';
import { X, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import UserImage from '../assets/profile3.png'

const Avatar = ({ userData }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [open, setOpen] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    if (!userData) return null;

    const handleLogout = () => {
        setShowConfirm(true);
        setOpen(false);
    };

    const confirmLogout = () => {
        setIsLoading(true); // ✅ Trigger loading state

        // Simulate async logout or handle it
        setTimeout(() => {
            // logout(); // <- your actual logout function from context
            logout();
            navigate('/');
        }, 1500); // Optional delay for demonstration
    };

    const cancelLogout = () => {
        setShowConfirm(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="relative w-12 h-12 bg-white border-none rounded-full cursor-pointer transition-all shadow-md overflow-hidden hover:opacity-90"
            >
                <img
                    src={userData.picture || UserImage}
                    alt={`${userData.userName !== "" ? userData.userName : "User Name"}'s Profile`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                />
            </button>

            {open && (
                <div className="absolute right-0 top-16 w-80 h-80 bg-black from-black via-zinc-900/30 to-zinc-800/30 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden z-[1000] animate-slideIn">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full">
                    </div>

                    {/* Header */}
                    <div className="relative p-4 bg-zinc-900/80 border-b border-white/10">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg border-3 border-white/20 bg-gradient-to-br from-zinc-700 to-zinc-600 p-1">
                                    <img
                                        src={userData.picture || UserImage}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "./assets/user.png";
                                        }}
                                        alt={`${userData.userName !== "" ? userData.userName : "User Name"}'s Profile`}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl text-white font-medium bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                        {userData.userName !== "" ? userData.userName : "User Name"}
                                    </h3>
                                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                </div>
                                <p className="text-sm text-gray-400 mb-2">{userData.email !== "" ? userData.email : "User Email"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu */}
                    <div className="py-3 relative">
                        <Link to="/profile" onClick={() => setOpen(!open)} state={userData} className="group flex items-center px-8 py-4 hover:bg-zinc-900 transition-all duration-300 border-b border-white/10">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-zinc-800/40 mr-4 group-hover:bg-zinc-700/40 transition-colors shadow-sm">
                                <User size={20} className="text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-md text-white">Your Profile</div>
                                <div className="text-xs text-gray-400">Manage your account</div>
                            </div>
                            <ChevronRight size={16} className="text-gray-500 transition-all group-hover:translate-x-1" />
                        </Link>

                        {/* Divider */}
                        <div className="my-4 mx-8 relative">
                            <div className="border-t border-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-6 h-6 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-full border border-white/10 shadow-sm"></div>
                            </div>
                        </div>

                        {/* Logout */}
                        <a href="/" onClick={(e) => { e.preventDefault(); handleLogout(); }} className="group flex items-center px-8 py-4 hover:bg-zinc-900 transition-all duration-300 border-b border-white/10">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-zinc-800/40 mr-4 group-hover:bg-zinc-700/40 transition-colors shadow-sm">
                                <LogOut size={20} className="text-red-500" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm text-white">Log Out</div>
                                <div className="text-xs text-gray-400">Log out of account</div>
                            </div>
                            <ChevronRight size={16} className="text-gray-500 transition-all group-hover:translate-x-1" />
                        </a>
                    </div>

                    {/* Bottom Decoration */}
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-900"></div>
                </div>

            )}

            {open && (
                <div
                    className="fixed inset-0 z-[999]"
                    onClick={() => setOpen(false)}
                ></div>
            )}

            {/* Logout Confirmation Modal */}
            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
                    {/* Fixed backdrop with subtle spotlight */}
                    <div
                        className="absolute inset-0 backdrop-blur-sm"
                        onClick={cancelLogout}
                        style={{
                            background: 'radial-gradient(circle at center, rgba(0,0,0,0.1), rgba(0,0,0,0.5))'
                        }}
                    />

                    {/* Glassmorphic Modal */}
                    <div className="relative bg-black border border-white/10 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-500 overflow-hidden">
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-indigo-500/10 rounded-3xl blur-sm pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={cancelLogout}
                            disabled={isLoading}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100/80 hover:bg-gray-200/80 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl hover:scale-110 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <X size={18} />
                        </button>

                        {/* Content */}
                        <div className="relative p-10 text-center">
                            {/* Animated background circles */}
                            <div className="relative w-20 h-20 mx-auto mb-8">
                                <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse" />
                                <div className="relative w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center border border-white/10 shadow-xl">
                                    <LogOut size={32} className="text-blue-500" />
                                </div>
                            </div>
                            {/* Message */}
                            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                                Are you sure you want to Log Out ?
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={cancelLogout}
                                    disabled={isLoading}
                                    className="flex-1 px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl hover:scale-105 border border-white/10"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={confirmLogout}
                                    disabled={isLoading}
                                    className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 relative overflow-hidden"
                                >
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />

                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                                            <span className="whitespace-nowrap">Logout...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <LogOut size={18} className="relative" />
                                            <span className="relative">Logout</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Bottom glow */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-sm" />
                    </div>
                </div>
            )}


        </div>
    );
};

export default Avatar;