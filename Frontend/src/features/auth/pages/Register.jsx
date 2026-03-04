import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        const result = await handleRegister({ username, email, password })

        if (result.success) {
            navigate('/dashboard')
        } else {
            setError(result.error)
        }
    }

    if (loading) {
        return (
            <main className="auth-main">
                <div className="form-container" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
                    <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: '#e1034d', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                    <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.8)' }}>Creating your account...</p>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            </main>
        )
    }

    return (
        <main className="auth-main">
            <div className="form-container">
                <h1>Create Account</h1>

                {error && (
                    <div style={{ padding: '0.75rem', marginBottom: '1rem', backgroundColor: 'rgba(225, 3, 77, 0.1)', border: '1px solid rgba(225, 3, 77, 0.3)', borderRadius: '6px', color: '#ff4d6d', fontSize: '0.875rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text" id="username" name='username' placeholder='Choose a username' required />
                    </div>
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
                            type="password" id="password" name='password' placeholder='Create a password' required />
                    </div>

                    <button type="submit" className='primary-button'>Sign Up</button>

                </form>

                <p className="footer-text">Already have an account? <Link to={"/login"}>Sign In</Link></p>
            </div>
        </main>
    )
}

export default Register