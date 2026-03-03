import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppBar } from "../components/AppBar";

export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white">
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
                <AppBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            </div>
            <main
                style={{
                    transform: sidebarOpen ? 'translateX(280px)' : 'translateX(0)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            >
                <Outlet />
            </main>
        </div>
    );
};