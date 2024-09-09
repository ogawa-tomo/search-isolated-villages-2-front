// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./src/public/**/*"],
    },
  },
};

export default nextConfig;
