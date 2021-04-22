////SIMONE'S PSEUDOCODE////

//using React.js and HOOKS in place of state management//

//1. Setting the grid in a useState hook
//2. 'for' loop for the number of rows
//3. push num of columns to empty array rows
//4. using the map function to map over rows and columns in the grid simultaneously
//5. using the indicies of row/column as the unique key
//6. **optional** adds library immer for produce() function
//7. create a newGrid somehow ...
//8. create slice of state for game running etc.
//9. run the game using the useCallback hook 
//10. two separate for loops within the useCallback hook
//11. create an array of operations for each binary combination to use in forEach logic that computes new indices
//12. next if statement covers the rules determining if the cell is alive, or dead, or transforming to either state
//13. the if condition comes into play after you determine the number of neighbors of each cell in total
//14. function to reset the state that replicates the setting state logic and you can use this as a clearing function
//15. can add a randomizing function that resets the entire game to another starting state


import React, { useState, useCallback, useRef } from 'react';
import produce from "immer";
import './Map.css';

const numRows = 25;
const numCols = 25;

//the same possible neighbor combinations for each cell in the game
const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
];

const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
}


const Map = () => {
    const [grid, setGrid] = useState(() => {
       return generateEmptyGrid()
    });

    const [running, setRunning] = useState(false);

    const runningRef = useRef();
    runningRef.current = running

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let k = 0; k < numCols; k++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newK = k + y;
                            if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                                neighbors += g[newI][newK];
                            }
                        });

                        // this is where the cell is dying or coming back to life
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0;
                        } else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1;
                        }
                    }
                }
            });
        });
        setTimeout(runSimulation, 100);
    }, []);

    return (
        <>
        <div className="buttons">
        <button 
            onClick={() => {
                setRunning(!running);
                if (!running) {
                runningRef.current = true;
                runSimulation();
                }
            }}
        >
            {running ? "Stop" : "Play"}
        </button>
        <button
            onClick={() => {
                const rows = [];
                for (let i = 0; i < numRows; i++) {
                    rows.push(
                        Array.from(Array(numCols), () => (Math.random() > 0.5 ? 1 : 0))
                    );
                }

                setGrid(rows);
            }}
        >Randomize!</button>
        <button
            onClick={() => {
                setGrid(generateEmptyGrid());
            }}
        >Clear Grid</button>
        </div>
        <div className="map"
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numCols}, 20px)`
            }}
        >
        {grid.map((rows, i) =>
            rows.map((col, k) => (
            <div 
                key={`${i}-${k}`}
                onClick={() => {
                    const newGrid = produce(grid, gridCopy => {
                        gridCopy[i][k] = grid[i][k] ? 0 : 1;
                    });
                    setGrid(newGrid);
                }}
                    style={{ 
                    width: 20, 
                    height: 20, 
                    backgroundColor: grid[i][k] ? 
            'purple' : undefined,
                    border: 'solid 1px white'
        }} 
        />
        ))
    )}
    </div>
    </>
    );
};

export default Map;
