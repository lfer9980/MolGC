import numpy as np


def cart2sp(x, y, z):
    """Converts data from cartesian coordinates into spherical.

    :param x: (scalar or array_like): X-component of data.
    :param y: (scalar or array_like): Y-component of data.
    :param z: (scalar or array_like): Z-component of data.
    :return: Tuple (r, theta, phi) of data in spherical coordinates.
    """
    x = np.asarray(x)
    y = np.asarray(y)
    z = np.asarray(z)
    scalar_input = False

    if x.ndim == 0 and y.ndim == 0 and z.ndim == 0:
        x = x[None]
        y = y[None]
        z = z[None]
        scalar_input = True

    r = np.sqrt(x**2 + y**2 + z**2)
    theta = np.arcsin(z / r)
    phi = np.arctan2(y, x)

    if scalar_input:
        return r.squeeze(), theta.squeeze(), phi.squeeze()

    return r, theta, phi
