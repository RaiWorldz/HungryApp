import './App.css';
import{ BrowserRouter, Route, Switch } from 'react-router-dom' 
import LandingPage from './components/Landing/LandingPage'
import Home from './components/Home/Home';
import RecipeCreate from './components/Create/RecipeCreate';
import Details from './components/Details/Details';
import Error from './components/Error404/Error';
// import favorites from './components/Favorites/Favorites'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
        <Route  path = '/home' component = {Home}/>
        <Route exact path ='/recipes/:id' component={Details}/>
        <Route exact path ='/recipe' component={RecipeCreate}/>
        {/* <Route exact path ='/favorites' component={favorites}/> */}
        <Route component={Error} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
