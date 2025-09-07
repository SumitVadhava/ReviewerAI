import React, { useState, useEffect } from 'react';
import { User, Mail, Calendar, Settings, Edit3, MapPin, Link, Shield, Plus, Phone, Briefcase, GraduationCap } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import ModalInput from './../components/InputModel';   // adjust path as needed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = ({userData}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSpecialtyModalOpen, setIsSpecialtyModalOpen] = useState(false);
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [newSpecialty, setNewSpecialty] = useState('');
    const [newLanguage, setNewLanguage] = useState('');
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
    });

    const [profileData, setProfileData] = useState(getInitialProfileData());

    // When userData changes (or when entering edit mode), update profileData
    useEffect(() => {
        if (isEditing) {
            setProfileData(getInitialProfileData());
        }
        // eslint-disable-next-line
    }, [isEditing, userData]);

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

    const handleSave = () => {
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
        setIsEditing(false);
        // Add API call or other save logic here
    };

    const handleCancel = () => {
        setIsEditing(false);
        setProfileData(getInitialProfileData()); // Reset to original data
    };

    const truncateText = (text, maxLength) => {
        if (!text || text.length <= maxLength) return text;
        return text.slice(0, maxLength - 3) + '...';
    };

    const truncateUrl = (url, maxLength = 28) => {
        if (!url || url.length <= maxLength) return url;
        return url.slice(0, maxLength - 3) + '...';
    };

    return (
        <div className="min-h-screen bg-[#00020b] text-gray-200">
            <ToastContainer position="top-right" autoClose={3000} />
            {/* Header */}
            <div className="bg-gradient-to-r bg-[#00020b] px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="relative">
                                <img
                                    src={userData.picture}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-lg cursor-pointer"
                                />
                                {profileData.verified && (
                                    <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
                                        <Shield className="w-4 h-4 text-white" />
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
                            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
                        >
                            {isEditing ? <Settings className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                            <span>{isEditing ? 'Save' : 'Edit'}</span>
                        </button>
                    </div>
                </div>
            </div>

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
                                        <span className="bg-blue-700 text-xs px-3 py-1 rounded-full font-medium">{truncateText(spec, 20)}</span>
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
                                        <span className="bg-green-700 text-xs px-3 py-1 rounded-full font-medium">{truncateText(lang, 20)}</span>
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
        </div>
    );
};

export default ProfilePage;