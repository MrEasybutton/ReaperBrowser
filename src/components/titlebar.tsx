'use client';
import { useState, useEffect } from 'react';
import { getCurrentWindow } from "@tauri-apps/api/window";

function Titlebar() {
    const [isFocused, setIsFocused] = useState(true);

    useEffect(() => {
        const checkFocus = async () => {
            const focused = await getCurrentWindow().isFocused();
            setIsFocused(focused);
        };

        checkFocus();
        const unlistenFocus = getCurrentWindow().onFocusChanged(({ payload }) => {
            setIsFocused(payload);
        });

        return () => {
            unlistenFocus.then((unlisten) => unlisten());
        };
    }, []);

    return (
        <div
            className={`inline-flex justify-items-end float-end ${isFocused ? 'bg-gray-200' : 'bg-slate-800/50'} bg-opacity-25 border-black rounded-md shadow-md hover:bg-opacity-40 transition duration-300`}
        >
            <button
                onClick={() => getCurrentWindow().minimize()}
                style={{ userSelect: "none" }}
                className={`px-4 py-3 rounded ${isFocused ? 'hover:bg-yellow-600/90' : 'hover:bg-yellow-400/20'} transition duration-150`}
            >
                <img
                    src="/minimize.png"
                    alt="Minimize"
                    width={6}
                    height={6}
                />
            </button>
            <div
                style={{ height: "auto", width: "1px", margin: "0 0px" }}
                className="bg-zinc-800/80"
            />
            <button
                onClick={() => getCurrentWindow().close()}
                style={{ userSelect: "none" }}
                className={`px-3.5 py-2 rounded ${isFocused ? 'hover:bg-red-600/80' : 'hover:bg-red-400/20'} transition duration-150`}
            >
                <img
                    src="/reject.png"
                    alt="Close"
                    width={10}
                    height={10}
                />
            </button>
        </div>
    );
}

export default Titlebar;
