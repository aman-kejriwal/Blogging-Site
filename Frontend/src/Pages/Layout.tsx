import { Outlet } from "react-router-dom";
import { AppBar } from "../components/AppBar";

export const Layout = () => {
    return (
        <div>
            <AppBar />
            <main><Outlet /></main>
        </div>
    );
};