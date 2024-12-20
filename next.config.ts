import type { NextConfig } from "next";
import {next} from "sucrase/dist/types/parser/tokenizer";

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig;
export default nextConfig;
