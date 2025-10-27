/*
this code defines the way of the endpoints or queries on GRAPHQL are builded
WORK IN PROGRESS, this code is not fully implemented yet.
*/
// #region libraries
import { gql } from '@apollo/client';
// #endregion


// #region utils
// #endregion


// #region main logic
export const GET_USUARIOS = gql`
	query {
    	usuarios {
			id
			nombre
			email
    	}
	}
`;

export const CREAR_USUARIO = gql`
	mutation CrearUsuario($nombre: String!, $email: String!) {
    	crearUsuario(nombre: $nombre, email: $email) {
			id
			nombre
			email
			}
		}
`;
// #endregion