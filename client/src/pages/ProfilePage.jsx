import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Settings, Edit3, MapPin, Link, Shield, Plus, Phone, Briefcase, GraduationCap } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import ModalInput from './../components/InputModel';   // adjust path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ImageCropper from './../components/ImageCropper';
import DefaultProfile from './../assets/profile3.png';
import { useRef } from 'react';

const ProfileSkeleton = () => (
    <div className="min-h-screen bg-[#00020b] text-gray-200 animate-pulse">
        {/* Header Skeleton */}
        <div className="bg-[#00020b] px-6 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 rounded-full bg-gray-800 shadow-lg"></div>
                        <div className="space-y-3">
                            <div className="h-8 w-48 bg-gray-800 rounded"></div>
                            <div className="h-4 w-64 bg-gray-800 rounded"></div>
                            <div className="flex space-x-4">
                                <div className="h-4 w-24 bg-gray-800 rounded"></div>
                                <div className="h-4 w-32 bg-gray-800 rounded"></div>
                            </div>
                        </div>
                    </div>
                    <div className="h-10 w-28 bg-gray-800 rounded-lg"></div>
                </div>
            </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel Skeleton */}
            <div className="space-y-6 lg:col-span-1">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-32">
                        <div className="h-5 w-32 bg-gray-800 rounded mb-4"></div>
                        <div className="space-y-3">
                            <div className="h-4 w-full bg-gray-800 rounded"></div>
                            <div className="h-4 w-3/4 bg-gray-800 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Panel Skeleton */}
            <div className="space-y-6 lg:col-span-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-40">
                        <div className="h-6 w-40 bg-gray-800 rounded mb-4"></div>
                        <div className="space-y-3">
                            <div className="h-4 w-full bg-gray-800 rounded"></div>
                            <div className="h-4 w-full bg-gray-800 rounded"></div>
                            <div className="h-4 w-2/3 bg-gray-800 rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ProfilePage = ({userData}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSpecialtyModalOpen, setIsSpecialtyModalOpen] = useState(false);
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [newSpecialty, setNewSpecialty] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
    const [imageToCrop, setImageToCrop] = useState(null);
    const [isCropperOpen, setIsCropperOpen] = useState(false);
    const fileInputRef = useRef(null);
    // Prefill profileData from userData
    const getInitialProfileData = () => ({
        username: userData.userName || '',
        email: userData.email || '',
        picture: userData.picture || '',
        fullName: userData.fullName || '',
        bio: userData.bio || '',
        location: userData.location || '',
        website: userData.website || '',
        phone: userData.phone || '',
        company: userData.company || '',
        jobTitle: userData.jobTitle || '',
        education: userData.education || '',
        experience: userData.experience || '',
        skills: userData.skills || '',
        languages: userData.languages || [],
        socialLinks: {
            linkedin: (userData.socialLinks && userData.socialLinks.linkedin) || '',
            twitter: (userData.socialLinks && userData.socialLinks.twitter) || '',
            github: (userData.socialLinks && userData.socialLinks.github) || ''
        },
        specialties: userData.specialties || [],
        verified: userData.verified || false,
        profilePicture: userData.profilePicture || '',
    });

    const [profileData, setProfileData] = useState(getInitialProfileData());
    const [isLoading, setIsLoading] = useState(false);

    // Fetch profile data from backend
    useEffect(() => {
        const fetchProfile = async () => {
            if (!userData.email) return;
            
            try {
                setIsLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/profile/${userData.email}`);
                if (response.data) {
                    const data = response.data;
                    setProfileData({
                        ...getInitialProfileData(),
                        fullName: data.fullName || userData.fullName || '',
                        bio: data.bio || userData.bio || '',
                        location: data.location || userData.location || '',
                        website: data.website || userData.website || '',
                        phone: data.phone || userData.phone || '',
                        company: data.company || userData.company || '',
                        jobTitle: data.jobTitle || userData.jobTitle || '',
                        education: data.education || userData.education || '',
                        experience: data.experience || userData.experience || '',
                        skills: data.skills || userData.skills || '',
                        languages: data.languages ? JSON.parse(data.languages) : (userData.languages || []),
                        specialties: data.specialties ? JSON.parse(data.specialties) : (userData.specialties || []),
                        socialLinks: {
                            linkedin: data.linkedIn || (userData.socialLinks && userData.socialLinks.linkedin) || '',
                            twitter: data.twitter || (userData.socialLinks && userData.socialLinks.twitter) || '',
                            github: data.gitHub || (userData.socialLinks && userData.socialLinks.github) || ''
                        },
                        verified: data.verified || userData.verified || false,
                        profilePicture: data.profilePicture || userData.profilePicture || '',
                    });
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                // Profile might not exist yet, which is fine
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [userData.email]);

    // When userData changes, update name/email if they are empty
    useEffect(() => {
        if (!profileData.fullName && userData.userName) {
            setProfileData(prev => ({ ...prev, fullName: userData.userName }));
        }
    }, [userData.userName, profileData.fullName]);

    const handleInputChange = (field, value) => {
        setProfileData(prev => ({ ...prev, [field]: value }));
    };

    const handleSocialLinkChange = (platform, value) => {
        setProfileData(prev => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [platform]: value }
        }));
    };

    const handleAddSpecialty = () => {
        if (newSpecialty.trim()) {
            setProfileData(prev => ({
                ...prev,
                specialties: [...prev.specialties, newSpecialty.trim()]
            }));
            setNewSpecialty('');
            setIsSpecialtyModalOpen(false);
        }
    };

    const handleAddLanguage = () => {
        if (newLanguage.trim()) {
            setProfileData(prev => ({
                ...prev,
                languages: [...prev.languages, newLanguage.trim()]
            }));
            setNewLanguage('');
            setIsLanguageModalOpen(false);
        }
    };

    const removeSpecialty = (index) => {
        setProfileData(prev => ({
            ...prev,
            specialties: prev.specialties.filter((_, i) => i !== index)
        }));
    };

    const removeLanguage = (index) => {
        setProfileData(prev => ({
            ...prev,
            languages: prev.languages.filter((_, i) => i !== index)
        }));
    };

    const handleSave = async () => {
        // Basic validation before save
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(profileData.email)) {
            toast.error('Please enter a valid email address.', { position: "top-center", autoClose : 1000 });
            return;
        }
        if (profileData.phone && profileData.phone.length !== 10) {
            toast.error('Phone number must be 10 digits.', { position: "top-center", autoClose: 1000 });
            return;
        }

        setIsLoading(true);

        try {
            const dataToSave = {
                userEmail: userData.email,
                fullName: profileData.fullName,
                bio: profileData.bio,
                location: profileData.location,
                website: profileData.website,
                phone: profileData.phone,
                company: profileData.company,
                jobTitle: profileData.jobTitle,
                education: profileData.education,
                experience: profileData.experience,
                skills: profileData.skills,
                languages: JSON.stringify(profileData.languages),
                specialties: JSON.stringify(profileData.specialties),
                linkedIn: profileData.socialLinks.linkedin,
                twitter: profileData.socialLinks.twitter,
                gitHub: profileData.socialLinks.github,
                profilePicture: profileData.profilePicture
            };

            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/profile`, dataToSave);
            toast.success('Profile updated successfully!', { position: "top-center", autoClose: 1500 });
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error('Failed to update profile. Please try again.', { position: "top-center", autoClose: 1500 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Removed reset to prevent data loss after fetching
    };

    const truncateText = (text, maxLength) => {
        if (!text || text.length <= maxLength) return text;
        return text.slice(0, maxLength - 3) + '...';
    };

    const handleImageClick = () => {
        if (isEditing) {
            fileInputRef.current?.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size exceeds 5MB limit.", { position: "top-center", autoClose: 2000 });
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setImageToCrop(reader.result);
                setIsCropperOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = (croppedImage) => {
        setProfileData(prev => ({ ...prev, profilePicture: croppedImage }));
        setIsCropperOpen(false);
        setImageToCrop(null);
    };

    const truncateUrl = (url, maxLength = 28) => {
        if (!url || url.length <= maxLength) return url;
        return url.slice(0, maxLength - 3) + '...';
    };

    return (
        <div className="min-h-screen bg-[#00020b] text-gray-200">
            {isLoading ? (
                <ProfileSkeleton />
            ) : (
                <>
                    <ToastContainer position="top-right" autoClose={3000} />
            {/* Header */}
            <div className="bg-gradient-to-r bg-[#00020b] px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="relative group">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <img
                                    src={profileData.profilePicture || userData.picture || DefaultProfile}
                                    alt="Profile"
                                    className={`w-24 h-24 rounded-full border-4 border-gray-700 shadow-lg object-cover ${isEditing ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''}`}
                                    onClick={handleImageClick}
                                />
                                {isEditing && (
                                    <div 
                                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                    >
                                        <Edit3 className="w-6 h-6 text-white" />
                                    </div>
                                )}

                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3">
                                    <h1 className="text-3xl font-bold">
                                        {userData.fullName || userData.userName}
                                    </h1>
                                </div>
                                {profileData.jobTitle && profileData.company && (
                                    <p className="text-gray-400 text-sm">{truncateText(profileData.jobTitle + ' at ' + profileData.company, 60)}</p>
                                )}
                                <div className="flex items-center space-x-4 text-sm text-gray-400">
                                    {profileData.location && (
                                        <div className="flex items-center space-x-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{truncateText(profileData.location, 30)}</span>
                                        </div>
                                    )}
                                     <div className="flex items-center space-x-1">
                                      {/* <Calendar className="w-4 h-4" />
                                        <span>Joined {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>*/
                                    }
                                    <Mail className='w-4 h-4'/>
                                    
                                    <span>{truncateText(userData.email, 50)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={isEditing ? handleSave : () => setIsEditing(!isEditing)}
                            disabled={isLoading}
                            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                            ) : (
                                isEditing ? <Settings className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />
                            )}
                            <span>{isEditing ? 'Save' : 'Edit Profile'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {isCropperOpen && (
                <ImageCropper
                    image={imageToCrop}
                    onCropComplete={onCropComplete}
                    onCancel={() => setIsCropperOpen(false)}
                />
            )}

            {/* Main Section */}
            <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Panel */}
                <div className="space-y-6 lg:col-span-1">
                    {/* Contact Info */}
                    <div className="bg-gray border border-gray-700 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">📩 Contact Info</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Mail className="w-4 h-4 text-gray-500" />
                                {isEditing ? (
                                    <input 
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm flex-1 text-gray-200"
                                        placeholder="Email address"/>
                                ) : (
                                    <span className="text-sm text-gray-400">{userData.email || 'Email not provided'}</span>
                                )}
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-gray-500" />
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={profileData.phone}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            handleInputChange('phone', value);
                                        }}
                                        maxLength={10}
                                        className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm flex-1 text-gray-200"
                                        placeholder="Phone number"
                                    />
                                ) : (
                                    <span className="text-sm text-gray-400">{profileData.phone || 'Phone not provided'}</span>
                                )}
                            </div>
                            <div className="flex items-center space-x-3">
                                <Link className="w-4 h-4 text-gray-500" />
                                {isEditing ? (
                                    <input
                                        type="url"
                                        value={profileData.website}
                                        onChange={(e) => handleInputChange('website', e.target.value)}
                                        className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm flex-1 text-gray-200"
                                        placeholder="https://your-website.com"
                                    />
                                ) : (
                                    profileData.website ? (
                                        <a href={profileData.website} className="text-sm text-blue-500 hover:underline">
                                            {truncateUrl(profileData.website)}
                                        </a>
                                    ) : (
                                        <span className="text-sm text-gray-500">Website not provided</span>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="bg-gray border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">🔗 Social Links</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faLinkedin} size="lg" className='mr-3' />

                                {isEditing ? (
                                    <input
                                        type="url"
                                        value={profileData.socialLinks.linkedin}
                                        onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                                        className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm flex-1 text-gray-200"
                                        placeholder="LinkedIn profile"
                                    />
                                ) : (
                                    profileData.socialLinks.linkedin ? (
                                        <a href={profileData.socialLinks.linkedin} className="text-sm text-blue-500 hover:underline">
                                            {truncateUrl(profileData.socialLinks.linkedin)}
                                        </a>
                                    ) : (
                                        <span className="text-sm text-gray-400">LinkedIn not provided</span>
                                    )
                                )}
                            </div>
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faXTwitter} size="lg" className='mr-3' />

                                {isEditing ? (
                                    <input
                                        type="url"
                                        value={profileData.socialLinks.twitter}
                                        onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                                        className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm flex-1 text-gray-200"
                                        placeholder="Twitter profile"
                                    />
                                ) : (
                                    profileData.socialLinks.twitter ? (
                                        <a href={profileData.socialLinks.twitter} className="text-sm text-blue-500 hover:underline">
                                            {truncateUrl(profileData.socialLinks.twitter)}
                                        </a>
                                    ) : (
                                        <span className="text-sm text-gray-400">Twitter not provided</span>
                                    )
                                )}
                            </div>
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faGithub} size="lg" className='mr-3' />
                                {isEditing ? (
                                    <input
                                        type="url"
                                        value={profileData.socialLinks.github}
                                        onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                                        className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm flex-1 text-gray-200"
                                        placeholder="GitHub profile"
                                    />
                                ) : (
                                    profileData.socialLinks.github ? (
                                        <a href={profileData.socialLinks.github} className="text-sm text-blue-500 hover:underline">
                                            {truncateUrl(profileData.socialLinks.github)}
                                        </a>
                                    ) : (
                                        <span className="text-sm text-gray-400">GitHub not provided</span>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Specialties */}
                    <div className="bg-gray border border-gray-800 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">🌟 Specialties</h3>
                            {isEditing && (
                                <button onClick={() => setIsSpecialtyModalOpen(true)} className="text-blue-500 hover:text-blue-400">
                                    <Plus className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profileData.specialties.length > 0 ? (
                                profileData.specialties.map((spec, index) => (
                                    <div key={index} className="relative">
                                        <span className="bg-gray-800 border border-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full font-medium">{truncateText(spec, 20)}</span>
                                        {isEditing && (
                                            <button onClick={() => removeSpecialty(index)}
                                                className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">×</button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <span className="text-gray-500 text-sm">No specialties added yet</span>
                            )}
                        </div>
                    </div>

                    {/* Languages */}
                    <div className="bg-gray border border-gray-800 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">  <FontAwesomeIcon icon={faLanguage} className='px-2' />Languages</h3>
                            {isEditing && (
                                <button onClick={() => setIsLanguageModalOpen(true)} className="text-blue-500 hover:text-blue-400">
                                    <Plus className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {profileData.languages.length > 0 ? (
                                profileData.languages.map((lang, index) => (
                                    <div key={index} className="relative">
                                        <span className="bg-gray-800 border border-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full font-medium">{truncateText(lang, 20)}</span>
                                        {isEditing && (
                                            <button onClick={() => removeLanguage(index)}
                                                className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">×</button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <span className="text-gray-500 text-sm">No languages added yet</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Bio */}
                    <div className="bg-gray border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">📝 About</h3>
                        {isEditing ? (
                            <textarea
                                value={profileData.bio}
                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm resize-none h-24 text-gray-200"
                                placeholder="Tell us about yourself..."
                                maxLength={500}
                            />
                        ) : (
                            <p className="text-gray-400 leading-relaxed">
                                {truncateText(profileData.bio || 'Bio not provided yet', 200)}
                            </p>
                        )}
                    </div>

                    {/* Personal Information */}
                    <div className="bg-gray border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4">👤 Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Full Name</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-200"
                                        placeholder="Your full name"
                                        maxLength={100}
                                    />
                                ) : (
                                    <p className="text-gray-400">{truncateText(profileData.fullName || 'Not provided', 50)}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Location</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.location}
                                        onChange={(e) => handleInputChange('location', e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-200"
                                        placeholder="City, Country"
                                        maxLength={100}
                                    />
                                ) : (
                                    <p className="text-gray-400">{truncateText(profileData.location || 'Not provided', 50)}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="bg-gray border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                            💼 Professional Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Job Title</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.jobTitle}
                                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-200"
                                        placeholder="Your job title"
                                        maxLength={100}
                                    />
                                ) : (
                                    <p className="text-gray-400">{truncateText(profileData.jobTitle || 'Not provided', 50)}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-2">Company</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={profileData.company}
                                        onChange={(e) => handleInputChange('company', e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm text-gray-200"
                                        placeholder="Company name"
                                        maxLength={100}
                                    />
                                ) : (
                                    <p className="text-gray-400">{truncateText(profileData.company || 'Not provided', 50)}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Education */}
                    <div className="bg-gray border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                            🎓 Education
                        </h3>
                        {isEditing ? (
                            <textarea
                                value={profileData.education}
                                onChange={(e) => handleInputChange('education', e.target.value)}
                                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
                                rows={4}
                                placeholder='Tell us about your eduction...'
                                maxLength={1000}
                            />
                        ) : (
                            <p className="text-gray-300">{truncateText(profileData.education || 'No education details available.', 300)}</p>
                        )}
                    </div>

                    {/* Experience */}
                    <div className="bg-gray border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                            💼 Experience
                        </h3>
                        {isEditing ? (
                            <textarea
                                value={profileData.experience}
                                onChange={(e) => handleInputChange('experience', e.target.value)}
                                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
                                rows={4}
                                placeholder='Tell us about your experience...'
                                maxLength={1000}
                            />
                        ) : (
                            <p className="text-gray-300">{truncateText(profileData.experience || 'No experience details available.', 300)}</p>
                        )}
                    </div>

                    {/* Skills */}
                    <div className="bg-gray border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center text-white">
                            🛠️ Skills
                        </h3>
                        {isEditing ? (
                            <textarea
                                value={profileData.skills}
                                onChange={(e) => handleInputChange('skills', e.target.value)}
                                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
                                rows={4}
                                placeholder='Tell us about your skills...'
                                maxLength={1000}
                            />
                        ) : (
                            <p className="text-gray-300">{truncateText(profileData.skills || 'No skills listed.', 300)}</p>
                        )}
                    </div>

                    {/* Save/Cancel Buttons */}
                    {isEditing && (
                        <div className="flex justify-end space-x-4 mt-6">
                          {/*  <button
                                onClick={handleSave}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                Save
                            </button>*/}
                            <button
                                onClick={handleCancel}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Specialty Modal */}
            <ModalInput
                isOpen={isSpecialtyModalOpen}
                onClose={() => setIsSpecialtyModalOpen(false)}
                onSubmit={handleAddSpecialty}
                value={newSpecialty}
                setValue={setNewSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                title="Add Specialty"
                placeholder="Enter a specialty"
            />

            {/* Language Modal */}
            <ModalInput
                isOpen={isLanguageModalOpen}
                onClose={() => setIsLanguageModalOpen(false)}
                onSubmit={handleAddLanguage}
                value={newLanguage}
                setValue={setNewLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                title="Add Language"
                placeholder="Enter a language"
            />
        </>
            )}
        </div>
    );
};

export default ProfilePage;