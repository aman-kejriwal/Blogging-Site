import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLibrary } from "../hooks";
import axios from "axios";
import { Backend_URL } from "../../config";

interface LibraryPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    anchorRef: React.RefObject<HTMLElement | null>;
}

export function LibraryPopover({ isOpen, onClose, anchorRef }: LibraryPopoverProps) {
    const { library, loading } = useLibrary();
    const popoverRef = useRef<HTMLDivElement>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [creating, setCreating] = useState(false);

    // Position the popover below the anchor element
    useEffect(() => {
        if (!isOpen || !anchorRef.current || !popoverRef.current) return;

        const anchor = anchorRef.current;
        const rect = anchor.getBoundingClientRect();

        popoverRef.current.style.top = `${rect.bottom + window.scrollY + 8}px`;
        popoverRef.current.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
    }, [isOpen, anchorRef]);

    // Reset form state when popover closes
    useEffect(() => {
        if (!isOpen) {
            setShowCreateForm(false);
            setNewListName("");
        }
    }, [isOpen]);

    const handleCreateLibrary = async () => {
        if (!newListName.trim()) return;

        const token = localStorage.getItem("token");
        if (!token) return;

        setCreating(true);
        try {
            await axios.post(`${Backend_URL}/api/v1/blog/library`, {
                name: newListName.trim(),
                userId: library[0].userId
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNewListName("");
            setShowCreateForm(false);
            onClose();
        } catch (err) {
            console.error("Failed to create library:", err);
        } finally {
            setCreating(false);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[9998]"
                onClick={onClose}
            />

            {/* Popover */}
            <div
                ref={popoverRef}
                className="absolute z-[9999] -translate-x-1/2 bg-white py-4 px-3 rounded-lg shadow-2xl min-w-[220px]"
            >
                {/* Library list */}
                <div className="flex flex-col gap-1 mb-4">
                    {loading ? (
                        <div className="flex justify-center items-center w-full py-2">
                            <svg className="animate-spin h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        </div>
                    ) : (
                        library.map((item) => (
                            <div className="flex items-center py-1" key={item.id}>
                                <input
                                    id={`lib-checkbox-${item.id}`}
                                    type="checkbox"
                                    className="w-4 h-4 cursor-pointer border border-gray-300 rounded bg-white focus:ring-2 focus:ring-green-200"
                                />
                                <label
                                    htmlFor={`lib-checkbox-${item.id}`}
                                    className="select-none ms-2 text-sm font-medium text-gray-700 cursor-pointer"
                                >
                                    {item.name}
                                </label>
                            </div>
                        ))
                    )}
                </div>

                <div className="h-px bg-gray-200" />

                {/* Create new list section */}
                {showCreateForm ? (
                    <div className="pt-3 flex flex-col gap-2">
                        <input
                            type="text"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleCreateLibrary();
                                if (e.key === "Escape") setShowCreateForm(false);
                            }}
                            placeholder="List name"
                            autoFocus
                            className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400"
                        />
                        <div className="flex gap-2 justify-end">
                            <button
                                className="cursor-pointer px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                onClick={() => {
                                    setShowCreateForm(false);
                                    setNewListName("");
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="cursor-pointer px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleCreateLibrary}
                                disabled={!newListName.trim() || creating}
                            >
                                {creating ? "Creating..." : "Create"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="pt-3">
                        <button
                            className="cursor-pointer text-green-600 hover:text-black text-sm font-medium transition-colors duration-200"
                            onClick={() => setShowCreateForm(true)}
                        >
                            Create a new list
                        </button>
                    </div>
                )}
            </div>
        </>,
        document.body
    );
}