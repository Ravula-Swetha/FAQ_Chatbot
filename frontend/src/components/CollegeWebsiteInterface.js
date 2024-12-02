import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle } from 'lucide-react';
import './CollegeWebsiteInterface.css';

const CollegeWebsiteInterface = () => {
    const [showChat, setShowChat] = useState(false);
    const [activePage, setActivePage] = useState('dashboard');
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", sender: 'bot' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        setMessages([...messages, { text: inputMessage, sender: 'user' }]);
        setInputMessage('');

        try {
            // Call the backend API
            const response = await axios.post('http://localhost:5000/rag', {
                query: inputMessage,
            });
    
            // Display the response from the backend
            setMessages((prev) => [...prev, { text: response.data.response, sender: 'bot' }]);
        } catch (error) {
            setMessages((prev) => [...prev, { text: "Error: Unable to fetch a response.", sender: 'bot' }]);
            console.error("Backend error:", error);
        }
    };

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return (
                    <div className="container">
                        <h2 className="display-5 mb-4">Dashboard</h2>
                        <div className="card mb-4 p-3">
                            <h3 className="h5">Welcome To Keshav Memorial Institute of Technology</h3>
                            <p>KESHAV MEMORIAL INSTITUTE OF TECHNOLOGY (KMIT), established in 2007...</p>
                        </div>
                        <div className="card mb-4 p-3">
                            <h3 className="h5">Why KMIT?</h3>
                            <p>KMIT has carved a niche for itself by focusing on providing holistic education...</p>
                        </div>
                        <div className="card mb-4 p-3">
                            <h3 className="h5">Quick Links</h3>
                            <div className="d-flex flex-wrap">
                                <a href="#" className="text-primary me-3">Student Portal</a>
                                <a href="#" className="text-primary me-3">Course Catalog</a>
                                <a href="#" className="text-primary me-3">Library Resources</a>
                                <a href="#" className="text-primary">Career Services</a>
                            </div>
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div className="container">
                        <h2 className="display-6 mb-4">About KMIT</h2>
                        <p>Keshav Memorial Institute of Technology (KMIT) is a premier engineering college...</p>
                        <ul>
                            <li>AICTE approved and NAAC accredited institution</li>
                            <li>Offers B.Tech programs in various engineering disciplines</li>
                        </ul>
                    </div>
                );
            case 'events':
                return (
                    <div className="container">
                        <h2 className="display-6 mb-4">Upcoming Events</h2>
                        <div className="card mb-3 p-3">
                            <h3 className="h5">Synergy 2024</h3>
                            <p>Date: March 15-17, 2024...</p>
                        </div>
                        <div className="card mb-3 p-3">
                            <h3 className="h5">Tech Symposium</h3>
                            <p>Date: April 5, 2024...</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="app">
            <header className="bg-primary text-white p-3">
                <div className="container d-flex justify-content-between">
                    <h1 className="display-6">Keshav Memorial Institute of Technology</h1>
                    <nav>
                        <ul className="nav">
                            {['dashboard', 'about', 'events'].map((page) => (
                                <li key={page} className="nav-item">
                                    <button
                                        onClick={() => setActivePage(page)}
                                        className={`nav-link ${activePage === page ? 'active' : ''}`}
                                    >
                                        {page.charAt(0).toUpperCase() + page.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="container my-4">
                {renderContent()}
            </main>

            <div className="fixed-bottom me-4 mb-4 text-end">
                <button
                    onClick={() => setShowChat(!showChat)}
                    className="btn btn-primary rounded-circle"
                >
                    <MessageCircle size={24} />
                </button>
            </div>

            {showChat && (
                <div className="chat-container">
                    <div className="chat-header p-3 border-bottom">
                        <h1 className="h5">KMIT Chatbot</h1>
                    </div>
                    <div className="chat-messages p-3 overflow-auto">
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-2 ${message.sender === 'user' ? 'text-end' : ''}`}>
                                <div className={`chat-bubble ${message.sender}`}>
                                    <p>{message.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSendMessage} className="p-3 border-top">
                        <div className="input-group">
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                className="form-control"
                                placeholder="Type your message..."
                            />
                            <button type="submit" className="btn btn-primary">Send</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CollegeWebsiteInterface;
