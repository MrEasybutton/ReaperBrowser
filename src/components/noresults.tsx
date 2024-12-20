'use client';
import React from "react";
import Image from "next/image";

const NoResults = () => {
    const handleRetry = () => {
        const searchBar: HTMLInputElement | null = document.querySelector("input[type='text']");
        if (searchBar) searchBar.value = "";

        const alertMessage = "No results! Let's look elsewhere, Dead Beats!";
        const alertElement = document.createElement("div");
        alertElement.textContent = alertMessage;
        alertElement.className = "alert-decorated";

        document.body.appendChild(alertElement);

        setTimeout(() => {
            alertElement.remove();
        }, 2000);
    };

    return (
        <div className="inline-flex flex-col translate-y-4 items-center justify-center px-20 py-12 bg-gray-900 text-white sm:px-96 font-[family-name:var(--font-geist-sans)] overflow-hidden rounded-lg drop-shadow-lg">
            <Image
                src="/CalliSad.png"
                alt="No Results"
                width={200}
                height={200}
                className="drop-shadow-lg mb-4"
            />
            <h1 className="text-3xl sm:text-5xl mt-2 font-bold text-pink-500 text-center">
                Guh! No Results Found...
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mt-8 text-center pb-4">
                Looks like the Underworld doesn&apos;t have what you&apos;re looking for. <br />
                How about giving it another shot?
            </p>
            <button
                onClick={handleRetry}
                className="px-6 bg-pink-500 py-2 mt-8 hover:bg-pink-600 rounded-lg text-white font-bold text-lg transition-all duration-300 ease-in-out"
            >
                Retry Search
            </button>
        </div>
    );
};

export default NoResults;
