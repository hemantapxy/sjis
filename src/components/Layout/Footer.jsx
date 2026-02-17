import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative py-20 px-6 md:px-12 bg-brand-primary text-white overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-secondary rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
                    {/* Logo & Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-brand-secondary rounded-xl flex items-center justify-center shadow-lg">
                                <span className="text-brand-primary font-black text-2xl font-serif">S</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-black tracking-tight text-white leading-none">
                                    SJIS
                                </span>
                                <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-[0.2em] mt-1">
                                    Bhubaneswar
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-300 font-medium leading-relaxed mb-8">
                            Shaping Learners who Inspire the World. SJIS is committed to excellence in education and holistic development.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 text-slate-300">
                                <span className="text-brand-secondary">📍</span>
                                <span className="text-sm">Plot No. 5, Infocity Road, Patia, Bhubaneswar, Odisha 751024</span>
                            </div>
                            <div className="flex items-center gap-4 text-slate-300">
                                <span className="text-brand-secondary">📞</span>
                                <span className="text-sm">+91 674 274 2216 / 17</span>
                            </div>
                            <div className="flex items-center gap-4 text-slate-300">
                                <span className="text-brand-secondary">✉️</span>
                                <span className="text-sm">info@shree Jagannath international.edu.in</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-black text-brand-secondary uppercase tracking-widest mb-8 border-b border-brand-secondary/20 pb-2 inline-block">Academics</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Curriculum', path: '/academics#curriculum' },
                                { name: 'Learning @ 360', path: '/academics#learning' },
                                { name: 'Global Connect', path: '/academics#global' },
                                { name: 'Achievements', path: '/academics#achievements' },
                                { name: 'Library', path: '/academics#library' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-slate-300 font-bold hover:text-brand-secondary transition-colors text-sm">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Admissions */}
                    <div>
                        <h4 className="text-sm font-black text-brand-secondary uppercase tracking-widest mb-8 border-b border-brand-secondary/20 pb-2 inline-block">Admissions</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'Guidelines', path: '/admissions#guidelines' },
                                { name: 'Apply Online', path: '/admissions#apply' },
                                { name: 'Fee Structure', path: '/admissions#fees' },
                                { name: 'Scholarships', path: '/admissions#scholarships' },
                                { name: 'FAQ', path: '/admissions#faq' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-slate-300 font-bold hover:text-brand-secondary transition-colors text-sm">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="text-sm font-black text-brand-secondary uppercase tracking-widest mb-8 border-b border-brand-secondary/20 pb-2 inline-block">Connect</h4>
                        <ul className="space-y-4">
                            {[
                                { name: 'News & Events', path: '/connect#news' },
                                { name: 'Media Gallery', path: '/connect#gallery' },
                                { name: 'Radio Orange', path: '/connect#radio' },
                                { name: 'SJIS TV', path: '/connect#tv' },
                                { name: 'Contact Us', path: '/contact' }
                            ].map(item => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-slate-300 font-bold hover:text-brand-secondary transition-colors text-sm">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                        <span>© 2026 Shree Jagannath International School. All Rights Reserved.</span>
                    </div>

                    <div className="flex items-center gap-8">
                        {['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube'].map(social => (
                            <a key={social} href="#" className="text-slate-400 hover:text-brand-secondary font-bold text-xs uppercase tracking-widest transition-colors">
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
