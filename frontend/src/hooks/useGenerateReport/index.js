'use client';
/* 
    Hook for open a new tab and render an specific report component
*/

// #region libraries
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// #endregion


// #region components
// #endregion


// #region assets
// #endregion

// #region utils
// #endregion


// #region hooks
// #endregion


// #region contexts & stores
// #endregion


// #region requests
// #endregion


function useGenerateReport({
    reportComponent,
    name,
    job,
    showResume,
    records
}) {
    // #region states
    const [isGenerating, setIsGenerating] = useState(false);
    // #endregion

    // #region variables
    const reportName = `Reporte_${name ?? 'General'}`;
    // #endregion

    // #region handlers
    const _handlerCopyStylesToPopup = async ({ source, target }) => {
        const promises = [];

        const links = Array.from(source.querySelectorAll('link[rel="stylesheet"]'));

        links.forEach((link) => {
            try {
                const newLink = target.createElement('link');
                newLink.rel = 'stylesheet';

                if (link.href) newLink.href = link.href;
                if (link.media) newLink.media = link.media;
                if (link.type) newLink.type = link.type;

                const p = new Promise((resolve) => {
                    newLink.onload = () => resolve({ href: newLink.href, ok: true });
                    newLink.onerror = () => resolve({ href: newLink.href, ok: false });
                    setTimeout(() => resolve({ href: newLink.href, ok: true }), 2000);
                });

                promises.push(p);
                target.head.appendChild(newLink);
            } catch (err) {
                console.warn('No se pudo clonar <link>', link, err);
            }
        });

        const styles = Array.from(source.querySelectorAll('style'));
        styles.forEach((style) => {
            try {
                const clone = style.cloneNode(true);
                target.head.appendChild(clone);
            } catch (err) {
                console.warn('No se pudo clonar <style>', style, err);
            }
        });

        return Promise.all(promises);
    };

    const _handlerOpenPopup = async ({
        component,
        props = {},
        width = 1000,
        height = 900,
        closeAfterPrint = false,
        maxWaitForRootMs = 3000
    } = {}) => {
        /* calculates open position */
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

        const newWindow = window.open('', '_blank', features);
        if (!newWindow) throw new Error('Popup bloqueada. Permite ventanas emergentes.');

        /* HTML skeleton with loading spinner */
        newWindow.document.write(`<!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>${reportName}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>
              @page { size: A4; margin: 10mm; }
              body { 
                margin: 0; 
                -webkit-print-color-adjust: exact; 
                font-family: "Roboto", Arial, sans-serif; 
              }
              
              /* Loading overlay styles */
              #loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.3s ease-out;
              }
              
              #loading-overlay.hidden {
                opacity: 0;
                pointer-events: none;
              }
              
              .spinner {
                width: 50px;
                height: 50px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #3498db;
                border-radius: 50%;
                animation: spin 1s linear infinite;
              }
              
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              
              .loading-text {
                margin-top: 20px;
                color: #666;
                font-size: 16px;
              }
              
              /* Hide loading overlay when printing */
              @media print {
                #loading-overlay {
                  display: none !important;
                }
              }
            </style>
          </head>
          <body>
            <div id="loading-overlay">
              <div class="spinner"></div>
              <div class="loading-text">Generando reporte...</div>
            </div>
            <div id="root"></div>
          </body>
        </html>`);

        newWindow.document.close();

        /* avoid error with lockdown-install.js with infinite loops */
        try {
            let errorCount = 0;
            const MAX_ERRORS = 5;

            const onPopupError = (ev) => {
                errorCount += 1;
                console.error('Popup error captured:', ev);

                if (errorCount >= MAX_ERRORS) {
                    try { newWindow.close(); } catch (e) { }
                }

                return true;
            };

            newWindow.addEventListener && newWindow.addEventListener('error', onPopupError);
            newWindow.onerror = function (message, source, lineno, colno, error) {
                onPopupError({ message, source, lineno, colno, error });
                return true;
            };
        } catch (e) { };

        try {
            await _handlerCopyStylesToPopup({ source: document, target: newWindow.document });
        } catch (err) {
            console.warn('_handlerCopyStylesToPopup fallo:', err);
        };

        /* wait to #root element on popup */
        const rootEl = await new Promise((resolve) => {
            const intervalMs = 80;
            let waited = 0;

            const id = setInterval(() => {
                try {
                    const el = newWindow.document.getElementById('root');
                    if (el) {
                        clearInterval(id);
                        resolve(el);
                    } else {
                        waited += intervalMs;

                        if (waited >= maxWaitForRootMs) {
                            clearInterval(id);
                            resolve(null);
                        };
                    }
                } catch (err) {
                    clearInterval(id);
                    resolve(null);
                };

            }, intervalMs);
        });

        if (!rootEl) {
            try { newWindow.close(); } catch (e) { }
            throw new Error('No se encontró #root en la ventana emergente (timeout).');
        };

        const root = ReactDOM.createRoot(rootEl);

        /* callback to hide loading and indicate that component finishes the renderization */
        const onRendered = () => {
            try {
                // Hide loading overlay
                const loadingOverlay = newWindow.document.getElementById('loading-overlay');
                if (loadingOverlay) {
                    loadingOverlay.classList.add('hidden');
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                    }, 300);
                }

                newWindow.focus();

                setTimeout(() => {
                    try {
                        const svgs = newWindow.document.querySelectorAll('.main-svg');

                        svgs.forEach(svg => {
                            const hasPlotLayer = svg.querySelector('.cartesianlayer, .plot, .legend');
                            if (!hasPlotLayer) {
                                svg.remove();
                            }
                        });

                        newWindow.print();

                        if (closeAfterPrint) {
                            setTimeout(() => {
                                try { newWindow.close(); } catch (e) { }
                            }, 500);
                        }
                    } catch (e) {
                        console.error('Error al imprimir:', e);
                    }
                }, 1000);
            } catch (err) {
                console.error('onRendered error:', err);
            }
        };

        /* render component */
        try {
            root.render(React.createElement(component, { ...props, onRendered }));
        } catch (err) {
            try { root.unmount(); } catch (_) { }
            try { newWindow.close(); } catch (_) { }
            throw err;
        };

        /* clean all if user closes the window */
        try {
            newWindow.addEventListener('beforeunload', () => {
                try { root.unmount(); } catch (_) { }
            });
        } catch (e) { }

        return { window: newWindow, root };
    };

    const handlerGeneratePDF = async () => {
        setIsGenerating(true);

        try {
            await _handlerOpenPopup({
                component: reportComponent,
                props: { job: job, records: records, showResume: showResume },
                width: 800,
                height: 900,
                closeAfterPrint: false
            });

        } catch (err) {
            console.error('Error al abrir popup:', err);
            alert(err.message || 'Error al generar el reporte');
        } finally {
            setIsGenerating(false);
        };
    };
    // #endregion

    // #region main
    return {
        isGenerating,
        handlerGeneratePDF,
    };
    // #endregion
}

export { useGenerateReport };