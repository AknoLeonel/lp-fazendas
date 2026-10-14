import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fotos enviadas pelo painel ficam no Vercel Blob.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
};

export default nextConfig;
