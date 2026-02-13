import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from './Layout/Layout';

const Landing = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { label: 'Academic Excellence', value: '100%', sub: 'Pass Rate' },
    { label: 'World Class Faculty', value: '250+', sub: 'Expert Educators' },
    { label: 'Global Alumni', value: '15k+', sub: 'Across 40 Countries' },
    { label: 'School Rating', value: '4.9/5', sub: 'Parent Satisfaction' }
  ];

  const teacherTestimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Senior HOD, Science",
      image: "https://i.pravatar.cc/150?u=sarah",
      quote: "At SJIS, we don't just teach; we inspire. The institutional support for innovative pedagogy is unparalleled in the region."
    },
    {
      name: "Prof. Michael Chen",
      role: "Lead, Global Connect",
      image: "https://i.pravatar.cc/150?u=michael",
      quote: "Our students are global citizens. The curriculum here bridge traditional values with modern technological skills perfectly."
    }
  ];

  const studentTestimonials = [
    {
      name: "Ananya Mahapatra",
      role: "Class 12th Student",
      image: "https://i.pravatar.cc/150?u=ananya",
      quote: "The 360-degree learning approach helped me excel in my boards while pursuing my passion for classical dance."
    },
    {
      name: "Rahul Sharma",
      role: "Alumni (Stanford '24)",
      image: "https://i.pravatar.cc/150?u=rahul",
      quote: "The foundation I received at SJIS was instrumental in my journey to one of the world's top universities."
    }
  ];

  const awards = [
    { title: 'Best School in Odisha', year: '2025', org: 'Education World' },
    { title: 'Excellence in Digital Learning', year: '2024', org: 'CBSE' },
    { title: 'International School Award', year: '2023-26', org: 'British Council' },
    { title: 'Green Campus Award', year: '2024', org: 'Standard Chartered' }
  ];

  const activities = [
    { title: 'Blood Donation Camp', icon: '🩸', desc: 'SJIS organizes annual blood donation camps to serve the community.' },
    { title: 'Annual Sports Meet', icon: '⚽', desc: 'Grand annual sports competition for all age groups.' },
    { title: 'Plantation Drive', icon: '🌳', desc: 'Promoting green earth through student-led plantation programs.' },
    { title: 'Media Radio Orange', icon: '📻', desc: 'Our SJIS Radio station managed by students.' }
  ];

  return (
    <Layout>
      <div className="bg-slate-50 font-sans overflow-hidden">
        {/* Hero Section */}
        <header className="relative px-6 md:px-12 pt-24 md:pt-40 pb-40 bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-secondary rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-secondary rounded-full blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <div className={`mb-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="inline-block px-6 py-2 rounded-full bg-brand-secondary/20 text-brand-secondary font-black text-sm uppercase tracking-[0.3em] backdrop-blur-md mb-6 border border-brand-secondary/30">
                Institution of Excellence
              </span>
              <h1 className="text-6xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-tight font-serif">
                Shaping <br />
                <span className="text-brand-secondary">Global Leaders.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed mb-12">
                A premier Class 1-12 institution in Bhubaneswar combining
                traditional wisdom with future-ready skills.
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transform transition-all delay-500 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button
                onClick={() => navigate('/admissions')}
                className="btn-secondary px-12 py-5 text-xl w-full sm:w-auto shadow-2xl shadow-brand-secondary/20 uppercase tracking-widest"
              >
                Explore Admissions
              </button>
              <button
                onClick={() => navigate('/about')}
                className="btn-primary border-white px-12 py-5 text-xl w-full sm:w-auto uppercase tracking-widest bg-transparent hover:bg-white hover:text-brand-primary">
                Our Vision
              </button>
            </div>
          </div>
        </header>

        {/* Floating Stats Section */}
        <section className="relative px-6 md:px-12 -mt-24 z-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card hover:-translate-y-2 transition-transform duration-500 p-10 flex flex-col items-center text-center shadow-2xl bg-white/95 border-b-4 border-brand-secondary">
                <span className="text-5xl font-black text-brand-primary mb-2 font-serif">{stat.value}</span>
                <span className="text-xs uppercase tracking-[0.2em] font-black text-slate-400 mb-1">{stat.label}</span>
                <span className="text-[10px] font-bold text-brand-secondary">{stat.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Awards & Recognition Section */}
        <section className="py-32 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <span className="text-brand-secondary font-black text-sm uppercase tracking-widest block mb-4">Honors & Accolades</span>
                <h2 className="text-5xl md:text-7xl font-black text-brand-primary leading-none font-serif">Awards & <br />Recognition</h2>
              </div>
              <p className="text-slate-500 font-medium text-lg max-w-sm">
                Consistently ranked as the Top International Day School in Odisha for institutional excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {awards.map((award, i) => (
                <div key={i} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-brand-primary transition-all duration-500 hover:shadow-2xl">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm group-hover:scale-110 transition-transform">🏆</div>
                  <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-white transition-colors">{award.title}</h3>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-200 mt-4 group-hover:border-white/20 transition-colors">
                    <span className="text-xs font-black text-brand-secondary">{award.org}</span>
                    <span className="text-sm font-bold text-slate-400 group-hover:text-white/60">{award.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimony Sections - Side by Side on large screens */}
        <section className="py-32 px-6 md:px-12 bg-slate-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-secondary/5 rounded-full blur-3xl"></div>
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20">
              {/* Teacher Testimonials */}
              <div>
                <h2 className="text-4xl font-black text-brand-primary mb-12 font-serif border-l-8 border-brand-secondary pl-6">What our Teachers say</h2>
                <div className="space-y-8">
                  {teacherTestimonials.map((t, i) => (
                    <div key={i} className="glass-card p-10 relative">
                      <div className="absolute -top-6 -left-6 text-8xl text-brand-secondary opacity-20 font-serif">"</div>
                      <p className="text-slate-600 font-medium text-lg mb-8 leading-relaxed italic z-10 relative">
                        {t.quote}
                      </p>
                      <div className="flex items-center gap-4">
                        <img src={t.image} alt={t.name} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-brand-secondary/20" />
                        <div>
                          <h4 className="font-black text-slate-900">{t.name}</h4>
                          <p className="text-xs font-bold text-brand-secondary uppercase tracking-widest">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Testimonials */}
              <div>
                <h2 className="text-4xl font-black text-slate-900 mb-12 font-serif border-l-8 border-brand-primary pl-6">What our Students say</h2>
                <div className="space-y-8">
                  {studentTestimonials.map((s, i) => (
                    <div key={i} className="glass-card p-10 relative bg-brand-primary text-white border-none shadow-brand-primary/20">
                      <div className="absolute -top-6 -right-6 text-8xl text-white opacity-10 font-serif">"</div>
                      <p className="text-slate-200 font-medium text-lg mb-8 leading-relaxed italic z-10 relative">
                        {s.quote}
                      </p>
                      <div className="flex items-center gap-4">
                        <img src={s.image} alt={s.name} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-white/20" />
                        <div>
                          <h4 className="font-black text-white">{s.name}</h4>
                          <p className="text-xs font-bold text-brand-secondary uppercase tracking-widest">{s.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Institutional Activities & Bus Facility */}
        <section className="py-32 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
            {/* Activities */}
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-black text-slate-900 mb-12 font-serif">Campus Life & Activities</h2>
              <div className="grid md:grid-cols-2 gap-8 text-white">
                {activities.map((act, i) => (
                  <div key={i} className="p-8 rounded-[3rem] bg-slate-900 hover:bg-brand-primary transition-all group overflow-hidden relative shadow-2xl">
                    <div className="absolute -right-8 -bottom-8 text-9xl transform rotate-12 opacity-5 translate-y-4 group-hover:translate-y-0 transition-transform">
                      {act.icon}
                    </div>
                    <div className="text-4xl mb-6">{act.icon}</div>
                    <h3 className="text-2xl font-black mb-4">{act.title}</h3>
                    <p className="text-slate-400 group-hover:text-slate-200 transition-colors text-sm font-medium leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bus Facility Overview */}
            <div className="p-12 rounded-[3.5rem] bg-brand-secondary text-brand-primary relative overflow-hidden shadow-2xl group cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => navigate('/about')}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
              <h2 className="text-3xl font-black mb-8 font-serif">Bus Facilities</h2>
              <p className="text-brand-primary/80 font-bold leading-relaxed mb-8">
                GPS tracked, fully air-conditioned buses covering 45+ routes across Bhubaneswar.
              </p>
              <div className="flex items-center gap-4 mb-10">
                <div className="px-4 py-2 bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest">Safe & Secure</div>
                <div className="px-4 py-2 bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest">GPS Tracked</div>
              </div>
              <div className="w-full aspect-video bg-white/30 rounded-3xl overflow-hidden shadow-inner">
                <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400" alt="SJIS Bus" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              </div>
              <button className="mt-8 text-xs font-black uppercase tracking-[0.3em] border-b-2 border-brand-primary pb-1 group-hover:tracking-[0.4em] transition-all">
                Learn More →
              </button>
            </div>
          </div>
        </section>

        {/* Media Gallery Preview */}
        <section className="py-32 px-6 md:px-12 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <h2 className="text-4xl font-black text-brand-primary font-serif">Media Gallery</h2>
              <Link to="/connect#gallery" className="text-brand-secondary font-black uppercase tracking-widest text-xs hover:tracking-[0.2em] transition-all">Explore Full Gallery →</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600",
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600",
                "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=600",
                "https://images.unsplash.com/photo-1427501748790-687e33027ab5?auto=format&fit=crop&w=600"
              ].map((url, i) => (
                <div key={i} className="aspect-square rounded-[2rem] overflow-hidden group relative shadow-xl">
                  <img src={url} alt={`SJIS Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="relative p-12 md:p-24 rounded-[4rem] bg-brand-primary text-white overflow-hidden text-center shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[100px]"></div>
              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter font-serif">Start Your Journey Today.</h2>
                <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium lead-relaxed">
                  Join our vibrant community of learners and achieve your true potential with SJIS Bhubaneswar.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button onClick={() => navigate('/admissions#apply')} className="btn-secondary px-12 py-5 text-xl tracking-widest uppercase">Apply for 2026-27</button>
                  <button onClick={() => navigate('/contact')} className="px-12 py-5 border-2 border-white rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-brand-primary transition-all">Contact Us</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Landing;
