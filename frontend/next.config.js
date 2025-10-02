/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // В продакшене API будет работать через Vercel Functions или внешний сервер
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080/api/:path*',
        },
      ]
    }
    return []
  },
  // Оптимизация для Vercel
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  // Включаем статический экспорт для лучшей производительности
  trailingSlash: true,
  // Отключаем строгий режим для совместимости
  reactStrictMode: false,
}

module.exports = nextConfig
