import { Footer } from "../components/Footer"
import { useNavigate } from "react-router-dom"

export const GetStarted = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen">
            <div className="flex w-screen px-24 py-3">
                <img className="h-14 ml-10" src="/medium.png" alt="" />
                <div className="ml-auto self-center flex gap-6 mr-10">
                    <button className="text-black font-light">Our story</button>
                    <button className="text-black font-light">Membership</button>
                    <button className="text-black font-light"
                        onClick={() => {
                            navigate('/signin')
                        }}>Write</button>
                    <button className="text-black font-light"
                        onClick={() => {
                            navigate('/signin')
                        }}>Sign in</button>
                    <button className="bg-black rounded-full text-white px-4 py-2 font-extralight"
                        onClick={() => {
                            navigate('/signin')
                        }}>Get Started</button>
                </div>
            </div>
            <div className="border bg-black h-0.5"></div>
            <div className="flex">
                <div className="max-w-4xl ml-36 mt-24">
                    <div className="text-9xl font-serif pt-20 ">
                        Human <br />
                        stories & ideas
                    </div>
                    <div className="text-2xl font-light pt-10">A place to read, write, and deepen you understanding</div>
                    <button className="bg-black rounded-full text-white px-12 py-3 font-light mt-10 text-xl" onClick={() => {
                        navigate('/signin')
                    }}>Start Reading</button>
                </div>
                <div className="ml-auto pt-10">
                    <img className="max-w-lg" src="/medium_start_page.png" alt="" />
                </div>
            </div>
            <Footer />
        </div>
    )
}
