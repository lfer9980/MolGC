/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'http.cat',
				port: '',
				pathname: '/**',
				search: '',
			},
		],
	},
};

export default nextConfig;
