import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authAPI, BASE_URL } from '../../services/api';
import Footer from './Footer';

const DashboardLayout = ({ title, subtitle, children }) => {
    const navigate = useNavigate();
    const { user, logout, updateUser } = useAuth();
    const [showUploadModal, setShowUploadModal] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            const response = await authAPI.uploadProfilePicture(formData);
            updateUser(response.data.user); // Update context with new user data
            alert('Profile picture updated!');
            setShowUploadModal(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            <div className="dashboard-container flex-grow">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div className="flex items-center gap-5">
                        <div
                            className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-transform"
                            // onClick={() => navigate('/')}
                            title="Shree Jagannath International School"
                        >
                            <span className="text-white font-black text-2xl">SJ</span>
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                                {title}
                            </h1>
                            <p className="text-slate-500 font-bold mt-1.5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {user && (
                            <div className="flex items-center gap-4">
                                <div className="hidden sm:block text-right">
                                    <p className="text-slate-900 font-black">{user.name}</p>
                                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-0.5">{user.role}</p>
                                </div>
                                <div
                                    className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white shadow-md overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => setShowUploadModal(true)}
                                >
                                    {user.profilePicture ? (
                                        <img
                                            src={user.profilePicture.startsWith('http') ? user.profilePicture : `${BASE_URL}${user.profilePicture}`}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xl">👤</div>
                                    )}
                                </div>
                            </div>
                        )}
                        <button
                            onClick={handleLogout}
                            className="btn-secondary px-6 py-2.5 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="animate-in fade-in slide-in-from-bottom-4">
                    {children}
                </div>
            </div>
            <Footer />

            {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-in zoom-in-95 shadow-2xl">
                        <h3 className="text-2xl font-black mb-4 text-slate-900">Update Profile Photo</h3>
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="layout-profile-upload"
                                />
                                <label htmlFor="layout-profile-upload" className="cursor-pointer block">
                                    <div className="text-4xl mb-2">📸</div>
                                    <span className="font-bold text-slate-500">Click to upload new photo</span>
                                </label>
                            </div>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="w-full py-3 bg-slate-100 font-bold rounded-xl hover:bg-slate-200 transition-colors text-slate-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
