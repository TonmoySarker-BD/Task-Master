import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const RootLayout = () => {
    return (
        <>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='min-h-[calc(100vh-200px)] -mb-20'>
                <Outlet></Outlet>
            </main>
            <footer className='-mb-6'>
                <Footer></Footer>
            </footer>
        </>
    );
};

export default RootLayout;