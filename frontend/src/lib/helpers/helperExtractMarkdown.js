/**
 * The function `extractImagesFromMarkdown` extracts image URLs from a Markdown text.
 * @param markdown - The `extractImagesFromMarkdown` function takes a markdown string as input and
 * extracts the URLs of images embedded in the markdown. The regex pattern used in the function looks
 * for image markdown syntax `![alt text](image URL)` and captures the image URLs.
 * @returns The function `extractImagesFromMarkdown` returns an array of image URLs extracted from the
 * input markdown text.
 */
export const extractImagesFromMarkdown = (markdown) => {
	const regex = /!\[.*?\]\((.*?)\)/g;
	return [...markdown.matchAll(regex)].map(match => match[1]);
};