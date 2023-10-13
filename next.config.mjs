// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  /* If trying out the experimental appDir, comment the i18n config out
   * @see https://github.com/vercel/next.js/issues/41980 */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.benestates.com',
      },
      {
        protocol: 'https',
        hostname: 'noagentspleasecloudstorage.s3-eu-west-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'api6.franksalt.com.mt',
      },
      {
        protocol: 'https',
        hostname: 'imagecache.ownersbest.com.mt',
      },
      {
        protocol: 'https',
        hostname: 'jade.uptech.mt',
      },
      {
        protocol: 'https',
        hostname: 'www.english-efl.com',
      },
      {
        protocol: 'https',
        hostname: 'simon.untangledmedia.co.uk',
      },
      {
        protocol: 'https',
        hostname: 'www.maltaproperty.com',
      },
      {
        protocol: 'https',
        hostname: 'franksalt.com.mt',
      },
      {
        protocol: 'https',
        hostname: 'www.maltapark.com',
      },
    ],
  },
};
export default config;
