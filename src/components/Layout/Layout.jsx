import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            <Navbar />
            <main className="flex-grow relative z-10">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
