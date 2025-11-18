const findSectionByTitle = (data, sectionTitle) => {
	const decodedTitle = decodeURIComponent(sectionTitle).trim();
	return data.find(
		section => decodeURIComponent(section.title).trim().toLowerCase() === decodedTitle.toLowerCase()
	);
}

const findGroupInSection = (section, groupTitle) => {
	if (!section) return null;

	const decodedTitle = decodeURIComponent(groupTitle).trim();
	return section.children.find(
		group => decodeURIComponent(group.title).trim().toLowerCase() === decodedTitle.toLowerCase()
	);
}

const getGroupUrls = (group) => {
	if (!group || !group.children) return [];
	return group.children.map(item => ({
		id: item.id,
		type: item.type,
		variant: item.variant,
		url: item.url
	}));
}

export function getReportUrls(data, sectionTitle, groupTitle) {
	const section = findSectionByTitle(data, sectionTitle);
	const group = findGroupInSection(section, groupTitle);
	return getGroupUrls(group);
}
