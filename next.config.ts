import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // When the frontend asks for /api/menu...
        source: '/api/menu',
        // ...Next.js will secretly fetch it from your AWS Load Balancer!
        destination: 'http://coffee-shop-api-alb-152416241.us-east-1.elb.amazonaws.com/menu',
      },
    ];
  },
};

export default nextConfig;