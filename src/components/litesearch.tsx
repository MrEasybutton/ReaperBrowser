import React, {useState} from "react";

type SearchComponentProps = {
    onSearch: (query: string) => void;
};

const SearchComponentLite: React.FC<SearchComponentProps> = ({
                                                             onSearch,
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
        }
    };

    return (
        <div className="flex items-center w-full space-x-4">
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Search..."
                className="flex-grow p-2 justify-end text-sm bg-gray-900 text-white rounded-md focus:outline-1 outline-rose-600 hover:bg-gray-950/90 transition duration-200 ease-in-out"
            />

        </div>
    );
};

export default SearchComponentLite;