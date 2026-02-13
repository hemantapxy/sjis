import React from 'react';
import Layout from '../components/Layout/Layout';

const ConnectPage = () => {
    return (
        <Layout>
            <div className="min-h-screen bg-slate-50">
                {/* Hero Section */}
                <section className="relative py-24 px-6 md:px-12 bg-slate-900 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-[100px]"></div>
                    <div className="max-w-7xl mx-auto relative z-10">
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter font-serif">
                            Connect <br />
                            <span className="text-brand-secondary">& Explore.</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
                            Stay updated with SJIS news, media gallery, and our exclusive radio & TV stations.
                        </p>
                    </div>
                </section>

                {/* Connect Sections */}
                <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* News & Events */}
                        <div id="news" className="p-12 rounded-[3.5rem] bg-white border border-slate-100 shadow-xl">
                            <h2 className="text-3xl font-black text-brand-primary mb-8 font-serif">News & Events</h2>
                            <div className="space-y-6">
                                {[
                                    { title: 'Annual Day 2026', date: 'March 20, 2026', type: 'Event' },
                                    { title: 'Global Exchange Program', date: 'April 05, 2026', type: 'News' },
                                    { title: 'Science Fair Results', date: 'Feb 10, 2026', type: 'News' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-center border-b border-slate-50 pb-6">
                                        <div className="text-brand-secondary font-black text-sm uppercase tracking-widest">{item.date}</div>
                                        <div className="font-black text-slate-900">{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Media Gallery */}
                        <div id="gallery" className="p-12 rounded-[3.5rem] bg-brand-primary text-white shadow-xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                            <h2 className="text-3xl font-black mb-8 font-serif">Media Gallery</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="aspect-square bg-white/10 rounded-2xl overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400" alt="Gallery 1" className="w-full h-full object-cover" />
                                </div>
                                <div className="aspect-square bg-white/10 rounded-2xl overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400" alt="Gallery 2" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <button className="btn-secondary w-full mt-8">View All Gallery 📁</button>
                        </div>
                    </div>
                </section>

                {/* Radio & TV */}
                <section className="py-24 px-6 md:px-12 bg-white">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
                        <div id="radio" className="flex-1 p-12 rounded-[3.5rem] bg-orange-50 border border-orange-100 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-4xl text-white mb-6 shadow-lg shadow-orange-500/20">📻</div>
                            <h2 className="text-3xl font-black text-orange-950 mb-4 font-serif">Radio Orange</h2>
                            <p className="text-orange-900/60 font-medium mb-8">
                                Student-led radio station broadcasting campus news, debates, and musical performances.
                            </p>
                            <button className="px-8 py-3 bg-orange-500 text-white font-black rounded-2xl hover:bg-orange-600 transition-all">Listen Now Live 🎙️</button>
                        </div>
                        <div id="tv" className="flex-1 p-12 rounded-[3.5rem] bg-indigo-50 border border-indigo-100 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-4xl text-white mb-6 shadow-lg shadow-indigo-600/20">📺</div>
                            <h2 className="text-3xl font-black text-indigo-950 mb-4 font-serif">SAI TV</h2>
                            <p className="text-indigo-900/60 font-medium mb-8">
                                Educational content, campus documentaries, and student achievements broadcasted 24/7.
                            </p>
                            <button className="px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all">Start Streaming 📺</button>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default ConnectPage;
