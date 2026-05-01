import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo_4.png';
import drawer from '../assets/drawer.png';
import NewChat from '../assets/new_chat.png';
import SearchChat from '../assets/search.png';
import Library from '../assets/library.png';
import History_icon from '../assets/history_icon.png';
import upload from '../assets/upload.png';
import Tempchat from '../assets/temp_chat3.png';
import Tempchat2 from '../assets/temp_chat5.png';
import Profile_img from '../assets/profile3.png';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Component for uploading a code file and selecting review categories.
 */
const UploadFile = ({ userData }) => {
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [isTempChatActive, setIsTempChatActive] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null); // Store File object and metadata
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedModel, setSelectedModel] = useState(''); // Track selected model
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Toggle dropdown
    const dropdownRef = useRef(null);
    const [history, setHistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);

    // Load history from API on mount
    useEffect(() => {
        const fetchHistory = async () => {
            if (!userData?.email) return;
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/history/${userData.email}`);
                setHistory(response.data);

                // Optional: Sync local history to DB if it exists
                const localHistory = localStorage.getItem('reviewHistory');
                if (localHistory) {
                    const parsedLocal = JSON.parse(localHistory);
                    if (parsedLocal.length > 0) {
                        for (const item of parsedLocal) {
                            // Check if already in fetched history to avoid duplicates
                            if (!response.data.some(h => h.filename === item.filename && h.createdAt === item.createdAt)) {
                                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/history`, {
                                    userEmail: userData.email,
                                    filename: item.filename,
                                    categories: item.categories,
                                    model: item.model,
                                    reviewContent: item.choices[0].message.content
                                });
                            }
                        }
                        // Clear local storage after sync
                        localStorage.removeItem('reviewHistory');
                        // Re-fetch to get synced items
                        const updated = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/history/${userData.email}`);
                        setHistory(updated.data);
                    }
                }
            } catch (e) {
                console.error("Error fetching history:", e);
            }
        };
        fetchHistory();
    }, [userData?.email]);

    // Save history to Database
    const saveToHistory = async (newReview) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/history`, {
                userEmail: userData.email,
                filename: newReview.filename,
                categories: newReview.categories,
                model: newReview.model,
                reviewContent: newReview.choices[0].message.content
            });
            // Refresh history from DB
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/history/${userData.email}`);
            setHistory(response.data);
        } catch (e) {
            console.error("Error saving history to DB:", e);
            // Fallback to local state if API fails
            setHistory(prev => [newReview, ...prev].slice(0, 20));
        }
    };

    const validFileTypes = ['text/javascript', 'text/x-python', 'text/x-java', 'text/x-c++', 'text/plain', 'text/jsx'];
    const modelOptions = [
        'Qwen3 32B',
        'GPT OSS 120',
        'Llama 4 Scout',
        'Llama 3.3 70B'
    ];

    /**
     * Handles file upload by storing file and metadata, and setting default category.
     * @param {File} file - The uploaded file.
     */
    const handleFileUpload = useCallback((file) => {
        const fileInfo = {
            id: Date.now(),
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            lastModified: new Date(file.lastModified).toLocaleDateString()
        };
        setUploadedFile({ file, info: fileInfo });
        setSelectedCategories(['General']);
        if (process.env.NODE_ENV !== "production") {
            console.log("File uploaded:", file);
        }
    }, []);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (!droppedFile) {
            toast.error("No file dropped.", { position: "top-center", autoClose: 1500 });
            return;
        }
        handleFileUpload(droppedFile);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            toast.error("File size exceeds 5MB limit.", { position: "top-center", autoClose: 1500 });
            return;
        }
        handleFileUpload(file);
    };

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleDelete = () => {
        setUploadedFile(null);
        setSelectedCategories([]);
        setSelectedModel('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setIsDropdownOpen(false);
    };

    const highlightMatch = (text, query) => {
        if (!query.trim()) return text;
        const parts = text.split(new RegExp(`(${query})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) => 
                    part.toLowerCase() === query.toLowerCase() ? (
                        <mark key={i} className="bg-blue-500/50 text-white rounded-sm px-0.5">{part}</mark>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    const filteredHistory = history.filter(item => 
        item.filename.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async () => {
        if (!uploadedFile) {
            toast.error("Upload a file before submitting.", { position: "top-center", autoClose: 1500 });
            return;
        }
        if (selectedCategories.length === 0) {
            toast.error("Select at least one review category.", { position: "top-center", autoClose: 1500 });
            return;
        }
        if (!selectedModel) {
            toast.error("Select a model before submitting.", { position: "top-center", autoClose: 1500 });
            return;
        }
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", uploadedFile.file);
        formData.append("categories", JSON.stringify(selectedCategories));
        formData.append("model", selectedModel);
        try {
            const response = await axios.post(`${import.meta.env.VITE_PYTHON_API_URL}/review`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const result = response.data;
            if (!result || !result.review) {
                throw new Error("Invalid response structure from backend");
            }
            const transformedData = {
                id: result.filename || 'unknown',
                filename: result.filename,
                categories: result.categories,
                model: selectedModel,
                choices: [
                    {
                        message: {
                            content: result.review
                        }
                    }
                ]
            };

            // Save to history before navigating
            saveToHistory(transformedData);

            navigate("/review", { state: { jsonData: transformedData } });
        } catch (error) {
            console.error("Error uploading file:", error);
            if (error.response) {
                toast.error(`Error: ${error.response.data.message || "Failed to upload file. Please try again."}`, { position: "top-center", autoClose: 2000 });
            } else {
                toast.error("Error uploading file. Please try again.", { position: "top-center", autoClose: 2000 });
            }
        } finally {
            setIsUploading(false);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex h-screen w-full bg-[#222222] text-white overflow-hidden">
            <ToastContainer position="top-center" autoClose={2000} />
            {/* Sidebar */}
            <div className={`${collapsed ? 'w-16' : 'w-56'} bg-black p-4 flex flex-col items-center transition-all duration-300`}>
                <div className='flex flex-row justify-between items-center w-full'>
                    {!collapsed && (
                        <div className='cursor-pointer' onClick={() => navigate('/')}>
                            <img src={logo} alt="logo" className='w-20' />
                        </div>
                    )}
                    <div className='cursor-ew-resize ml-auto' onClick={() => setCollapsed(!collapsed)}>
                        <img src={drawer} alt="drawer icon" className={`${collapsed ? 'rotate-180' : ''} transition-transform w-7`} />
                    </div>
                </div>
                <hr className='border border-white w-full my-2 opacity-60' />
                <div className="w-full px-2 mt-2">
                    {isSearchActive ? (
                        <div className="flex items-center gap-2 bg-zinc-900 rounded-lg px-2 py-1.5 border border-blue-500/50 animate-fadeIn">
                            <img src={SearchChat} alt="Search" className="w-5 h-5 opacity-70" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onBlur={() => { if (!searchTerm) setIsSearchActive(false); }}
                                className="bg-transparent border-none outline-none text-xs w-full text-white placeholder-gray-500"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="text-gray-500 hover:text-white">×</button>
                            )}
                        </div>
                    ) : (
                        <button 
                            onClick={() => setIsSearchActive(true)}
                            className="w-full py-2 flex gap-3 items-center hover:bg-zinc-800 transition-colors duration-200 rounded-lg group"
                        >
                            <img src={SearchChat} alt="Search Chat" className='w-7 group-hover:scale-110 transition-transform' />
                            {!collapsed && <span className="text-sm font-medium">Search Chat</span>}
                        </button>
                    )}
                </div>
                <hr className='border border-white w-full my-2 opacity-60' />
                {!collapsed && (
                    <div className="self-start mt-4 mb-2">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Review History</p>
                    </div>
                )}
                <div className='flex flex-col items-center w-full overflow-y-auto max-h-[60vh] custom-scrollbar px-2'>
                    {filteredHistory.length > 0 ? (
                        filteredHistory.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => navigate("/review", {
                                    state: {
                                        jsonData: {
                                            filename: item.filename,
                                            categories: item.categories,
                                            model: item.model,
                                            choices: [{ message: { content: item.reviewContent } }]
                                        }
                                    }
                                })}
                                className="w-full py-2 px-2 mb-1 flex gap-3 items-center hover:bg-zinc-800 transition-all duration-200 rounded-lg text-left group"
                            >
                                <img src={History_icon} alt="History" className='w-5 h-5 opacity-70 group-hover:scale-110 transition-transform' />
                                {!collapsed && (
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-sm truncate w-32">{highlightMatch(item.filename, searchTerm)}</span>
                                        <span className="text-[10px] text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                                    </div>
                                )}
                            </button>
                        ))
                    ) : (
                        <div className='flex flex-col items-center mt-10'>
                            <span>
                                <img src={History_icon} alt="History" className='w-11 h-11 opacity-30' />
                            </span>
                            {!collapsed && <p className="text-gray-500 text-sm mt-2">
                                {searchTerm ? "No matches found" : "No reviews yet"}
                            </p>}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="relative flex-1 p-10 flex flex-col justify-center items-center">
                <div className='absolute top-2 right-2 flex gap-5 p-3 w-32 justify-between items-center'>
                    <div className='cursor-pointer' onClick={() => setIsTempChatActive(!isTempChatActive)}>
                        <img src={isTempChatActive ? Tempchat2 : Tempchat} alt="Temp Chat" className="h-10 w-[45px]" />
                    </div>
                    <div className='cursor-pointer border-none rounded-full' onClick={() => navigate('/profile')}>
                        <img src={userData.picture || Profile_img} className='rounded-full h-[37px]' alt="Profile" />
                    </div>
                </div>
                {uploadedFile ? (
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-center">📤 Upload Your Code File</h3>
                        <div className="w-[500px] bg-[#2c2c2c] rounded-lg p-6 shadow-lg">
                            <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-[#4b5563] bg-[#2c2c2c] px-6 py-8 mb-6">
                                <img src={upload} alt="upload" className='w-10' />
                                <p className="text-gray-100 text-sm">Selected File: {uploadedFile.info.name}</p>
                            </div>
                            <div className="mb-6">
                                <p className="text-gray-200 text-sm mb-2">Select the Category for Review:</p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {['General', 'Efficiency & Logic', 'Time Comp', 'Space Comp', 'Readbility', 'Edge Cases', 'Security', 'Improvement'].map(category => (
                                        <button
                                            key={category}
                                            className={`px-3 py-1 rounded-md text-sm font-medium ${selectedCategories.includes(category)
                                                ? 'bg-[#0c7ff2] text-white'
                                                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                                } transition-colors`}
                                            onClick={() => handleCategoryToggle(category)}
                                        >
                                            {category} {selectedCategories.includes(category) && '×'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="text-gray-200 text-sm mb-2 block">Select Model:</label>
                                <div className="relative" ref={dropdownRef}>
                                    <div
                                        className="w-full bg-[#2c2c2c] text-white border border-[#4b5563] rounded-md px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-[#3a3a3a] transition-colors"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        tabIndex={0}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                setIsDropdownOpen(!isDropdownOpen);
                                            }
                                        }}
                                    >
                                        <span className={selectedModel ? 'text-white' : 'text-gray-400'}>
                                            {selectedModel || 'Select Model'}
                                        </span>
                                        <svg
                                            className={`w-4 h-4 text-gray-400 transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                        </svg>
                                    </div>
                                    {isDropdownOpen && (
                                        <div className="absolute w-full mt-1 bg-[#1e1e1e] border border-[#4b5563] rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                                            {modelOptions.map((model) => (
                                                <div
                                                    key={model}
                                                    className={`px-4 py-1 text-sm font-medium cursor-pointer hover:bg-[#0c7ff2] hover:text-white transition-colors ${selectedModel === model ? 'bg-[#0c7ff2] text-white' : 'text-gray-200'
                                                        }`}
                                                    onClick={() => handleModelSelect(model)}
                                                >
                                                    {model}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-4 flex-row-reverse">
                                <button
                                    className="w-full py-2 bg-red-500 text-white text-opacity-90 rounded-md text-sm font-bold transition-colors"
                                    onClick={handleDelete}
                                >
                                    Delete File
                                </button>
                                <button
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md text-sm  transition-colors flex items-center justify-center"
                                    onClick={handleSubmit}
                                    disabled={isUploading}
                                >
                                    {isUploading ? (
                                        <div className="flex flex-row">
                                            <div className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                                            <p className="mx-2">Submitting...</p>
                                        </div>
                                    ) : (
                                        "🧑‍💻 Submit for Review"
                                    )}
                                </button>

                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-center">📤 Upload Your Code File</h3>
                        <div className="w-[500px] bg-[#2c2c2c] rounded-lg p-6 shadow-lg">
                            <div
                                className={`flex flex-col items-center gap-4 rounded-lg border-2 border-dashed ${isDragging ? 'border-[#0c7ff2] bg-[#2a3a4a]' : 'border-[#4b5563] bg-[#2c2c2c]'} px-6 py-8`}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                            >
                                <img src={upload} alt="upload" className='w-10' />
                                <p className="text-gray-200 text-sm">Drag & Drop your file here</p>
                                <p className="text-gray-400 text-xs">or click to select from your computer</p>
                                <button
                                    className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#0c7ff2] text-white text-sm font-medium hover:bg-[#0a6cd6] transition-colors"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    Browse File
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept=".js,.py,.java,.cpp,.txt,.jsx"
                                    onChange={handleFileSelect}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadFile;