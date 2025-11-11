'use client'
import { ReportMolGC } from 'components/templates';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// importa tu componente que quieres renderizar en la popup

// ----------------------
// Helper: copiar estilos del document principal a la popup
// ----------------------
function copyStylesToPopup(sourceDoc, targetDoc) {
	const promises = [];

	// Clonar <link rel="stylesheet"> pero esperar su carga
	const links = Array.from(sourceDoc.querySelectorAll('link[rel="stylesheet"]'));
	links.forEach((link) => {
		try {
			const newLink = targetDoc.createElement('link');
			// copiar atributos esenciales
			newLink.rel = 'stylesheet';
			if (link.href) newLink.href = link.href;
			if (link.media) newLink.media = link.media;
			if (link.type) newLink.type = link.type;
			// Promise para esperar a que cargue (fallback rápido)
			const p = new Promise((resolve) => {
				newLink.onload = () => resolve({ href: newLink.href, ok: true });
				newLink.onerror = () => resolve({ href: newLink.href, ok: false });
				// algunos estilos ya cached se resuelven inmediatamente
				setTimeout(() => resolve({ href: newLink.href, ok: true }), 2000);
			});
			promises.push(p);
			targetDoc.head.appendChild(newLink);
		} catch (err) {
			// ignorar problemas de clonación por CSP u otras restricciones
			console.warn('No se pudo clonar <link>', link, err);
		}
	});

	// Clonar <style> (reglas inline, incluyendo CSS-in-JS inyectado)
	const styles = Array.from(sourceDoc.querySelectorAll('style'));
	styles.forEach((style) => {
		try {
			// clonamos el nodo (contiene reglas inyectadas por styled-components, emotion, etc.)
			const clone = style.cloneNode(true);
			targetDoc.head.appendChild(clone);
			// no hay evento load para <style>, así que no hacemos promesa
		} catch (err) {
			console.warn('No se pudo clonar <style>', style, err);
		}
	});

	// Devolver promise que espera que los links terminen de cargar (si hubo)
	return Promise.all(promises);
}

// ----------------------
// openCenteredPopupAndRender: abre popup centrada, copia estilos y monta React
// ----------------------
async function openCenteredPopupAndRender({
	Component,
	props = {},
	width = 1000,
	height = 900,
	closeAfterPrint = false,
	maxWaitForRootMs = 3000
} = {}) {
	// calcular posición centrada (soporta múltiples monitores)
	const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
	const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;
	const windowWidth = window.innerWidth || document.documentElement.clientWidth || screen.width;
	const windowHeight = window.innerHeight || document.documentElement.clientHeight || screen.height;
	const left = dualScreenLeft + Math.max(0, Math.floor((windowWidth - width) / 2));
	const top = dualScreenTop + Math.max(0, Math.floor((windowHeight - height) / 2));

	const features = [
		`width=${width}`,
		`height=${height}`,
		`left=${left}`,
		`top=${top}`,
		'resizable=yes',
		'scrollbars=yes',
		'toolbar=no',
		'menubar=no',
		'status=no',
		'location=no'
	].join(',');

	const newWin = window.open('', '_blank', features);
	if (!newWin) throw new Error('Popup bloqueada. Permite ventanas emergentes.');

	// HTML skeleton
	newWin.document.write(`<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Reporte</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          @page { size: A4; margin: 15mm; }
          body { margin: 0; -webkit-print-color-adjust: exact; font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>`);
	newWin.document.close();

	// Instalar handler de error simple para evitar loops (p.ej. lockdown-install.js)
	try {
		let errorCount = 0;
		const MAX_ERRORS = 5;
		const onPopupError = (ev) => {
			errorCount += 1;
			console.error('Popup error captured:', ev);
			if (errorCount >= MAX_ERRORS) {
				try { newWin.close(); } catch (e) { }
			}
			return true;
		};
		newWin.addEventListener && newWin.addEventListener('error', onPopupError);
		newWin.onerror = function (message, source, lineno, colno, error) {
			onPopupError({ message, source, lineno, colno, error });
			return true;
		};
	} catch (e) {
		// algunos navegadores no permiten setear onerror en la popup; ignorar
	}

	// Copiar estilos del document principal al head de la popup y esperar a que carguen
	try {
		await copyStylesToPopup(document, newWin.document);
	} catch (err) {
		console.warn('copyStylesToPopup fallo:', err);
	}

	// esperar #root en popup (polling)
	const rootEl = await new Promise((resolve) => {
		const intervalMs = 80;
		let waited = 0;
		const id = setInterval(() => {
			try {
				const el = newWin.document.getElementById('root');
				if (el) {
					clearInterval(id);
					resolve(el);
				} else {
					waited += intervalMs;
					if (waited >= maxWaitForRootMs) {
						clearInterval(id);
						resolve(null);
					}
				}
			} catch (err) {
				clearInterval(id);
				resolve(null);
			}
		}, intervalMs);
	});

	if (!rootEl) {
		try { newWin.close(); } catch (e) { }
		throw new Error('No se encontró #root en la ventana emergente (timeout).');
	}

	const root = ReactDOM.createRoot(rootEl);

	// callback que el componente usará para indicar que ya terminó de renderizar (imprimir)
	const onRendered = () => {
		try {
			newWin.focus();
			setTimeout(() => {
				try { newWin.print(); } catch (e) { console.error('Error print:', e); }
				if (closeAfterPrint) setTimeout(() => { try { newWin.close(); } catch (e) { } }, 500);
			}, 300);
		} catch (err) {
			console.error('onRendered error:', err);
		}
	};

	// render
	try {
		root.render(React.createElement(Component, { ...props, onRendered }));
	} catch (err) {
		try { root.unmount(); } catch (_) { }
		try { newWin.close(); } catch (_) { }
		throw err;
	}

	// limpieza si el usuario cierra la ventana
	try {
		newWin.addEventListener('beforeunload', () => {
			try { root.unmount(); } catch (_) { }
		});
	} catch (e) { }

	return { window: newWin, root };
}

// ----------------------
// Ejemplo de uso en un componente
// ----------------------
export default function PDFReportGenerator() {
	const [isGenerating, setIsGenerating] = useState(false);

	const handleGenerate = async () => {
		setIsGenerating(true);
		try {
			await openCenteredPopupAndRender({
				Component: ReportMolGC, // tu componente con styles.module.scss
				props: { /* props si necesitas */ },
				width: 1000,
				height: 900,
				closeAfterPrint: false
			});
		} catch (err) {
			console.error('Error al abrir popup:', err);
			alert(err.message || 'Error al generar el reporte');
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<div style={{ padding: 20 }}>
			<button onClick={handleGenerate} disabled={isGenerating}>
				{isGenerating ? 'Generando...' : 'Abrir reporte (centrado)'}
			</button>
		</div>
	);
}
