import './App.css';
import Grid from './Grid';

function App() {
  return (
    <div className="App">
      <Grid />
    </div>
  );
}

export default App;







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
