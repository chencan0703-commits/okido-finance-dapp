/** @type {import('next').NextConfig} */
const nextConfig = {
  // 添加 headers 配置来修改 CSP
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src *;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;