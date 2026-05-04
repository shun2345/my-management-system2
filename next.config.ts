import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// velite watch mode for dev – production build is handled by "velite" in the build script
if (process.env.NODE_ENV !== "production") {
  if (!process.env.VELITE_STARTED) {
    process.env.VELITE_STARTED = "1";
    import("velite").then((mod) => mod.build({ watch: true, clean: true }));
  }
}
