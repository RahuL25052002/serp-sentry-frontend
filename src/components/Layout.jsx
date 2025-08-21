import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';

const Layout = () => {
    const location = useLocation();
    const path = location.pathname.toLowerCase();
    const fullBleedBases = [
        '/about', '/aboutus', '/about-us',
        '/contact', '/extract-keywords',
        '/individual-dashboard', '/add', '/get-rank',
        '/admin-dashboard', '/viewallusers'
    ];
    const isFullBleed = fullBleedBases.some(base => path === base || path.startsWith(base + '/'));

    return (
        <>
            <Navbar />
            <div className={isFullBleed ? 'container-fluid p-0' : 'container mt-4'}>
                <Outlet />
            </div>
        </>
    );
};

export default Layout;
