'use client';
import { useEffect } from 'react';
import Head from 'next/head';

const DynamicMetadataComponent = () => {
    const pageTitle = "Reaper Browser";
    const pageDescription = "The deadliest browser around";

    useEffect(() => {
        document.title = pageTitle;
    }, []);

    return (
        <>
            <Head>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <title>{pageTitle}</title>
            </Head>
            <div>
                <h1>{pageTitle}</h1>
                <p>{pageDescription}</p>
            </div>
        </>
    );
};

export default DynamicMetadataComponent;
