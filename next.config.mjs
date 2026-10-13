/** Fully static site: `npm run build` writes plain HTML to ./out — no server, no environment variables needed. */
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
};
export default nextConfig;
