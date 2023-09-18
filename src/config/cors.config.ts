const origin = process.env.ORIGIN || "http://localhost:5173";

export const corsOptions = {
  origin,
  methods: "GET,POST",
  allowedHeaders: "Content-Type,Authorization",
  exposedHeaders: "Content-Range,X-Content-Range",
  credentials: true,
  maxAge: 3600,
  cacheControl: "public, max-age=3600",
  preflight: true,
  strictPreflight: true,
  hideOptionsRoute: true,
};
