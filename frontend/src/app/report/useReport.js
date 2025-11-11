'use client';
import html2pdf from 'html2pdf.js';
/* 
	Hook for element: 
	brief description about what this hook does
*/

// #region libraries
import { useRef, useState } from 'react';
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


function useReport({ }) {
	// #region references
	const reportRef = useRef();
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	// #endregion


	// #region states
	const [loading, setLoading] = useState(false);
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers 
	const handlerGeneratePDF = async () => {
		const element = reportRef.current;

		const opt = {
			margin: [0, 0, 0, 0],
			filename: "MolGC_Report.pdf",
			image: { type: "jpeg", quality: 1 },
			html2canvas: { scale: 2, useCORS: true },
			jsPDF: { unit: "px", format: "a4", orientation: "portrait" },
		};

		await html2pdf().from(element).set(opt).save();
	};
	// #endregion


	// #region effects
	// #endregion


	// #region others
	// #endregion


	// #region main
	return {
		loading,
		reportRef,
		handlerGeneratePDF
	};
	// #endregion
}


export { useReport };