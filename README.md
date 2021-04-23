# conway-simulator
A reproduction of Conway's game of life in a user friendly format for demonstration.

Built in React.js with two different versions:

Version A: "The Grid"
This version is created using class components under the file Grid.js. It had no starting grid because you can either click to create your own starting grid or you can click the randomize function in the bottom to start with a randomly generated grid. The clear function brings you back to a completely clear grid state. Many of the typical conway patterns become visible during play.

Version B: "The Map"
This version is built using React hooks to experiment with this modality of the game. There is also a randomize and clear function on this grid. 

# Universal Rules of the Game
1. Any live cell with fewer than two live neighbors dies, as if caused by under population.
2. Any live cell with two or three live neighbors lives on to the next generation.
3. Any live cell with more than three live neighbors dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
