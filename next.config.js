/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Don't prevent deployment if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't prevent deployment if there are type errors
    ignoreBuildErrors: true,
  },
  // Suppress specific ESLint rules
  eslintConfig: {
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
}

module.exports = nextConfig
