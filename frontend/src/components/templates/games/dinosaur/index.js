"use client";

import { useState, useEffect, useRef } from "react";

function DinoGame() {
	const [dinoJump, setDinoJump] = useState(false);
	const [obstacleLeft, setObstacleLeft] = useState(100);
	const [score, setScore] = useState(0);
	const [isGameOver, setIsGameOver] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);
	const gameInterval = useRef(null);

	useEffect(() => {
		if (isPlaying && !isGameOver) {
			gameInterval.current = setInterval(() => {
				setObstacleLeft((prev) => (prev > -5 ? prev - 2 : 100));
			}, 30);
		}
		return () => clearInterval(gameInterval.current);
	}, [isPlaying, isGameOver]);

	useEffect(() => {
		if (isPlaying && !isGameOver) {
			const scoreTimer = setInterval(() => setScore((s) => s + 1), 500);
			return () => clearInterval(scoreTimer);
		}
	}, [isPlaying, isGameOver]);

	useEffect(() => {
		if (obstacleLeft < 15 && obstacleLeft > 0 && !dinoJump) {
			setIsGameOver(true);
			setIsPlaying(false);
		}
	}, [obstacleLeft, dinoJump]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.code === "Space" && !dinoJump) {
				setDinoJump(true);
				setTimeout(() => setDinoJump(false), 600);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [dinoJump]);

	const restartGame = () => {
		setScore(0);
		setIsGameOver(false);
		setIsPlaying(true);
		setObstacleLeft(100);
	};

	return (
		<div className="game-container">
			<h1>🦖 Dino Game</h1>
			<p>Puntuación: {score}</p>

			<div className="game-area">
				<div className={`dino ${dinoJump ? "jump" : ""}`} />
				<div className="obstacle" style={{ left: `${obstacleLeft}%` }} />
			</div>

			{isGameOver && (
				<div className="game-over">
					<p>💀 ¡Game Over!</p>
					<p>Puntuación final: {score}</p>
					<button onClick={restartGame}>Jugar de nuevo</button>
				</div>
			)}

			<style jsx>{`
        .game-container {
          width: 100%;
          height: 100vh;
          background: #111;
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .game-area {
          position: relative;
          width: 500px;
          height: 200px;
          background: #333;
          border: 2px solid #666;
          overflow: hidden;
        }
        .dino {
          position: absolute;
          bottom: 0;
          left: 40px;
          width: 40px;
          height: 40px;
          background: green;
          transition: transform 0.3s ease;
        }
        .jump {
          transform: translateY(-100px);
        }
        .obstacle {
          position: absolute;
          bottom: 0;
          width: 20px;
          height: 50px;
          background: red;
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

export { DinoGame }