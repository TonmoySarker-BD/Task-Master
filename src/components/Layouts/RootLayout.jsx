import React from 'react';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <>
            <header>
                <h1>My Website</h1>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <p>© 2025 My Website</p>
            </footer>
        </>
    );
};

export default RootLayout;