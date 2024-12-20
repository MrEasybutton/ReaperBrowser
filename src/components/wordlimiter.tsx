import React, { useState } from "react";

type WordClampProps = {
    text: string;
    wordLimit: number;
};

const WordClamp: React.FC<WordClampProps> = ({ text, wordLimit }) => {
    const [clampedText, setClampedText] = useState<string>("");

    React.useEffect(() => {
        const words = text.split(" ");
        if (words.length > wordLimit) {
            setClampedText(words.slice(0, wordLimit).join(" ") + "...");
        } else {
            setClampedText(text);
        }
    }, [text, wordLimit]);

    return <div className="text-white">{clampedText}</div>;
};

export default WordClamp;
