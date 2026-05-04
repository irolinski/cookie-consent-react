/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["cookie-consent-react"],
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
