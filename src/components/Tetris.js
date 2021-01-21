import React, { useState } from 'react';
import Stage from './Stage';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { createStage, checkCollision } from '../gameHelpers';

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage'
import { useGameStatus } from '../hooks/useGameStatus';
import { useInterval } from '../hooks/useInterval';



const Tetris = () => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false)

    const [player, updatePlayerPos, resetPlayer,playerRotate] = usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore] = useGameStatus(rowsCleared);
    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 })
        }

    }
    const startGame = () => {
        setStage(createStage())
        setDropTime(1000);
        resetPlayer()
        setGameOver(false)

    }

    const dropPlayer = () => {

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false })
        }
        else {
            if (player.pos.y < 1) {
                setGameOver(true)
                setDropTime(null);
                
            }
            updatePlayerPos({ x: 0, y: 0, collided: true })
        }



    }

    useInterval(() => {
        dropPlayer ();
      }, dropTime);

    const move = ({ keyCode }) => {
        if (!gameOver) {

            if (keyCode === 37)
                movePlayer(-1);
            else if (keyCode === 39)
                movePlayer(1);
            else if (keyCode === 40)
                dropPlayer();
            else if (keyCode === 38) {
                playerRotate(stage);
            }

        }
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                &nbsp;&nbsp; <button onClick={startGame}>Start</button>
                <br />
                &nbsp;&nbsp;Score: {score}
                <br />
                &nbsp;&nbsp;{gameOver ? "GAMEOVER" : ""}

            </StyledTetris>
        </StyledTetrisWrapper>

    )
}
export default Tetris;