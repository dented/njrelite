/** @type {import('next').NextConfig} */
const nextConfig = {
  // DB-backed content + API routes require a server runtime.
  // Static export (`output: 'export'`) is intentionally disabled.
  images: { unoptimized: true }
};
export default nextConfig;
