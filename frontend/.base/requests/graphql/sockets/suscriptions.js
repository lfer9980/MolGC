/*
this code defines the way of the endpoints or queries on GRAPHQL are build
WORK IN PROGRESS, this code is not fully implemented yet.
*/
// #region libraries
import { gql } from '@apollo/client';
// #endregion


// #region utils
// #endregion


// #region main logic
export const NUEVO_MENSAJE = gql`
	subscription {
		mensajeNuevo {
			id
			contenido
			usuario {
				nombre
			}
		}
	}
`;
// #endregion