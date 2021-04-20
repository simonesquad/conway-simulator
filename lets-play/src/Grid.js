import React from 'react';
import './Grid.css';

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

class Cell extends React.Component {
    render() {
        const { x, y } = this.props;
        return (
            <div className="Cell" style={{ 
                left: `${CELL_SIZE * x + 1}px`,
                top: `${CELL_SIZE * y + 1}px`,
                width: `${CELL_SIZE - 1}px`,
                height: `${CELL_SIZE - 1}px`,
            }}
        />
    );
    }
}

class Grid extends React.Component {
    constructor() {
        super();
        this.rows = HEIGHT/CELL_SIZE;
        this.cols = WIDTH/CELL_SIZE;
        this.grid = this.makeEmptyGrid();
    }
    state = { 
        cells: [], 
        interval: 100,
        isRunning: false,
    }
    playGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }
    stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }
    runIteration() {
        let newGrid = this.makeEmptyGrid();
        
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = this.calculateNeighbors(this.grid, x, y);
                if (this.grid[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newGrid[y][x] = true; 
                    } else {
                            newGrid[y][x] = false;
                        }
                    } else {
                        if (!this.grid[y][x] && neighbors === 3) {
                            newGrid[y][x] = true;
                        }
                    }
                }
           }

        this.grid = newGrid;
        this.setState({
            cells: this.makeCells()
        });
        this.timeoutHandler = window.setTimeout(() => {
            this.runIteration(); },
            this.state.interval);
        }
    
    calculateNeighbors(grid, x, y) {
        let neighbors = 0;
        const dirs = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
        ];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && grid[y1][x1]) {
                neighbors++;
            }
        }
        return neighbors;
    }

    handleIntervalChange = (event) => {
        this.setState({ 
            interval: event.target.value });
        }

    makeEmptyGrid() {
        let grid = [];
        for (let y = 0; y < this.rows; y++) {
            grid[y] = [];
            for (let x = 0; x < this.cols; x++) {
                grid[y][x] = false;
            }
        }
        return grid;
    }

    makeCells() {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.grid[y][x]) {
                    cells.push({ x, y });
                }    
            }
        }
        return cells; 
    }

    getElementOffset() {
        const rect = this.gridRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) -  doc.clientTop,
        };
    }

    handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;

        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if (x >= 0 && x <= this.cols && y >= 0 && y<= this.rows) {
            this.grid[y][x] = !this.grid[y][x];
        }
        this.setState({ cells: this.makeCells() });
    }
        
    render() {
        const { cells, isRunning } = this.state;

        return (
            <>
            <div className="Grid" style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}} onClick={this.handleClick} ref={(n) => { this.gridRef = n; }}>
                {cells.map(cell => (
                    <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                ))}
            </div>
            <div className="controls">
                <input value={this.state.interval} onChange={this.handleIntervalChange} /> msec 
                {isRunning ? 
                <button className="button" onClick={this.stopGame}>Stop</button> : <button className="button" onClick={this.playGame}>Play</button>}
            </div>
            </>
        );
    }
}

export default Grid;
