import React from 'react';
import './Grid.css';

const CELL_SIZE = 20;const WIDTH = 800;const HEIGHT = 600;

class Game extends React.Component {
    render() {
        return (
            <>
            <div className="Grid" style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}></div>
            </>
        )
    }
}

export default Game;
