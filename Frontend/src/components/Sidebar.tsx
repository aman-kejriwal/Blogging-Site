import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    userName?: string;
}

export const Sidebar = ({ isOpen, onClose, userName }: SidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMounted(true);
            // Double rAF ensures the browser paints the initial (hidden) state before animating in
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setVisible(true);
                });
            });
        } else {
            setVisible(false);
            const timer = setTimeout(() => setMounted(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    function handleClose() {
        onClose();
    }

    function handleNav(path: string) {
        // onClose();
        setTimeout(() => navigate(path), 320);
    }

    if (!mounted) return null;

    const isActive = (path: string) => location.pathname === path;

    const backdropStyle: React.CSSProperties = {
        position: 'fixed',
        top: '74px',
        left: '0px',
        right: '0px',
        height: 'calc(100vh - 97px)',
        background: 'transparent',
        zIndex: 998,
    };

    const panelStyle: React.CSSProperties = {
        position: 'fixed',
        top: '74px',
        left: '0px',
        height: 'calc(100vh - 74px)',
        width: '280px',
        maxWidth: '85vw',
        background: '#fafaf9',
        zIndex: 999,
        transform: visible ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #e7e5e4',
        overflowY: 'auto',
    };

    const sectionLabelStyle: React.CSSProperties = {
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: '#a8a29e',
        padding: '8px 12px 4px',
        margin: 0,
    };

    const navStyle: React.CSSProperties = {
        padding: '8px 12px',
    };

    const navItemBase: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: '100%',
        padding: '10px 12px',
        borderRadius: 10,
        border: 'none',
        background: 'transparent',
        fontSize: 14,
        fontFamily: 'inherit',
        color: '#57534e',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    };

    const navItemActive: React.CSSProperties = {
        ...navItemBase,
        background: 'rgba(26, 137, 23, 0.08)',
        color: '#1a8917',
        fontWeight: 500,
    };

    const iconStyle: React.CSSProperties = {
        width: 20,
        height: 20,
        flexShrink: 0,
    };

    const dividerStyle: React.CSSProperties = {
        height: 1,
        background: 'linear-gradient(90deg, transparent, #d6d3d1, transparent)',
        margin: '0 16px',
    };

    return (
        <>
            {/* Backdrop */}
            <div style={backdropStyle} onClick={handleClose} />

            {/* Sidebar Panel */}
            <aside style={panelStyle}>

                {/* Navigation */}
                <nav style={navStyle}>
                    <p style={sectionLabelStyle}>Navigation</p>

                    <button
                        style={isActive("/blogs") ? navItemActive : navItemBase}
                        onClick={() => handleNav("/blogs")}
                        onMouseEnter={e => { if (!isActive("/blogs")) { e.currentTarget.style.background = '#f5f5f4'; e.currentTarget.style.color = '#1c1917'; } }}
                        onMouseLeave={e => { if (!isActive("/blogs")) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#57534e'; } }}
                    >
                        <svg style={{ ...iconStyle, color: isActive("/blogs") ? '#1a8917' : undefined }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span>Home</span>
                    </button>

                    <button
                        style={isActive("/publish") ? navItemActive : navItemBase}
                        onClick={() => handleNav("/publish")}
                        onMouseEnter={e => { if (!isActive("/publish")) { e.currentTarget.style.background = '#f5f5f4'; e.currentTarget.style.color = '#1c1917'; } }}
                        onMouseLeave={e => { if (!isActive("/publish")) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#57534e'; } }}
                    >
                        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        <span>Write</span>
                    </button>
                </nav>

                <div style={dividerStyle} />

                {/* Explore section */}
                <nav style={navStyle}>
                    <p style={sectionLabelStyle}>Discover</p>

                    <button
                        style={navItemBase}
                        onClick={() => handleNav("/blogs")}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f4'; e.currentTarget.style.color = '#1c1917'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#57534e'; }}
                    >
                        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                        <span>Reading List</span>
                    </button>

                    <button
                        style={navItemBase}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f4'; e.currentTarget.style.color = '#1c1917'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#57534e'; }}
                    >
                        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>
                        <span>Explore Topics</span>
                    </button>
                </nav>

                <div style={dividerStyle} />

                {/* Settings section */}
                <nav style={navStyle}>
                    <p style={sectionLabelStyle}>Account</p>

                    <button
                        style={navItemBase}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f4'; e.currentTarget.style.color = '#1c1917'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#57534e'; }}
                    >
                        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Settings</span>
                    </button>

                    <button
                        style={navItemBase}
                        onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f4'; e.currentTarget.style.color = '#1c1917'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#57534e'; }}
                    >
                        <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                        <span>Help</span>
                    </button>
                </nav>

                {/* Footer */}
                <div style={{ marginTop: 'auto', paddingBottom: 16 }}>
                    <div style={{ ...dividerStyle, margin: '0' }} />
                    <div style={{ padding: '8px 12px' }}>
                        <button
                            style={navItemBase}
                            onClick={() => {
                                localStorage.removeItem("token");
                                handleClose();
                                setTimeout(() => navigate("/getstarted"), 320);
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#dc2626'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#57534e'; }}
                        >
                            <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                            <span>Sign out</span>
                        </button>
                    </div>
                    {userName && (
                        <p style={{ fontSize: 12, color: '#a8a29e', padding: '4px 24px', margin: 0 }}>{userName}</p>
                    )}
                </div>
            </aside>
        </>
    );
};
