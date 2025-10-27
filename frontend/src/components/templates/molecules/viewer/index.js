'use client';
/* 
	TEMPLATES - MOLECULES VIEWER
*/
// #region libraries
import React from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
// #endregion


// #region components
import { Molecule } from 'components/templates';
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useMoleculeViewer } from './useMoleculeViewer';

// #endregion


// #region contexts & stores
// #endregion


// #region styles
// #endregion


function MoleculeViewer({ }) {
	// #region hooks & others
	const {
		controlsRef,
	} = useMoleculeViewer({

	});
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<Canvas camera={{
			position: [0, 0, 1500],
			fov: 25,
			near: 1,
			far: 5000
		}}>
			<ambientLight intensity={0.3} />
			<directionalLight position={[5, 5, 5]} intensity={1} />

			<OrbitControls
				ref={controlsRef}
				target={[0, 0, 0]}
				enableDamping
				dampingFactor={0.05}
				autoRotate
				autoRotateSpeed={0.6}
				minDistance={500}
				maxDistance={2000}
			/>

			<Molecule url="/models/pdb/caffeine.pdb" />
		</Canvas>
	);
	// #endregion
}

export { MoleculeViewer };