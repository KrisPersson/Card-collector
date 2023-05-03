import "./LoginSignupView.css"
import { useState } from 'react'

function LoginSignupView() {

    const [isSignupMode, setIsSignupMode] = useState(false)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    function handleSubmit() {

        const input = {
            username: username,
            password: password
        }

        if (isSignupMode) {
            console.log('Sign up')
        } else {
            console.log('Login')
        }
    }

    return (
        <div className="view login-signup-view">
            <h1>Card Collector</h1>
            <section className="signup-box">
                <h2>{ isSignupMode ? 'Sign up' : 'Log in'}</h2>
                <form onSubmit={ handleSubmit }>
                    <label>
                        Username
                        <input onChange={(e) => setUsername(e.target.value)} type="text" min={3} max={20} required />
                    </label>
                    <label>
                        Password
                        <input onChange={(e) => setPassword(e.target.value)}type="password" min={3} max={20} required />
                    </label>
                <button>{ isSignupMode ? 'Sign up' : 'Log in'}</button>
                </form>
                <p>{ isSignupMode ? 'Already have an account? Login ' 
                : "Don't have an account? Signup " } <span className="click-here" onClick={ ()=> setIsSignupMode(cur => !cur) }>here</span></p>
            </section>
        </div>
    )
}

export default LoginSignupView
