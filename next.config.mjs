/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "source.unsplash.com" }, { hostname: "picsum.photos" }, { hostname: "prod-files-secure.s3.us-west-1.amazonaws.com" }, { hostname: "prod-files-secure.s3.us-west-2.amazonaws.com" }],
  },
};

export default nextConfig;
