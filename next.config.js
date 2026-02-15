/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      // Untuk Flaticon (dari domains lama)
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/**",
      },

      // Untuk fakeimg.pl (tetepin, tapi ganti src di code kalau down)
      {
        protocol: "http",
        hostname: "fakeimg.pl",
        port: "",
        pathname: "/2000x700/**",
      },
      // Untuk Flowbite
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
        port: "",
        pathname: "/typography-plugin/**",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
