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
                "data:image/jpeg;base64,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",
                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600",
                "data:image/jpeg;base64,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",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA0yaeyNP6AvPFi8UPkollRx4L4_nElH8n1A&s"
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
