import { useState, useEffect } from 'react'
import { createStage } from '../gameHelpers';
export const useStage = (player,resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    useEffect(() => {
        const updateStage = prevStage => {

            const newStage = prevStage.map(row =>
                row.map(cell =>(cell[1] === 'clear' ? [0, 'clear'] : cell)),);
              //  console.log(newStage)

                for(var i=0;i<player.tetromino.length;i++)
                {
                    for(var j=0;j<player.tetromino[0].length;j++)
                    {
                        if(player.tetromino[i][j]!==0)
                        {
                            //console.log(player.collide)
                            newStage[i+player.pos.y][j+player.pos.x]=[
                                player.tetromino[i][j],
                                `${player.collided?'merged':'clear' }`
                            ]
                        }
                    }
                }

                if(player.collided)
                {
                    resetPlayer();
                }

                return newStage;

        }
        setStage(prev => updateStage(prev))
    }, [player,resetPlayer])
    return [stage, setStage];
}