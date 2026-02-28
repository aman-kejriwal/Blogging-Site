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
    return <div className="flex justify-center">
        <div className="flex flex-col justify-center max-w-md h-screen w-1/2">
            <div className="text-center pb-5">
                <div className="font-extrabold text-3xl">
                    Create an account
                </div>
                <div className="text-slate-400 font-normal">
                    {type == 'signup' ? 'Already have an account?' : "Don't have an acccount?"}
                    <Link className="pl-1 underline" to={type == "signin" ? '/signup' : '/signin'}>
                        {type == 'signup' ? "Login" : "Signup"}
                    </Link>
                </div>
            </div>

            {/* {JSON.stringify(postInput)} */}
            <form onSubmit={(e) => {
                e.preventDefault();
                setError("");
                setLoading(true);
                sendRequest();
            }}>
                {type == 'signup' ?
                    <LabelledInput label="Username" placeholder="Enter your username" onChange={(e) => {
                        setPostInputs({
                            ...postInput,
                            name: e.target.value
                        })
                    }} />

                    : null}
                <LabelledInput label="Email" placeholder="m@example.com" type="email" onChange={(e) => {
                    setPostInputs({
                        ...postInput,
                        email: e.target.value
                    })
                }} />
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}
                <div className="py-2">
                    <label className="block mb-1.5 text-sm font-semibold text-heading">Password</label>
                    <div className="w-auto flex border border-slate-200 border-default-medium rounded-sm focus-within:ring-2 focus-within:ring-brand focus-within:border-brand focus-within:ring-blue-600">
                        <input type={passwordVisible} id="first_name" className="w-full border-none bg-transparent text-heading text-sm rounded-base block px-3 py-2.5 shadow-xs placeholder:text-body focus:outline-none focus:ring-0" placeholder="12345" onChange={(e) => {
                            setPostInputs({
                                ...postInput,
                                password: e.target.value
                            })
                        }} required />
                        <button type="button" className="h-10 w-10 ml-auto pr-3" onClick={() => {
                            setPasswordVisible(passwordVisible == "password" ? "text" : "password")
                        }}>
                            <img src={passwordVisible == "password" ? "/eye_closed.png" : "/eye_open.png"} alt="" />
                        </button>
                    </div>
                </div>
                <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-2.5 my-2 focus:outline-none bg-black text-white w-full disabled:opacity-50">
                    {loading && (
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    )}
                    {loading ? 'Loading...' : type === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
            </form>
        </div>
    </div>
    // return <div className="h-screen flex flex-col justify-center items-center">
    //     <div className="font-extrabold text-3xl">
    //         Create an account
    //     </div>
    //     <div className="text-slate-400 font-normal">
    //         Already have an account?
    //         <Link className="pl-1 underline" to={'/signin'}>Login</Link>
    //     </div>
    //     <div className="w-1/2 pt-5 grid grid-flow-row">
    //         <div className="py-2 font-medium">
    //             Username
    //         </div>
    //         <input className="py-2.5 px-3 border rounded-md" placeholder="Enter your username" />
    //         <div className="py-4 font-medium">
    //             Email
    //         </div>
    //         <input type="email" className="py-2.5 px-3 border rounded-md" placeholder="m@example.com" />
    //         <div className="py-4 font-medium">
    //             Password
    //         </div>
    //         <input type="password" className="py-2.5 px-3 border rounded-md"/>
    //         <button className="bg-black text-white py-3 rounded-md my-4" onClick={()=>{
    //             alert('Sign Up button is clicked')
    //         }}>
    //             Sign Up
    //         </button>
    //     </div>
    // </div>
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    type?: string
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div className="py-2">
        <label className="block mb-1.5 text-sm font-semibold text-heading">{label}</label>
        <input type={type} id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} onChange={onChange} required />
    </div>
}