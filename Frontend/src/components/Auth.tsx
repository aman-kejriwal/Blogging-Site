import axios from "axios"
import { useState, type ChangeEventHandler } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Backend_URL } from '../../config';

export const Auth = ({ type }: { type: 'signin' | 'signup' }) => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState("password");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [postInput, setPostInputs] = useState({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${Backend_URL}/api/v1/user/${type == 'signin' ? 'signin' : 'signup'}`, postInput);
            setLoading(false);
            const jwt = await response.data;
            localStorage.setItem("token", jwt);
            navigate('/blogs')
        } catch (error: any) {
            setLoading(false);
            console.log(error)
            const errorMessage = error.response?.data?.message || error.response?.data?.Message || error.response?.data?.error;
            if (errorMessage) {
                setError(errorMessage);
            } else {
                setError(`Error while ${type === 'signin' ? 'signing in' : 'signing up'}`);
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-surface-50 px-6">
            <div className="w-full max-w-md animate-fade-in-up" style={{ animationFillMode: 'both' }}>
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="font-serif text-4xl font-bold text-ink-400 mb-2">
                        {type === 'signin' ? 'Welcome back' : 'Join Medium'}
                    </h1>
                    <p className="text-ink-50 text-base font-light">
                        {type === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                        <Link
                            className="pl-1.5 text-ink-400 font-medium hover:text-brand-500 transition-colors duration-200 underline underline-offset-4 decoration-ink-400/30 hover:decoration-brand-500"
                            to={type === "signin" ? '/signup' : '/signin'}
                        >
                            {type === 'signup' ? "Sign in" : "Sign up"}
                        </Link>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setError("");
                    setLoading(true);
                    sendRequest();
                }} className="space-y-5">
                    {type === 'signup' && (
                        <LabelledInput
                            label="Username"
                            placeholder="Enter your username"
                            onChange={(e) => {
                                setPostInputs({
                                    ...postInput,
                                    name: e.target.value
                                })
                            }}
                        />
                    )}

                    <LabelledInput
                        label="Email"
                        placeholder="you@example.com"
                        type="email"
                        onChange={(e) => {
                            setPostInputs({
                                ...postInput,
                                email: e.target.value
                            })
                        }}
                    />

                    {error && (
                        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                            <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <p className="text-red-600 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Password field */}
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-ink-300">
                            Password
                        </label>
                        <div className="relative group">
                            <input
                                type={passwordVisible}
                                className="input-premium pr-12"
                                placeholder="••••••••"
                                onChange={(e) => {
                                    setPostInputs({
                                        ...postInput,
                                        password: e.target.value
                                    })
                                }}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-surface-300 hover:text-ink-200 transition-colors duration-200"
                                onClick={() => {
                                    setPasswordVisible(passwordVisible === "password" ? "text" : "password")
                                }}
                            >
                                {passwordVisible === "password" ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2.5 py-3 text-[15px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                        {loading && (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        )}
                        {loading ? 'Loading...' : type === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                {/* Divider & Social hint */}
                <div className="mt-8 flex items-center gap-4">
                    <div className="flex-1 h-px bg-surface-200" />
                    <span className="text-xs text-ink-50 font-light uppercase tracking-wider">or</span>
                    <div className="flex-1 h-px bg-surface-200" />
                </div>
                <p className="text-center text-sm text-ink-50 font-light mt-4">
                    {type === 'signin'
                        ? 'Sign in with your email and password'
                        : 'By creating an account, you agree to our Terms of Service'
                    }
                </p>
            </div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-ink-300">
                {label}
            </label>
            <input
                type={type}
                className="input-premium"
                placeholder={placeholder}
                onChange={onChange}
                required
            />
        </div>
    );
}