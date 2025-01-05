import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  
};

module.exports = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}
export default nextConfig;