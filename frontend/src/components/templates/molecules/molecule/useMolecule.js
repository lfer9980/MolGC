'use client';
/* 
	Molecule control
*/

// #region libraries
import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader';
import * as THREE from "three";
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


function useMolecule({ url = '' }) {
	// #region references
	// #endregion


	// #region contexts & hooks
	// #endregion


	// #region variables
	const pdb = useLoader(PDBLoader, url);
	// #endregion


	// #region states
	// #endregion


	// #region memos & callbacks
	// #endregion


	// #region derivated states
	// #endregion


	// #region reducers & stores
	// #endregion


	// #region handlers
	// #endregion


	// #region effects
	// #endregion


	// #region others

	const { atoms, bonds } = useMemo(() => {
		const atoms = [];
		const bonds = [];

		const geometryAtoms = pdb.geometryAtoms;
		const geometryBonds = pdb.geometryBonds;
		const json = pdb.json;

		const offset = new THREE.Vector3();
		geometryAtoms.computeBoundingBox();
		geometryAtoms.boundingBox.getCenter(offset).negate();

		geometryAtoms.translate(offset.x, offset.y, offset.z);
		geometryBonds.translate(offset.x, offset.y, offset.z);

		// atoms
		const positions = geometryAtoms.getAttribute("position");
		const colors = geometryAtoms.getAttribute("color");

		for (let i = 0; i < positions.count; i++) {
			const position = new THREE.Vector3(
				positions.getX(i),
				positions.getY(i),
				positions.getZ(i)
			).multiplyScalar(75);

			const color = new THREE.Color(
				colors.getX(i),
				colors.getY(i),
				colors.getZ(i)
			);

			atoms.push({ position, color, label: json.atoms[i][4] });
		}

		// bonds
		const bondPositions = geometryBonds.getAttribute("position");

		for (let i = 0; i < bondPositions.count; i += 2) {
			const start = new THREE.Vector3(
				bondPositions.getX(i),
				bondPositions.getY(i),
				bondPositions.getZ(i)
			).multiplyScalar(75);

			const end = new THREE.Vector3(
				bondPositions.getX(i + 1),
				bondPositions.getY(i + 1),
				bondPositions.getZ(i + 1)
			).multiplyScalar(75);

			bonds.push({ start, end });
		}

		return { atoms, bonds };
	}, [pdb]);
	// #endregion


	// #region main
	return {
		atoms,
		bonds
	};
	// #endregion
}


export { useMolecule };


