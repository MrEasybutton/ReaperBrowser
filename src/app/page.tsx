'use client';
import { useState } from "react";
import Image from "next/image";
import SearchResult from "@/components/searchresult";
import SearchComponent from "@/components/searchbar";
import SearchComponentLite from "@/components/litesearch";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState<string | null>(null);
    const [showLogo, setShowLogo] = useState<boolean>(true);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setShowLogo(false);
    };

    const handleHome = () => {
        window.location.reload();
        window.scrollTo(0, 0); // This scrolls the window to the top
    };

    const handleReload = () => {
        
    };

    return (
        <div
            className="flex min-h-screen sm:px-2 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col w-full">
                <div className="flex justify-center drop-shadow-lg" style={{  }}>
                    {showLogo && (
                        <><Image
                            src="/CalliLogo.png"
                            alt="Calliope Mori"
                            width={500}
                            height={500}
                            className={"my-6 fixed"}
                            priority/>
                            <div
                                className="flex fixed drop-shadow-lg top-80 my-10 w-[40%] mx-[4.5px]"
                            >
                                <SearchComponentLite onSearch={handleSearch}/>
                            </div>
                        </>
                    )
                    }
                </div>

                <div
                    className="flex drop-shadow-lg fixed top-12 left-0 w-[calc(100%-16px)] mx-[8px] z-20"
                >
                    <SearchComponent onSearch={handleSearch} onHome={handleHome} onReload={handleReload}/>
                </div>

                <div className={"flex w-[calc(100%)]"}>
                    {searchQuery && <SearchResult query={searchQuery}/>}
                </div>

            </main>
        </div>
    );
}
