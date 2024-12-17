import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  env: {
    BE_API: process.env.BE_API,
  },
};

export default nextConfig;
