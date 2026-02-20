import { Avatar } from "./Avatar"

export const AppBar = () => {
    return <div>
        <div className="px-12 py-3 flex">
            <div className="flex">
                <img className="h-14" src="/medium.png" alt="" />
                <h3 className="self-center px-4 text-lg font-serif">Draft in Kirags</h3>
            </div>
            <div className="ml-auto flex gap-5">
                <button className="bg-green-500 rounded-full px-4 py-2 mr-4 h-min self-center">Publish</button>
                <button>
                    <img className="h-6 w-6" src="/more.png" alt="Button Icon" />
                </button>
                <button>
                    <img className="h-6 self-center" src="/bell.png" alt="bell" />
                </button>
                <Avatar name="Aman Kumar" />
            </div>
        </div>
        <div className="bg-slate-200 h-px"></div>
    </div>
}