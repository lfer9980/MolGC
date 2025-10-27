/* 
	this script stands for create sitemap for better indexation on search engines
*/

export default function sitemap() {
	return [
		{
			url: 'https://domain.com',
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
	]
}