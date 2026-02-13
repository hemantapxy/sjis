import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);

    const navLinks = [
        { title: 'About Us', path: '/about' },
        {
            title: 'Academics',
            path: '/academics',
            dropdown: [
                { name: 'Curriculum', path: '/academics#curriculum' },
                { name: 'Learning @ 360', path: '/academics#learning' },
                { name: 'Global Connect', path: '/academics#global' },
                { name: 'Achievements', path: '/academics#achievements' },
                { name: 'Library', path: '/academics#library' },
            ],
        },
        {
            title: 'Admissions',
            path: '/admissions',
            dropdown: [
                { name: 'Guidelines', path: '/admissions#guidelines' },
                { name: 'Apply Online', path: '/admissions#apply' },
                { name: 'Fee Structure', path: '/admissions#fees' },
                { name: 'Scholarships', path: '/admissions#scholarships' },
                { name: 'FAQ', path: '/admissions#faq' },
            ],
        },
        {
            title: 'Connect',
            path: '/connect',
            dropdown: [
                { name: 'News & Events', path: '/connect#news' },
                { name: 'Media Gallery', path: '/connect#gallery' },
                { name: 'Radio Orange', path: '/connect#radio' },
                { name: 'SAI TV', path: '/connect#tv' },
            ],
        },
        { title: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="relative flex items-center justify-between px-6 md:px-12 py-6 bg-white/95 backdrop-blur-xl border-b border-brand-primary/10 sticky top-0 z-[100] shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg border-2 border-brand-secondary">
                    <span className="text-brand-secondary font-black text-2xl font-serif">S</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-black tracking-tight text-brand-primary leading-none">
                        SJIS
                    </span>
                    <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-[0.2em] mt-1">
                        Bhubaneswar
                    </span>
                </div>
            </div>

            {/* Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                    <div
                        key={link.title}
                        className="relative group"
                        onMouseEnter={() => setActiveDropdown(link.title)}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <Link
                            to={link.path}
                            className="text-brand-primary font-bold hover:text-brand-secondary transition-colors text-sm uppercase tracking-wider flex items-center gap-1"
                        >
                            {link.title}
                            {link.dropdown && (
                                <svg className={`w-4 h-4 transition-transform ${activeDropdown === link.title ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </Link>

                        {/* Dropdown Menu */}
                        {link.dropdown && activeDropdown === link.title && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-top-4">
                                <div className="py-4">
                                    {link.dropdown.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.path}
                                            className="block px-6 py-3 text-sm font-bold text-brand-primary hover:bg-slate-50 hover:text-brand-secondary transition-all"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                <button
                    onClick={() => navigate('/login')}
                    className="btn-primary px-8 py-2.5 text-sm uppercase tracking-widest ml-4"
                >
                    Sign In
                </button>
            </div>

            {/* Mobile Menu Icon (Placeholder for now) */}
            <div className="lg:hidden flex items-center">
                <button className="text-brand-primary p-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
