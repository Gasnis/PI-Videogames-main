import './App.css';
import { Route } from "react-router-dom";
import Home from './components/Home';
import Detail from './components/Detail'
import Form from './components/Form';
import Loading from './components/LandingPage';
import axios from "axios";
// axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://pi-videogames-main-production-b647.up.railway.app/"

function App() {
  return (

      <div className="App">

        
        <Route exact path="/"> <Loading/> </Route>

        <Route path="/home"> <Home/> </Route>

        <Route path="/detail/:id"> <Detail/> </Route>

        <Route path="/newvideogames"> <Form/> </Route>
        
        
      </div>
    
  );
}

export default App;
