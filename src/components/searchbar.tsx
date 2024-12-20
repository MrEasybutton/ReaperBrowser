import React, { useState } from "react";

type SearchComponentProps = {
    onSearch: (query: string) => void;
    onHome: () => void;
    onReload: () => void;
};

const SearchComponent: React.FC<SearchComponentProps> = ({
                                                             onSearch,
                                                             onHome,
                                                             onReload,
                                                         }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const words = inputValue.split(" ");

        // Limiting to 64 words
        if (words.length <= 64) {
            setSearchQuery(inputValue);
        } else {
            setSearchQuery(words.slice(0, 64).join(" "));
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch(searchQuery);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="flex items-center w-full space-x-4 bg-gray-600 px-2 py-0.5 rounded-sm shadow-md">
            <div className={"space-x-4 translate-x-1 border-2 border-slate-900 rounded-full justify-center bg-gray-500 divide-x-2 divide-slate-900"}>
                <button
                    onClick={onReload}
                    className="text-white align-middle p-1.5 rounded-full hover:bg-gray-900/60 transition duration-150 focus:outline-none"
                    title="Refresh"
                >
                    <img src="/refresh.png" alt="Refresh Browser" width={20} height={20} />
                </button>

                <button
                    onClick={onHome}
                    className="text-white align-middle p-1.5 justify-center bg-gray-400 rounded-full hover:bg-rose-600/80 transition duration-150 focus:outline-none"
                    title="Home"
                >
                    <img src="/home.png" alt="Home" width={20} height={20} />
                </button>
            </div>

            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Search..."
                className="flex-grow px-2 py-2 justify-end text-sm bg-gray-900 text-white rounded-l-sm rounded-r-md translate-x-1.5 focus:outline-none hover:bg-gray-950/90 transition duration-200 ease-in-out"
            />
        </div>
    );
};



export default SearchComponent;
