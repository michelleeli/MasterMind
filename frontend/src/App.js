import { Route } from 'react-router-dom';
import './App.css';
import Game from './Components/Game';
import Home from './Components/Home';
import { Switch } from 'react-router-dom';

function App() {
      return (

      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/game">
          <Game/>
        </Route>
      </Switch>
      )
    }
  
export default App;
