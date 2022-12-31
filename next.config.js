/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "image.tmdb.org",
      "api.themoviedb.org",
      "i.pinimg.com",
      "upload.wikimedia.org",
    ],
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig
