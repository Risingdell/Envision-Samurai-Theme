import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Events.css';
// Re-using the main background for consistency, or a specific one if available
import mainBg from '../assets/main-bg.png';

export default function Events() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeDay, setActiveDay] = useState('All Days');
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Categories');

    const categories = [
        'All Categories',
        'Sports and Gaming',
        'Literary',
        'Technical',
        'Cultural',
        'Fine Arts'
    ];

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setShowCategoryDropdown(false);
    };

    return (
        <div className="events-root" style={{ backgroundImage: `url(${mainBg})` }}>
            <div className="events-overlay"></div>

            {/* Top Navigation Bar */}
            <nav className="events-nav">
                <Link to="/" className="nav-btn back-btn">
                    <svg viewBox="0 0 24 24" className="icon"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                    Go to Home
                </Link>
                <div className="nav-right">
                    <Link to="/profile" className="nav-btn dashboard-btn">
                        Dashboard
                        <svg viewBox="0 0 24 24" className="icon arrow-right"><path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                    </Link>
                </div>
            </nav>

            {/* Main Content Glass Container */}
            <div className="events-glass-container">
                <h1 className="events-title">Events</h1>
                <p className="events-subtitle">20+ Events, Infinite Possibilities – Ignite Your Passion, Unleash Your Talent!</p>

                {/* Info Card */}
                <div className="events-info-card">
                    <div className="info-main-text">
                        Register <span className="highlight-text">₹000</span> and participate in <span className="highlight-text"> events</span>
                    </div>
                    <div className="info-sub-text">— no extra charges later!</div>
                    <div className="info-divider"></div>
                    <div className="info-contacts">
                        <div className="contact-item">
                            <span className="phone-icon">📞</span> add number
                        </div>
                        <div className="contact-item">
                            <span className="phone-icon">📞</span> add number
                        </div>
                        <div className="contact-item">
                            <span className="phone-icon">📞</span> add number
                        </div>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="events-filters">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search epic quests here..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg viewBox="0 0 24 24" className="search-icon"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                    </div>

                    <div className="filter-buttons">
                        <div className="category-dropdown-container">
                            <button
                                className={`filter-btn ${showCategoryDropdown ? 'active' : ''}`}
                                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                            >
                                <span className="icon">✨</span> {selectedCategory}
                            </button>
                            {showCategoryDropdown && (
                                <div className="category-dropdown-menu">
                                    {categories.map((cat) => (
                                        <div
                                            key={cat}
                                            className="category-item"
                                            onClick={() => handleCategorySelect(cat)}
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <button className="filter-btn">
                            <span className="icon">📖</span> Rule Book
                        </button>
                        <button className="filter-btn">
                            <span className="icon">🕒</span> Schedule
                        </button>
                    </div>
                </div>
                {/* Events List / Empty State */}
                <div className="events-grid-empty">
                    <p>No events found matching your criteria.</p>
                </div>
            </div>
        </div>
    );
}
