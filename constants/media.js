export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? `https://kreedv2.vercel.app`
    : `http://localhost:3000`;
