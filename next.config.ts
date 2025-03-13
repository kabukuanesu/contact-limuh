/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Enable static export
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

module.exports = nextConfig;
