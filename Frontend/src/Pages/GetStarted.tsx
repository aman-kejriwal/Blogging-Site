import { Footer } from "../components/Footer"
import { useNavigate } from "react-router-dom"

export const GetStarted = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(180deg, #faf7f2 0%, #f5f0e8 50%, #faf7f2 100%)" }}>
            {/* Navigation */}
            <nav className="flex items-center w-full px-8 md:px-16 lg:px-24 py-5">
                <img className="h-10 md:h-12" src="/medium.png" alt="Medium" />
                <div className="ml-auto flex items-center gap-4 md:gap-7">
                    <button className="nav-link hidden md:block text-[15px]">Our story</button>
                    <button className="nav-link hidden md:block text-[15px]">Membership</button>
                    <button className="nav-link hidden md:block text-[15px]"
                        onClick={() => navigate('/signin')}>Write</button>
                    <button className="nav-link text-[15px]"
                        onClick={() => navigate('/signin')}>Sign in</button>
                    <button className="btn-primary text-sm px-5 py-2"
                        onClick={() => navigate('/signin')}>Get Started</button>
                </div>
            </nav>

            {/* Divider */}
            <div className="h-px bg-black/5" />

            {/* Hero Section */}
            <div className="flex-1 flex items-center">
                <div className="flex w-full py-12 md:py-0">
                    <div className="max-w-5xl pt-40 pl-32">
                        <h1 className="font-serif leading-[0.95] tracking-tight animate-fade-in-up"
                            style={{ fontSize: 'clamp(3.5rem, 8vw, 10rem)', animationDelay: '0.1s', animationFillMode: 'both' }}>
                            Human
                        </h1>
                        <h1 className="font-serif leading-[0.95] tracking-tight animate-fade-in-up"
                            style={{ fontSize: 'clamp(3.5rem, 8vw, 10rem)', animationDelay: '0.25s', animationFillMode: 'both' }}>
                            stories & ideas
                        </h1>

                        <p className="text-lg md:text-2xl font-light mt-8 max-w-lg leading-relaxed animate-fade-in-up"
                            style={{ color: '#57534e', animationDelay: '0.4s', animationFillMode: 'both' }}>
                            A place to read, write, and deepen your understanding
                        </p>

                        <button
                            className="btn-primary mt-10 px-10 md:px-14 py-3.5 text-lg md:text-xl font-light animate-fade-in-up"
                            style={{ animationDelay: '0.55s', animationFillMode: 'both' }}
                            onClick={() => navigate('/signin')}
                        >
                            Start Reading
                        </button>
                    </div>
                    <div className="ml-auto hidden lg:flex items-center pt-8">
                        <img
                            className="max-w-sm xl:max-w-lg animate-fade-in"
                            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
                            src="/medium_start_page.png"
                            alt="Medium illustration"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
