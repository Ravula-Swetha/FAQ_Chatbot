import React, { useState } from 'react';
import './CSS/CollegeWebsiteInterface.css';
import Navigation from './Navigation';
import PageContent from './PageContent';
import Chatbot from './Chatbot';
import Footer from './Footer';

const CollegeWebsiteInterface = () => {
    const [activePage, setActivePage] = useState('dashboard');

    return (
        <div className="app">
            <Navigation activePage={activePage} setActivePage={setActivePage} />
            <main className="container">
                <PageContent activePage={activePage} />
            </main>
            <Footer />
            <Chatbot />
        </div>
    );
};

export default CollegeWebsiteInterface;
