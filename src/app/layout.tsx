'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Titlebar from "@/components/titlebar";
import Head from 'next/head';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-tr from-red-700 to-rose-900 text-white no-scrollbar`}

        >
        <Head>
            <meta name="description" content="Reaper Browser" />
            <meta property="og:title" content="Reaper Browser" />
            <meta property="og:description" content="The deadliest browser around" />
            <title>Reaper Browser</title>
        </Head>

        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "36px",
                zIndex: 1000,
                background: "linear-gradient(to right, #25252b, #131612)",
                padding: "0 3.5px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            className="drop-shadow-lg"
        >
            <div
                style={{
                    flex: 1,
                    height: "100%",
                }}
                className={"drag-allow"}
            ></div>
            <div
                className={"drag-disallow"}
            >
                <Titlebar />
            </div>
        </div>

        <div
            style={{
                position: "fixed",
                top: "36px",
                left: 0,
                width: "100%",
                zIndex: 999,
                backgroundColor: "#601010",
                padding: "1px 1px",
                borderBottom: "2px solid #555",
                display: "inline-flex",
                justifyContent: "flex-start",
                alignItems: "center",
            }}
            className={"drag-disallow"}
        >
        </div>

        <main style={{ marginTop: "80px" }}>
            {children} {/* The search result will be rendered in page.tsx */}
        </main>

        <footer>
            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    width: "100%",
                }}
            >
                <h1 className="text-slate-100 bg-slate-900/95 border border-black rounded-sm shadow-2xl px-1">
                    💀 Reaper Browser v1.0
                </h1>
            </div>
        </footer>
        </body>
        </html>
    );
}
