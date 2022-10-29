import { Route } from 'react-router-dom';
import './App.css';
import CreateCharacter from './components/CreateCharacter';
import Detail from './components/Detail';
import Home from './components/Home';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <Route exact path={'/'}  component={LandingPage}/>
      <Route exact path={'/home'} component={Home}/>
      <Route exact path={'/create'} component={CreateCharacter}/>
      <Route exact path={'/detail/:id'} component={Detail}  />
    </div>
  );
}

export default App;
