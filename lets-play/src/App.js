import './App.css';
import Grid from './Grid';
import Map from './Map';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="header">
        <h1>Conway's Game of Life Simulator</h1>
      </header>
      <div className="body">
      <Link to='/grid'>
        <button className="button">Grid</button>
      </Link>
      <Link to='/map'>
        <button className="button">Map</button>
      </Link>
      </div>
    <Switch>
    <Route exact path='/grid' component={Grid} />
    <Route exact path='/map' component={Map} />
    </Switch>
    </div>
    </Router>
  );
}

export default App;








