import React from 'react';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <main className="container-custom py-8">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
