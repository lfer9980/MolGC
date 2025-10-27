"use client";

import { useEffect, useState } from "react";

function WaitingGame() {
	const [position, setPosition] = useState({ top: "50%", left: "50%" });
	const [score, setScore] = useState(0);
	const [timeLeft, setTimeLeft] = useState(30);
	const [isPlaying, setIsPlaying] = useState(true);

	const moveBall = () => {
		const top = Math.floor(Math.random() * 80) + 10;
		const left = Math.floor(Math.random() * 80) + 10;
		setPosition({ top: `${top}%`, left: `${left}%` });
	};

	useEffect(() => {
		if (isPlaying && timeLeft > 0) {
			const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
			return () => clearTimeout(timer);
		} else if (timeLeft === 0) {
			setIsPlaying(false);
		}
	}, [timeLeft, isPlaying]);

	const handleClick = () => {
		setScore(score + 1);
		moveBall();
	};

	return (
		<div className="game-container">
			<h1>🎮 Minijuego de Espera</h1>
			<p>Tiempo restante: {timeLeft}s</p>
			<p>Puntuación: {score}</p>

			{isPlaying ? (
				<div
					onClick={handleClick}
					className="ball"
					style={{
						top: position.top,
						left: position.left,
					}}
				/>
			) : (
				<div className="game-over">
					<p>⏱️ ¡Tiempo terminado!</p>
					<p>Tu puntuación: {score}</p>
					<button
						onClick={() => {
							setScore(0);
							setTimeLeft(30);
							setIsPlaying(true);
							moveBall();
						}}
					>
						Jugar de nuevo
					</button>
				</div>
			)}

			<style jsx>{`
        .game-container {
          position: relative;
          width: 100%;
          height: 100vh;
          background: #111;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .ball {
          position: absolute;
          width: 50px;
          height: 50px;
          background: red;
          border-radius: 50%;
          cursor: pointer;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease;
        }
        .game-over {
          margin-top: 20px;
          text-align: center;
        }
        button {
          margin-top: 10px;
          padding: 8px 16px;
          background: blue;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        button:hover {
          background: darkblue;
        }
      `}</style>
		</div>
	);
}


export { WaitingGame };