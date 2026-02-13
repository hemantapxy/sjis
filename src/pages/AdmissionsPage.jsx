import React from 'react';
import Layout from '../components/Layout/Layout';

const AdmissionsPage = () => {
    const feeData = [
        {
            level: 'Primary Wing',
            classes: 'Classes 1 - 5',
            fee: '₹55,000',
            subjects: ['English', 'Mathematics', 'EVS (Science & Social)', 'Hindi/Regional Language', 'Computer Science', 'Art & Craft', 'Physical Education'],
            features: ['Holistic Development', 'Interactive Digital Classes', 'Foundation Literacy & Numeracy']
        },
        {
            level: 'Secondary Wing',
            classes: 'Classes 6 - 10',
            fee: '₹75,000',
            subjects: ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'History/Civics', 'Geography/Economics', 'Language II', 'Language III (Class 6-8)', 'IT/AI Skills'],
            features: ['Advanced Science Labs', 'Competitive Exam Foundation', 'Robotics & STEM']
        },
        {
            level: 'Senior Secondary',
            classes: 'Classes 11 - 12',
            fee: '₹95,000',
            subjects: [
                'Science: Physics, Chemistry, Math/Bio, English, CS/PE',
                'Commerce: Accountancy, Business Studies, Economics, English, Math/PE',
                'Humanities: Political Science, Sociology, History, English, PE/Arts'
            ],
            features: ['Career Counseling', 'University Prep', 'Industry Internships', 'Internship Programs']
        }
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-slate-50">
                {/* Hero Section */}
                <section className="relative py-24 px-6 md:px-12 bg-brand-primary text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-dark rounded-full blur-[100px] opacity-50"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter font-serif">
                            Admissions <br />
                            <span className="text-brand-secondary">2026-27.</span>
                        </h1>
                        <p className="text-xl text-slate-200 max-w-2xl font-medium leading-relaxed">
                            Join Odisha's premier institution. We are look for bright minds who want to
                            shape the future with institutional excellence.
                        </p>
                    </div>
                </section>

                {/* Guidelines Section */}
                <section id="guidelines" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 mb-8 font-serif">Admission Guidelines</h2>
                            <div className="space-y-6">
                                {[
                                    { step: '01', title: 'Registration', desc: 'Apply online or visit our campus for an application form.' },
                                    { step: '02', title: 'Interaction', desc: 'A friendly interaction with the child and parents.' },
                                    { step: '03', title: 'Assessment', desc: 'Holistic diagnostic assessment for classes 3 and above.' },
                                    { step: '04', title: 'Documentation', desc: 'Submission of required documents and previous records.' }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6">
                                        <span className="text-4xl font-black text-brand-secondary/30">{step.step}</span>
                                        <div>
                                            <h4 className="font-black text-slate-900 mb-1">{step.title}</h4>
                                            <p className="text-sm text-slate-500 font-medium">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div id="apply" className="glass-card bg-white p-12 border-2 border-brand-primary/5 shadow-2xl">
                            <h3 className="text-2xl font-black text-slate-900 mb-6">Apply Online</h3>
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label className="label-text">Student Name</label>
                                    <input type="text" className="input-field" placeholder="Enter Full Name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="label-text">Applying for Class</label>
                                    <select className="input-field">
                                        <option>Select Class...</option>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i + 1}>Class {i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="button" className="btn-primary w-full py-5 text-lg">
                                    Start Application 🚀
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Fee Structure Table */}
                <section id="fees" className="py-24 px-6 md:px-12 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black text-slate-900 mb-4 font-serif">Fee Structure & Subjects</h2>
                            <p className="text-slate-500 font-medium">Invest in your child's future with our transparent fee policy.</p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-10">
                            {feeData.map((tier, i) => (
                                <div key={i} className="flex flex-col p-10 rounded-[3rem] border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl transition-all duration-500 group">
                                    <h3 className="text-3xl font-black text-brand-primary mb-2 font-serif">{tier.classes}</h3>
                                    <div className="text-4xl font-black text-brand-secondary mb-6">{tier.fee} <span className="text-sm text-slate-400 font-bold uppercase tracking-widest">/Year</span></div>

                                    <div className="mb-8">
                                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Core Subjects</h4>
                                        <ul className="flex flex-wrap gap-2">
                                            {tier.subjects.map((sub, j) => (
                                                <li key={j} className="px-3 py-1 bg-white rounded-lg text-xs font-bold text-slate-600 border border-slate-100">
                                                    {sub}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-auto space-y-4 pt-8 border-t border-slate-200">
                                        {tier.features.map((feat, k) => (
                                            <div key={k} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                                                <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white">✓</span>
                                                {feat}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Scholarships & FAQ */}
                <section id="scholarships" className="py-32 px-6 md:px-12 bg-slate-50">
                    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 mb-8 font-serif">Scholarships</h2>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed mb-8">
                                SJIS believes in rewarding merit. We offer scholarships up to 100% of the tuition fee
                                for students excelling in Academics, Sports, and Cultural activities.
                            </p>
                            <div className="p-8 bg-brand-primary text-white rounded-3xl shadow-xl">
                                <h4 className="font-black text-xl mb-4">Scholarship Qualifier 2026</h4>
                                <p className="text-slate-300 mb-6 text-sm">Appear for our national level scholarship exam on March 15th, 2026.</p>
                                <button className="btn-secondary w-full">Apply for Exam</button>
                            </div>
                        </div>
                        <div id="faq">
                            <h2 className="text-4xl font-black text-slate-900 mb-8 font-serif">Common Queries (FAQ)</h2>
                            <div className="space-y-4">
                                {[
                                    { q: 'What is the student-teacher ratio?', a: 'We maintain a 25:1 ratio to ensure personalized attention.' },
                                    { q: 'Is there a transport facility?', a: 'Yes, we provide safe AC bus transport across Bhubaneswar.' },
                                    { q: 'Do you offer boarding facilities?', a: 'SJIS is a day boarding school focusing on academic rigor.' },
                                    { q: 'What curriculum do you follow?', a: 'We follow the CBSE curriculum integrated with global standards.' }
                                ].map((faq, i) => (
                                    <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 hover:shadow-md transition-all cursor-pointer">
                                        <h4 className="font-black text-slate-900 mb-2">{faq.q}</h4>
                                        <p className="text-sm text-slate-500 font-medium">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AdmissionsPage;
