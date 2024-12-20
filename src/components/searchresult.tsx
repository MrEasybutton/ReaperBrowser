import React, { useState, useEffect } from "react";
import NoResults from "@/components/noresults";

type SearchResultProps = {
    query: string;
};

type ContentItem = {
    title: string;
    url: string;
};


const fetchSummary = async (text: string): Promise<string> => {
    try {
        const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
            method: "POST",
            headers: {
                Authorization: `Bearer TOKEN_HERE`, // Psst, remember to place your token here
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: text }),
        });

        if (!response.ok) {
            return "Oops, there was an error generating your summary, DeadBeat. Why? Perhaps:" +
                "- Your search was unseiso." +
                "- Your search returned few results." +
                "- CallAIope couldn't think of anything to say. Sorry!";
        }

        const data = await response.json();

        return data?.[0]?.summary_text || "No summary available.";
    } catch (error) {

        return "Oops, there was an error generating your summary, DeadBeat. Why? Perhaps:" +
            "- Your search was unseiso." +
            "- Your search returned few results." +
            "- CallAIope couldn't think of anything to say. Sorry!" +
            error;
    }
};


const SearchResult: React.FC<SearchResultProps> = ({ query }) => {
    const [content, setContent] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [summary, setSummary] = useState<string>("");
    const [isSummarizing, setIsSummarizing] = useState<boolean>(false);

    const isValidURL = (str: string) => {
        const pattern = new RegExp(
            "^(https?:\\/\\/)?([a-z0-9]+([\\-.]{1}[a-z0-9]+)*\\.[a-z]{2,5})?(:[0-9]{1,5})?(\\/.*)?$",
            "i"
        );
        return pattern.test(str);
    };

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                setError(null);

                if (isValidURL(query)) {
                    setContent([{ url: query, title: "URL Result" }]);
                } else {
                    const response = await fetch(
                        `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`
                    );
                    const data = await response.json();

                    if (data?.RelatedTopics?.length) {
                        const results = data.RelatedTopics
                            .filter((item: { Text?: string; FirstURL?: string }) => item?.Text && item?.FirstURL)
                            .map((item: { Text: string; FirstURL: string }) => ({
                                title: item.Text,
                                url: item.FirstURL,
                            }));
                        setContent(results);
                    } else {
                        setContent([]);
                    }
                }
            } catch (err) {
                console.error(err);
                setError("There was an error fetching your content!");
                setContent([]);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchContent();
        }
    }, [query]);


    useEffect(() => {
        const generateSummary = async () => {
            setIsSummarizing(true);

            if (content.length) {
                const searchResultsText = content.map((item) => `${item.title} (${item.url})`).join(". ");

                const prompt = `Summarize the following information concisely and informatively as a search summary:
                Topic: ${query}
                Search Results: ${searchResultsText}`;

                const result = await fetchSummary(prompt);
                setSummary(result);
            }

            setIsSummarizing(false);
        };

        generateSummary();
    }, [content, query]);

    if (loading) return <div className="text-red-900">Loading Results...</div>;
    if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
    if (content.length === 0) return <NoResults />;
    
    return (
        <div style={{ marginTop: 15, justifyContent: "left" }} className="p-2">
            <h1 className="text-white font-bold">{`You searched for: ${query}`}</h1>
            <div className="my-4 p-2 bg-gradient-to-br from-slate-900/95 to-rose-950/95 border-2 border-rose-600 rounded-md hover:drop-shadow-2xl transition duration-200 ease-in-out">
                <h2 className="font-bold text-rose-100 text-2xl px-2 py-2">Summarize with CallAIope</h2>
                <p className="text-white drop-shadow-2xl px-2 py-2">
                    {isSummarizing ? "CallAIope is generating your summary..." : summary}
                </p>
            </div>
            <div style={{ marginTop: 25 }}>
                {isValidURL(query) ? (

                    <div className="w-full h-96">
                        <link rel="import" href={query}/>
                    </div>
                ) : (
                    content.map((item, index) => (
                        <div
                            key={item.url || `item-${index}`}
                            className="my-4 px-4 py-6 bg-slate-900/95 border-2 border-slate-950/20 rounded-lg shadow-md divide-y-2 divide-red-100 w-fit"
                        >
                            <h2 className="font-bold text-rose-700 text-xl pb-4">{item.title}</h2>

                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-500 pt-2"
                            >
                                {item.url}
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchResult;
