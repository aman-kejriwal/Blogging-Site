import { useEffect, useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Backend_URL, clientId } from "../../config";
import axios from "axios";

function SignupDialogInner({ onClose, type }: { onClose: () => void, type?: 'signin' | 'signup' }) {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.post(`${Backend_URL}/api/v1/user/google-auth`, {
                    token: tokenResponse.access_token,
                });
                localStorage.setItem("token", res.data);
                setLoading(false);
                navigate("/blogs");
            } catch (err: any) {
                setLoading(false);
                alert(err.response?.data?.error || "Login failed");
                console.log(err);
            }
        },
        onError: () => {
            alert("Login Failed");
            console.log("Login Failed");
        },
    });

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true));
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    function handleClose() {
        setVisible(false);
        setTimeout(() => onClose(), 300);
    }
    if (loading) {
        return (
            <div className="signup-backdrop signup-backdrop--visible" style={{ zIndex: 9999 }}>
                <style>{`
                    @keyframes morphBlob {
                        0%, 100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; transform: rotate(0deg) scale(1); }
                        25% { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; transform: rotate(90deg) scale(1.05); }
                        50% { border-radius: 30% 70% 40% 60% / 55% 30% 70% 45%; transform: rotate(180deg) scale(0.95); }
                        75% { border-radius: 55% 45% 60% 40% / 40% 70% 30% 60%; transform: rotate(270deg) scale(1.02); }
                    }
                    @keyframes dotBounce {
                        0%, 80%, 100% { transform: scale(0.4); opacity: 0.3; }
                        40% { transform: scale(1); opacity: 1; }
                    }
                    @keyframes fadeSlideUp {
                        from { opacity: 0; transform: translateY(12px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
                <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px',
                    animation: 'fadeSlideUp 0.5s ease-out'
                }}>
                    {/* Morphing blob */}
                    <div style={{
                        width: '80px', height: '80px',
                        background: 'linear-gradient(135deg, #1a8917 0%, #0d6b0d 50%, #156d12 100%)',
                        animation: 'morphBlob 4s ease-in-out infinite',
                        boxShadow: '0 8px 40px rgba(26, 137, 23, 0.35)',
                    }} />

                    {/* Bouncing dots */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {[0, 1, 2].map(i => (
                            <div key={i} style={{
                                width: '10px', height: '10px', borderRadius: '50%',
                                backgroundColor: '#1a8917',
                                animation: `dotBounce 1.4s ease-in-out ${i * 0.16}s infinite`,
                            }} />
                        ))}
                    </div>

                    {/* Text */}
                    <p style={{
                        color: 'rgba(41, 41, 41, 0.7)', fontSize: '15px',
                        fontFamily: 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif',
                        letterSpacing: '0.5px', fontWeight: 400,
                    }}>
                        Signing you in...
                    </p>
                </div>
            </div>
        );
    }
    return (

        <div
            className={`signup-backdrop ${visible ? "signup-backdrop--visible" : ""}`}
            onClick={handleClose}
        >
            <div
                className={`signup-modal ${visible ? "signup-modal--visible" : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    className="signup-close"
                    onClick={handleClose}
                    aria-label="Close"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Content */}
                <div className="signup-content">
                    {/* Header */}
                    <div className="signup-header">
                        <h2 className="signup-title">Join Medium.</h2>
                    </div>

                    {/* Auth Buttons */}
                    <div className="signup-buttons">
                        {/* Google button — custom styled */}
                        <button
                            className="signup-social-btn"
                            onClick={() => {
                                setLoading(true);
                                googleLogin()
                            }}
                        >
                            <svg className="signup-social-icon" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span>{type === 'signin' ? 'Sign in' : 'Sign up'} with Google</span>
                        </button>

                        {/* Facebook button */}
                        <button className="signup-social-btn">
                            <svg className="signup-social-icon" viewBox="0 0 24 24" fill="#1877F2">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span>{type === 'signin' ? 'Sign in' : 'Sign up'} with Facebook</span>
                        </button>

                        {/* Email button */}
                        <button
                            className="signup-social-btn"
                            onClick={() => { navigate(type === 'signin' ? '/signin' : '/signup') }}
                        >
                            <svg className="signup-social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="3" />
                                <path d="M2 7l10 6 10-6" />
                            </svg>
                            <span>{type === 'signin' ? 'Sign in' : 'Sign up'} with email</span>
                        </button>
                    </div>

                    {/* Already have account */}
                    <div className="signup-footer">
                        <p className="signup-footer-text">
                            Already have an account?{" "}
                            <button
                                className="signup-footer-link"
                                onClick={() => navigate("/signin")}
                            >
                                Sign in
                            </button>
                        </p>
                    </div>

                    {/* Terms */}
                    <p className="signup-terms">
                        Click "Sign up" to agree to Medium's{" "}
                        <a href="#" className="signup-terms-link">Terms of Service</a> and acknowledge that Medium's{" "}
                        <a href="#" className="signup-terms-link">Privacy Policy</a> applies to you.
                    </p>
                </div>
            </div>
        </div>
    );
}

export function SignupDialog({ onClose, type }: { onClose: () => void, type?: 'signin' | 'signup' }) {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <SignupDialogInner onClose={onClose} type={type} />
        </GoogleOAuthProvider>
    );
}