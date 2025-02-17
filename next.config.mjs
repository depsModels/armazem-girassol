/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['127.0.0.1'], // Adicione o domínio do localhost
  },
  output: "standalone"
};

export default nextConfig;
