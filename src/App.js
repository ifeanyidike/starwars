import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from "./pages/Home"
import PeopleHome from "./pages/PeopleHome"
import People from "./pages/People"
import Film from "./pages/Film"
import Planet from "./pages/Planet"
import Specie from "./pages/Specie"
import Vehicle from "./pages/Vehicle"
import Starship from "./pages/Starship"
import Header from './components/Header';
import StarshipsHome from './pages/StarshipsHome';
import SpeciesHome from './pages/SpeciesHome';
import FilmsHome from './pages/FilmsHome';
import PlanetsHome from './pages/PlanetsHome';


function App() {

  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/species/:id' component={Specie}></Route>
        <Route path='/species' exact component={SpeciesHome}></Route>
        <Route path='/vehicles/:id' component={Vehicle}></Route>
        <Route path='/starships/:id' component={Starship}></Route>
        <Route path='/starships' component={StarshipsHome}></Route>
        <Route path='/films/:id' component={Film}></Route>
        <Route path='/planets/:id' component={Planet}></Route>
        <Route path='/people/:id' component={People}></Route>
        <Route path='/planets' exact component={PlanetsHome}></Route>
        <Route path='/films' exact component={FilmsHome}></Route>
        <Route path='/people' exact component={PeopleHome}></Route>
        <Route path='/' component={PeopleHome}></Route>
      </Switch>
    </Router>
  );
}

export default App;
