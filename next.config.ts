import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[{
      protocol:"https",
      hostname:"img.clerk.com"
    },
  {
    protocol:"https",
      hostname:"images.unsplash.com"
  }]
  }
  /* config options here */
};

export default nextConfig;
