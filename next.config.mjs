import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /** Уменьшает сбои вида ENOENT …/vendor-chunks/next-auth.js при «битом» кэше .next */
  transpilePackages: ["next-auth"],
  // Убирает предупреждение про второй package-lock вне папки проекта
  outputFileTracingRoot: path.join(__dirname)
};

export default nextConfig;
