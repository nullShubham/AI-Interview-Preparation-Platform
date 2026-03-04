import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';
import '../style/landing.scss';

const Landing = () => {
    const navigate = useNavigate();
    const { user, handleLogout } = useAuth();

    return (
        <div className="landing-page">
            <nav className="landing-nav">
                <div className="landing-nav__logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M8 13h2" /><path d="M8 17h2" /><path d="M14 13h2" /><path d="M14 17h2" /></svg>
                    <span>InterviewAI</span>
                </div>
                <div className="landing-nav__actions">
                    {user ? (
                        <>
                            <button className="btn btn--outline" onClick={async () => { await handleLogout(); navigate('/login'); }}>Logout</button>
                            <button className="btn btn--primary" onClick={() => navigate('/dashboard')}>Dashboard</button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn--outline" onClick={() => navigate('/login')}>Login</button>
                            <button className="btn btn--primary" onClick={() => navigate('/register')}>Sign Up</button>
                        </>
                    )}
                </div>
            </nav>

            <header className="landing-hero">
                <div className="landing-hero__content">
                    <h1>Nail Your Next Interview with <br /><span className="highlight">AI-Powered Strategy</span></h1>
                    <p>Stop guessing what they'll ask. Upload your resume and the job description, and let our advanced AI generate a personalized, day-by-day preparation roadmap tailored exactly to your dream role.</p>
                    <div className="landing-hero__cta">
                        {user ? (
                            <button className="btn btn--primary btn--large" onClick={() => navigate('/dashboard')}>Go to My Dashboard</button>
                        ) : (
                            <>
                                <button className="btn btn--primary btn--large" onClick={() => navigate('/register')}>Start Preparing for Free</button>
                                <button className="btn btn--outline btn--large" onClick={() => navigate('/login')}>I Already Have an Account</button>
                            </>
                        )}
                    </div>
                </div>
                <div className="landing-hero__image">
                    <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Professional Interview Presentation" />
                    <div className="floating-card floating-card--top">
                        <span className="icon">🎯</span>
                        <div>
                            <strong>Match Score: 92%</strong>
                            <span>Strong fit detected</span>
                        </div>
                    </div>
                </div>
            </header>

            <section className="landing-features">
                <h2>How It Works</h2>
                <div className="feature-grid">
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
                        </div>
                        <h3>1. Upload Details</h3>
                        <p>Provide the job description and your current resume. We securely analyze the overlap to spot your exact strengths and critical gaps.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                        </div>
                        <h3>2. AI Analysis</h3>
                        <p>Our intelligent system generates potential technical and behavioral questions specifically targeted to to the role you applied for.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
                        </div>
                        <h3>3. Daily Roadmap</h3>
                        <p>Receive a structured, day-by-day preparation timeline ensuring you cover all your bases before the big day.</p>
                    </div>
                </div>
            </section>

            <section className="landing-banner">
                <div className="landing-banner__inner">
                    <div className="landing-banner__text">
                        <h2>Ready to secure that offer?</h2>
                        <p>Join thousands of candidates who used AI to land their dream jobs.</p>
                    </div>
                    {user ? (
                        <button className="btn btn--primary btn--large" onClick={() => navigate('/dashboard')}>Continue Preparing</button>
                    ) : (
                        <button className="btn btn--primary btn--large" onClick={() => navigate('/register')}>Create Your Free Plan</button>
                    )}
                </div>
            </section>

            <footer className="landing-footer">
                <div className="landing-footer__logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                    <span>InterviewAI</span>
                </div>
                <p>&copy; {new Date().getFullYear()} InterviewAI Inc. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
