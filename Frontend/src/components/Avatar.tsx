export const Avatar = ({ name }: { name: string | null }) => {
    return <button data-dropdown-toggle="dropdownInformation">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-neutral-tertiary rounded-full bg-blue-500 self-center">
            <span className="font-medium text-body">{(() => {
                if (!name) return "UA";
                const words = name.split(" ");
                return words[0][0] + "" + words[1][0];
            })()}</span>
        </div>
    </button>

}