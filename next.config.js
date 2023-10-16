/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    mdsRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = nextConfig;
