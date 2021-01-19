import React, { useState } from 'react';
import Stage from './Stage';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { createStage, checkCollision } from '../gameHelpers';

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage'

const Tetris = () => {

    const [gameOver, setGameOver] = useState(false)
    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player,resetPlayer);

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0  })
        }

    }
    const startGame = () => {
        setStage(createStage())
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
            }
            updatePlayerPos({ x: 0, y: 0, collided: true })

        }
    }
    

    const move = ({ keyCode }) => {
        if (!gameOver) {

            if (keyCode === 37)
                movePlayer(-1);
            else if (keyCode === 39)
                movePlayer(1);
            else if (keyCode === 40)
                dropPlayer();

        }
    }

    return (
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
                <Stage stage={stage} />
                &nbsp;&nbsp; <button onClick={startGame}>Start</button>
                <br/>
                <br/>
                &nbsp;&nbsp;{gameOver?"GAMEOVER":""}
            </StyledTetris>
        </StyledTetrisWrapper>

    )
}
export default Tetris;