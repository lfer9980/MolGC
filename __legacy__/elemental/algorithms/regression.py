"""
Original Code: Abimael Guzman Pando
Refactored: Angel Fernandez
File: RLM.py
"""
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression


def regression(df: pd.DataFrame, plot: bool = False):
    """
        Fit a multiple linear regression model for z = f(x, y).

        :param: df (pd.DataFrame): Must have columns: [0: label, 1: x, 2: y, 3: z]
        :param: plot (bool): If True, the 3D plot (matplotlib) is displayed.

    Returns:
        model (LinearRegression): Trained model
        grid_points (np.ndarray): Combined X,Y points used to predict Z
        xx, yy (np.ndarray): Coordinate grid
        zz_pred (np.ndarray): Z prediction on the grid
        projected_points (np.ndarray): [x, y, z_pred] on original points
    """
    X = df[[1, 2]].values.astype(float)
    y = df[3].values.astype(float)

    model = LinearRegression()
    model.fit(X, y)

    x_min, x_max = int(np.floor(X[:, 0].min())), int(np.ceil(X[:, 0].max()))
    y_min, y_max = int(np.floor(X[:, 1].min())), int(np.ceil(X[:, 1].max()))

    xx, yy = np.meshgrid(
        np.linspace(x_min, x_max, (x_max - x_min) * 3),
        np.linspace(y_min, y_max, (y_max - y_min) * 3)
    )
    grid_points = np.c_[xx.ravel(), yy.ravel()]
    zz_pred = model.predict(grid_points).reshape(xx.shape)

    z_predicted = model.predict(X)
    projected_points = np.column_stack((X[:, 0], X[:, 1], z_predicted))

    if plot:
        import matplotlib.pyplot as plt
        from mpl_toolkits.mplot3d import Axes3D

        fig = plt.figure(figsize=(10, 6))
        ax = fig.add_subplot(111, projection='3d')

        ax.plot_surface(xx, yy, zz_pred, alpha=0.4, color='cyan', edgecolor='none')
        ax.scatter(X[:, 0], X[:, 1], y, c='k', label='Original', marker='o')
        ax.set_xlabel('X')
        ax.set_ylabel('Y')
        ax.set_zlabel('Z')
        ax.set_title(f'3D Lineal Regression (R² = {model.score(X, y):.2f})')
        ax.legend()
        plt.tight_layout()
        plt.show()

    return model, grid_points, xx, yy, zz_pred, projected_points


if __name__ == '__main__':
    ...
