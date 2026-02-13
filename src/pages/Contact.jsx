import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry. Our administrative office will contact you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const activities = [
        { title: 'Blood Donation Camp', date: 'Annual Event', icon: '🩸', desc: 'SJIS organizes annual blood donation camps to serve the community.' },
        { title: 'Sports Meet', date: 'Winter Session', icon: '⚽', desc: 'Grand annual sports competition for all age groups.' },
        { title: 'Plantation Drive', date: 'Monsoon', icon: '🌳', desc: 'Promoting green earth through student-led plantation programs.' },
        { title: 'Charity Drive', date: 'Quarterly', icon: '🤝', desc: 'Supporting local NGOs and underserved communities.' }
    ];

    return (
        <Layout>
            <div className="min-h-screen bg-slate-50">
                {/* Hero Section */}
                <section className="relative py-24 px-6 md:px-12 bg-brand-primary text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-dark rounded-full blur-[100px] opacity-50"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter font-serif">
                            Institutional <br />
                            <span className="text-brand-secondary">Connect.</span>
                        </h1>
                        <p className="text-xl text-slate-200 max-w-2xl font-medium leading-relaxed">
                            Reach out to our administrative office for any queries related to
                            admissions, academics, or community partnerships.
                        </p>
                    </div>
                </section>

                {/* Institutional Activities */}
                <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4 font-serif">Community & Activities</h2>
                        <p className="text-slate-500 font-medium">Beyond academics, we believe in serving the society.</p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {activities.map((act, i) => (
                            <div key={i} className="glass-card hover:bg-white transition-all border-b-4 border-brand-secondary">
                                <div className="text-4xl mb-6">{act.icon}</div>
                                <h3 className="text-xl font-black text-slate-900 mb-2">{act.title}</h3>
                                <div className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-4">{act.date}</div>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">{act.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Form & Info */}
                <section className="py-24 px-6 md:px-12 bg-white border-y border-slate-100">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 mb-8 font-serif">Get in Touch</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="label-text text-brand-primary">Full Name</label>
                                        <input
                                            type="text"
                                            className="input-field border-slate-200 focus:border-brand-primary"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="label-text text-brand-primary">Email Address</label>
                                        <input
                                            type="email"
                                            className="input-field border-slate-200 focus:border-brand-primary"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="label-text text-brand-primary">Subject</label>
                                    <select
                                        className="input-field border-slate-200 focus:border-brand-primary"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Department...</option>
                                        <option value="Admissions">Admissions</option>
                                        <option value="Academics">Academics</option>
                                        <option value="Transport">Transport</option>
                                        <option value="General">General Inquiry</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="label-text text-brand-primary">Message</label>
                                    <textarea
                                        className="input-field border-slate-200 focus:border-brand-primary min-h-[150px] resize-none"
                                        placeholder="Type your message here..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-primary w-full py-5 text-lg shadow-xl shadow-brand-primary/10">
                                    Send Message 📨
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-col gap-10">
                            <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/10 rounded-full blur-3xl"></div>
                                <h3 className="text-2xl font-black mb-8 font-serif">Institutional Details</h3>
                                <div className="space-y-8 relative z-10">
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">📍</div>
                                        <div>
                                            <h4 className="font-black text-brand-secondary mb-1">Campus Address</h4>
                                            <p className="text-slate-400 text-sm">Plot No. 125, SJIS Institutional Area, Bhubaneswar-751001</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">📞</div>
                                        <div>
                                            <h4 className="font-black text-brand-secondary mb-1">Phone Number</h4>
                                            <p className="text-slate-400 text-sm">+91-674-255-SJIS (7547)</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">✉️</div>
                                        <div>
                                            <h4 className="font-black text-brand-secondary mb-1">Email Address</h4>
                                            <p className="text-slate-400 text-sm">info@sjis.org.in</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10">
                                    <h4 className="font-black text-white mb-2">Visiting Hours</h4>
                                    <p className="text-slate-400 text-sm">Monday - Friday: 8:00 AM to 4:00 PM</p>
                                    <p className="text-slate-400 text-sm">Saturday: 8:00 AM to 12:30 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Contact;
