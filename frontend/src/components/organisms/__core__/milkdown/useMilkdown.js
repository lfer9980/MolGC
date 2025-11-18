'use client';
/*
	handles logic for text editor
	TODO: some of this features MUST BE moved to a properly backend
*/
// #region libraries
import { useEffect, useRef, useState } from 'react';
import { Crepe } from '@milkdown/crepe';
import { useEditor } from '@milkdown/react';
import html2canvas from 'html2canvas';
// #endregion


// #region components
// #endregion


// #region assets
const _INITIAL_MARKDOWN = `# Milkdown React Crepe

> You're scared of a world where you're needed.

This is a demo for using Crepe with **React**.
`;

// #endregion

// #region utils
const INITIAL_ENDPOINTS = {
	uploadImage: '',
	deleteImage: '',
	createContent: '',
	deleteContent: '',
};

import { extractImagesFromMarkdown } from 'lib/helpers';
// #endregion


// #region reducers & stores
import { MESSAGE_ENUM } from 'store/__core__/notifications/model';
import { useNotificationStore } from 'store/__core__/notifications';
// #endregion


// #region requests
import { EndpointHTTP } from 'lib/requests/http';
import { HTTP_METHODS_ENUMS } from 'lib/requests/http/methods';
// #endregion


function useMilkdown({
	title = '',
	data = '',
	endpoints = INITIAL_ENDPOINTS,
	readonly = false,
}) {
	// #region references
	const contentRef = useRef(null);
	const headerRef = useRef(null);
	const footerRef = useRef(null);
	// #endregion


	// #region contexts & hooks
	const {
		handlerAddMessage,
	} = useNotificationStore();
	// #endregion


	// #region variables
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region states
	const [html2pdf, setHtml2pdf] = useState(null);
	const [initialImages, setInitialImages] = useState([]);
	const [content, setContent] = useState(data || _INITIAL_MARKDOWN);
	const [inRead, setInRead] = useState(readonly || true);
	const [loading, setLoading] = useState(false);
	// #endregion


	// #region derivated states
	useEffect(() => {
		import('html2pdf.js').then((module) => setHtml2pdf(() => module.default));
	}, []);
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	const handlerInRead = () => setInRead(prev => !prev);


	const handlerDownload = async () => {
		if (!html2pdf) return;
		const element = contentRef.current;

		if (headerRef.current) headerRef.current.style.display = 'block';
		if (footerRef.current) footerRef.current.style.display = 'block';

		const headerCanvas = await html2canvas(headerRef.current);
		const footerCanvas = await html2canvas(footerRef.current);
		const headerImage = headerCanvas.toDataURL('image/png');
		const footerImage = footerCanvas.toDataURL('image/png');

		// Convertir HTML a PDF
		html2pdf()
			.set({
				margin: [20, 10, 20, 10],
				filename: `${title}.pdf`,
				image: { type: 'jpeg', quality: 0.90 },
				html2canvas: { scale: 2 },
				jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
			})
			.from(element)
			.toPdf()
			.get('pdf')
			.then((pdf) => {
				const totalPages = pdf.internal.getNumberOfPages();
				const pageWidth = pdf.internal.pageSize.width;
				const pageHeight = pdf.internal.pageSize.height;

				for (let i = 1; i <= totalPages; i++) {
					pdf.setPage(i);

					if (headerImage) {
						const imgWidth = 190;
						const imgHeight = (headerCanvas.height / headerCanvas.width) * imgWidth;
						pdf.addImage(headerImage, "PNG", 10, 5, imgWidth, imgHeight);
					}

					if (footerImage) {
						const imgWidth = 190;
						const imgHeight = (footerCanvas.height / footerCanvas.width) * imgWidth;
						pdf.addImage(footerImage, "PNG", 10, pageHeight - imgHeight - 10, imgWidth, imgHeight);
					}

					pdf.setFontSize(10);
					pdf.text(`Página ${i} de ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
				}

				pdf.save(`${title}.pdf`);
			})
			.then(() => {
				if (headerRef.current) headerRef.current.style.display = 'none';
				if (footerRef.current) footerRef.current.style.display = 'none';

			});
	};


	const _handlerUploadImage = async (file) => {
		/* logic for upload a new image and consume the image at frontend */
		try {
			if (!file) return;

			if (endpoints.uploadImage) {
				const response = await EndpointHTTP({
					method: HTTP_METHODS_ENUMS.POST,
					endpoint: endpoints.uploadImage,
					form: { 'file': file },
					isMultiForm: true,
				});

				if (response?.status === 200)
					return response.data?.url;
				else
					handlerAddMessage({
						content: {
							icon: 'error',
							title: 'No pudimos subir la imagen',
							text: 'Porfavor intenta nuevamente'
						},
						type: MESSAGE_ENUM.ALERT,
					});
			} else {
				const blob = new Blob([file], { type: file.type });
				return URL.createObjectURL(blob);
			};

		} catch (e) {
			handlerAddMessage({
				content: {
					icon: 'error',
					title: `Ocurrio un error al intentar subir la imagen`,
					text: `Codigo del error: ${e}`
				},
				type: MESSAGE_ENUM.ALERT,
			});
		};
	};


	const _handlerDeleteImage = async (url) => {
		/* logic for delete an image one by one... */
		try {
			if (!url) return;

			if (endpoints.deleteImage) {
				const response = await EndpointHTTP({
					method: HTTP_METHODS_ENUMS.DELETE,
					endpoint: endpoints.deleteImage,
					data: { 'image_url': url },
				});

				if (response?.status === 200)
					console.log('Imagen eliminada:', url);
				else
					handlerAddMessage({
						content: {
							icon: 'error',
							title: 'No pudimos subir la imagen',
							text: 'Ocurrio un error al intentar eliminar la imagen'
						},
						type: MESSAGE_ENUM.ALERT,
					});
			}
		} catch (e) {
			handlerAddMessage({
				content: {
					icon: 'error',
					title: `Ocurrio un error al intentar eliminar la imagen`,
					text: `Codigo del error: ${e}`
				},
				type: MESSAGE_ENUM.ALERT,
			});
		}
	};


	const handlerSaveContent = async () => {
		/* logic to save on backend the content */
		try {
			setLoading(true);

			const newImages = extractImagesFromMarkdown(content);
			const removedImages = initialImages.filter(img => !newImages.includes(img));

			if (endpoints.createContent) {
				const response = await EndpointHTTP({
					method: HTTP_METHODS_ENUMS.POST,
					endpoint: endpoints.createContent,
					data: { 'content': content },
				});

				if (response?.status === 200) {
					for (const image of removedImages) {
						await _handlerDeleteImage(image);
					}

					setInitialImages(newImages);
					setInRead(true);

					handlerAddMessage({
						content: {
							icon: 'success',
							title: `"${title}" guardado con exito!`,
						},
						type: MESSAGE_ENUM.ALERT,
					});

				} else
					handlerAddMessage({
						content: {
							icon: 'error',
							title: 'No pudimos guardar el documento',
							text: 'por favor intenta nuevamente mas tarde.'
						},
						type: MESSAGE_ENUM.ALERT,
					});
			};
		} catch (e) {
			handlerAddMessage({
				content: {
					icon: 'error',
					title: `Ocurrio un error al intentar guardar el documento`,
					text: `Codigo del error: ${e}`
				},
				type: MESSAGE_ENUM.ALERT,
			});
		} finally {
			setLoading(false);
		}
	};


	const handlerDeleteContent = async (id = '') => {
		/* Function for delete document */
		try {
			if (endpoints.deleteContent) {
				const response = await EndpointHTTP({
					method: HTTP_METHODS_ENUMS.DELETE,
					endpoint: endpoints.deleteContent,
					query: { 'content_id': id },
					form: { 'data': content },
					isJSON: true
				});

				if (response?.status === 200) {
					handlerAddMessage({
						content: {
							icon: 'success',
							title: `"${title}" eliminado con exito!`,
						},
						type: MESSAGE_ENUM.ALERT,
					});

				} else
					handlerAddMessage({
						content: {
							icon: 'error',
							title: 'No pudimos eliminar el documento',
							text: 'por favor intenta nuevamente mas tarde.'
						},
						type: MESSAGE_ENUM.ALERT,
					});
			};
		} catch (e) {
			handlerAddMessage({
				content: {
					icon: 'error',
					title: `Ocurrio un error al intentar eliminar el documento`,
					text: `Codigo del error: ${e}`
				},
				type: MESSAGE_ENUM.ALERT,
			});
		}
	};
	// #endregion


	// #region effects
	useEffect(() => {
		const images = extractImagesFromMarkdown(data);
		setInitialImages(images);
	}, [data]);
	// #endregion


	// #region others
	useEditor((root) => {
		try {
			const crepe = new Crepe({
				root,
				defaultValue: content,
				featureConfigs: {
					[Crepe.Feature.ImageBlock]: {
						onUpload: async (file) => (await _handlerUploadImage(file)),
					},
				}
			})
				.setReadonly(inRead);

			crepe.on((ctx) => {
				ctx.markdownUpdated(() => {
					const markdown = crepe.getMarkdown();
					setContent(markdown);
				});
			});
			return crepe;
		}
		catch (e) {
			console.warn(e);
		};
	}, [inRead]);
	// #endregion


	// #region main
	return {
		headerRef,
		footerRef,
		contentRef,
		content,
		loading,
		inRead,
		handlerInRead,
		handlerDeleteContent,
		handlerSaveContent,
		handlerDownload,
	};
	// #endregion
}


export { useMilkdown };
