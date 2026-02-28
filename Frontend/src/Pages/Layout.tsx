import { Outlet } from "react-router-dom";
import { AppBar } from "../components/AppBar";

export const Layout = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md">
                <AppBar />
            </div>
            <main>
                <Outlet />
            </main>
        </div>
    );
};