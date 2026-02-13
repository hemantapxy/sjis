import React from 'react';
import Layout from '../components/Layout/Layout';

const AcademicsPage = () => {
    const classes = Array.from({ length: 12 }, (_, i) => i + 1);

    const curriculumData = [
        { title: 'Primary (1-5)', focus: 'Foundational literacy, numeracy, and creative expression.', icon: '🌱' },
        { title: 'Middle (6-8)', focus: 'Critical thinking, scientific inquiry, and language mastery.', icon: '🌿' },
        { title: 'Secondary (9-10)', focus: 'Academic rigor, laboratory work, and vocational exploration.', icon: '🌳' },
        { title: 'Senior Secondary (11-12)', focus: 'Specialized streams (Science, Commerce, Arts) and career prep.', icon: '🎓' },
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-slate-50">
                {/* Hero Section */}
                <section className="relative py-24 px-6 md:px-12 bg-slate-900 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px]"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter font-serif">
                            Academic <br />
                            <span className="text-brand-secondary">Excellence.</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
                            A comprehensive Class 1-12 curriculum designed to nurture global citizens
                            with traditional values and modern skills.
                        </p>
                    </div>
                </section>

                {/* Class Navigation / Overview */}
                <section id="curriculum" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight font-serif">Curriculum Overview</h2>
                        <div className="w-24 h-1 bg-brand-secondary mx-auto"></div>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {curriculumData.map((stage, i) => (
                            <div key={i} className="glass-card text-center hover:border-brand-secondary/30">
                                <div className="text-5xl mb-6">{stage.icon}</div>
                                <h3 className="text-xl font-black text-slate-900 mb-3">{stage.title}</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">{stage.focus}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Class Specific Sections */}
                <section className="py-24 px-6 md:px-12 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-black text-slate-900 mb-12 font-serif">Comprehensive Learning (Class 1 - 12)</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {classes.map((cls) => (
                                <div key={cls} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center hover:bg-brand-primary hover:text-white transition-all cursor-pointer group">
                                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-brand-secondary mb-1">Class</span>
                                    <span className="text-4xl font-black">{cls}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Additional Sections */}
                <section id="learning" className="py-32 px-6 md:px-12 bg-slate-50">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
                        <div className="flex-1">
                            <h2 className="text-4xl font-black text-brand-primary mb-8 font-serif">Learning @ 360</h2>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                                Our SJIS 360 Learning Framework ensures that every student receives attention in all aspects of development:
                                Intellectual, Physical, Emotional, and Social. We go beyond textbooks to provide real-world experiences.
                            </p>
                            <ul className="space-y-4">
                                {['Digital Smart Classrooms', 'Experiential Learning Labs', 'Global Student Exchange', 'Personalized Mentorship'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                                        <span className="w-2 h-2 rounded-full bg-brand-secondary"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-6">
                            <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden shadow-xl">
                                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400" alt="Learning" className="w-full h-full object-cover" />
                            </div>
                            <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden shadow-xl mt-12">
                                <img src="https://images.unsplash.com/photo-1427501748790-687e33027ab5?auto=format&fit=crop&w=400" alt="Library" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Achievements & Library */}
                <section className="py-32 px-6 md:px-12 bg-white">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
                        <div id="achievements" className="p-12 rounded-[3rem] bg-brand-primary text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl"></div>
                            <h3 className="text-3xl font-black mb-6 font-serif">Achievements</h3>
                            <div className="space-y-6 relative z-10">
                                <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                    <h4 className="font-black text-brand-secondary mb-1">State Rank #1</h4>
                                    <p className="text-sm font-medium">Consistent top performance in CBSE Board Examinations.</p>
                                </div>
                                <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                                    <h4 className="font-black text-brand-secondary mb-1">International Olympics</h4>
                                    <p className="text-sm font-medium">Gold medals in Math and Science Olympiads globally.</p>
                                </div>
                            </div>
                        </div>
                        <div id="library" className="p-12 rounded-[3rem] bg-slate-900 text-white shadow-2xl">
                            <h3 className="text-3xl font-black mb-6 font-serif">Modern Library</h3>
                            <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                                Our library is a hub of knowledge with over 50,000+ volumes,
                                international journals, and a high-tech digital resource center.
                            </p>
                            <div className="flex gap-4">
                                <div className="text-center">
                                    <div className="text-4xl font-black text-brand-secondary">50K+</div>
                                    <div className="text-[10px] uppercase font-black tracking-widest text-slate-500">Books</div>
                                </div>
                                <div className="w-px h-10 bg-slate-800 self-center"></div>
                                <div className="text-center">
                                    <div className="text-4xl font-black text-brand-secondary">24/7</div>
                                    <div className="text-[10px] uppercase font-black tracking-widest text-slate-500">Digital Access</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AcademicsPage;
