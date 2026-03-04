import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/dashboard')
    }

    if (loading) {
        return (
            <main className="auth-main">
                <div className="form-container" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                    <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: '#e1034d', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.8)' }}>Signing you in...</p>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            </main>
        )
    }

    return (
        <main className="auth-main">
            <div className="form-container">
                <h1>Welcome Back</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email" id="email" name='email' placeholder='Enter your email' required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password" id="password" name='password' placeholder='Enter your password' required />
                    </div>
                    <button type="submit" className='primary-button'>Sign In</button>
                </form>
                <p className="footer-text">Don't have an account? <Link to={"/register"}>Create one</Link></p>
            </div>
        </main>
    )
}

export default Login