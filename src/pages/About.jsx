import React from 'react';
import Layout from '../components/Layout/Layout';

const About = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-50">
                {/* Hero Section */}
                <section className="relative py-24 px-6 md:px-12 bg-slate-900 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-slate-800 rounded-full blur-[100px] opacity-20"></div>
                    <div className="max-w-7xl mx-auto relative z-10 text-center">
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                            Our Legacy of <br />
                            <span className="text-emerald-400">Excellence.</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                            Founded on the principles of holistic development, Shree Jagannath International School
                            is dedicated to nurturing the next generation of global leaders in Bhubaneswar.
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="glass-card">
                            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-3xl mb-8">🎯</div>
                            <h2 className="text-3xl font-black text-slate-900 mb-6">Our Mission</h2>
                            <p className="text-slate-600 font-medium leading-relaxed text-lg">
                                To provide a transformative educational experience that empowers students with
                                knowledge, critical thinking skills, and a strong sense of ethical responsibility.
                                We strive to create an environment where curiosity is encouraged and every student
                                can reach their full potential.
                            </p>
                        </div>
                        <div className="glass-card">
                            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-3xl mb-8">👁️</div>
                            <h2 className="text-3xl font-black text-slate-900 mb-6">Our Vision</h2>
                            <p className="text-slate-600 font-medium leading-relaxed text-lg">
                                To be a leading center of academic excellence recognized for its инновационный approach
                                to learning and its commitment to building a diverse and inclusive community.
                                We envision our graduates as compassionate individuals who lead with integrity.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-24 px-6 md:px-12 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight font-serif">Our Core Values</h2>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">The Foundation of Our Institution</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: 'Integrity', icon: '⚖️', desc: 'Acting with honesty and ethical consistency.' },
                                { label: 'Excellence', icon: '⭐', desc: 'Striving for the highest quality in all pursuits.' },
                                { label: 'Respect', icon: '🤝', desc: 'Valuing diversity and the dignity of every individual.' },
                                { label: 'Service', icon: '🌍', desc: 'Contributing positively to our local and global community.' }
                            ].map((value, i) => (
                                <div key={i} className="text-center group p-8 rounded-3xl hover:bg-slate-50 transition-colors">
                                    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{value.icon}</div>
                                    <h3 className="text-xl font-black text-slate-900 mb-3">{value.label}</h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{value.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Faculty Section */}
                <section className="py-32 px-6 md:px-12 bg-slate-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-brand-primary mb-4 font-serif">Meet Our Faculty</h2>
                            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                                Our educators are masters in their fields, dedicated to nurturing
                                the intellectual and moral growth of every student.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-10">
                            {[
                                { name: 'Dr. Amitabh Sen', role: 'Principal', subject: 'PhD in Education', avatar: '👨‍🏫' },
                                { name: 'Ms. Priyadarshini Rao', role: 'HOD Science', subject: 'M.Sc. Physics', avatar: '👩‍🏫' },
                                { name: 'Mr. Rajesh Mohanty', role: 'Academic Coordinator', subject: 'M.A. English', avatar: '👨‍💼' }
                            ].map((faculty, i) => (
                                <div key={i} className="glass-card hover:bg-brand-primary group transition-all duration-300">
                                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform">
                                        {faculty.avatar}
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-white">{faculty.name}</h3>
                                    <div className="text-brand-secondary font-bold text-xs uppercase tracking-widest mb-3">{faculty.role}</div>
                                    <p className="text-slate-500 text-sm font-medium group-hover:text-slate-200">{faculty.subject}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bus Facilities */}
                <section className="py-32 px-6 md:px-12 bg-white">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                        <div className="flex-1">
                            <div className="w-16 h-16 bg-brand-secondary/20 rounded-2xl flex items-center justify-center text-3xl mb-8">🚌</div>
                            <h2 className="text-4xl font-black text-slate-900 mb-6 font-serif">Safe & Modern Bus Facilities</h2>
                            <p className="text-slate-600 font-medium text-lg leading-relaxed mb-8">
                                We operate a fleet of modern, air-conditioned buses that cover all major
                                residential areas in Bhubaneswar. Safety is our top priority, with GPS
                                tracking and trained supervisors on every route.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="text-brand-primary font-black text-2xl mb-1">GPS</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time Tracking</div>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="text-brand-primary font-black text-2xl mb-1">AC</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Climate Controlled</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 aspect-video bg-slate-100 rounded-[3rem] overflow-hidden shadow-2xl relative">
                            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800" alt="School Bus" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-brand-primary/10"></div>
                        </div>
                    </div>
                </section>

                {/* History / CBCSE */}
                <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[120px] opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
                        <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-black mb-8 tracking-tight">CBSE Board Affiliation</h2>
                                <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8">
                                    SJIS is proudly affiliated with the Central Board of Secondary Education (CBSE), New Delhi.
                                    Our curriculum is designed to meet national standards while integrating modern pedagogies
                                    that prepare students for future challenges in an ever-evolving world.
                                </p>
                                <div className="flex gap-4">
                                    <span className="px-5 py-2 bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest">Classes 1 - 10</span>
                                    <span className="px-5 py-2 bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-emerald-400 border border-emerald-500/30">Bhubaneswar Campus</span>
                                </div>
                            </div>
                            <div className="aspect-video bg-slate-800 rounded-3xl flex items-center justify-center text-6xl shadow-2xl">
                                🏫
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default About;
