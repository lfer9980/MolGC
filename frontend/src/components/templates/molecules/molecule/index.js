'use client';
/* 
	TEMPLATE - MOLECULE
*/
// #region libraries
import React from 'react';
import * as THREE from "three";
import { Html } from "@react-three/drei";
// #endregion


// #region components
// #endregion


// #region assets
// #endregion


// #region utils
// #endregion


// #region hooks
import { useMolecule } from './useMolecule';
// #endregion


// #region contexts & stores
// #endregion


// #region styles
// #endregion


function Molecule({ url = '' }) {
	// #region hooks & others
	const {
		atoms,
		bonds
	} = useMolecule({
		url: url
	});
	// #endregion


	// #region theme
	// #endregion


	// #region skeletons
	// #endregion


	// #region main UI
	return (
		<group>
			{atoms.map((atom, i) => (
				<mesh key={`atom-${i}`} position={atom.position}>
					<icosahedronGeometry args={[25, 3]} />
					<meshPhongMaterial color={atom.color} />
					<Html distanceFactor={20} style={{ color: atom.color.getStyle() }}>
						<div style={{ fontSize: "14px", textShadow: "0 0 2px black" }}>
							{atom.label}
						</div>
					</Html>
				</mesh>
			))}

			{bonds.map((bond, i) => {
				const mid = new THREE.Vector3().copy(bond.start).lerp(bond.end, 0.5);
				const dist = bond.start.distanceTo(bond.end);

				const dir = new THREE.Vector3()
					.subVectors(bond.end, bond.start)
					.normalize();
				const axis = new THREE.Vector3(0, 0, 1).cross(dir).normalize();
				const angle = Math.acos(dir.dot(new THREE.Vector3(0, 0, 1)));
				const quaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);

				return (
					<mesh key={`bond-${i}`} position={mid} quaternion={quaternion}>
						<boxGeometry args={[5, 5, dist]} />
						<meshPhongMaterial color="white" />
					</mesh>
				);
			})}
		</group>
	);
	// #endregion
}

export { Molecule };