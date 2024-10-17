/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "superb-newt-870.convex.cloud",

        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
