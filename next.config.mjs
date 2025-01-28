/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
          port: "",
          pathname: "/images/**",
        },
        {
          protocol: "https",
          hostname: "www.google.com",
          port: "",
          pathname: "/maps/embed/**",
        },
      ],
    },
  };
  
  export default nextConfig;
  