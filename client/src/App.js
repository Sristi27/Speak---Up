import './App.css';
import React,{ createContext, useContext, useEffect, useReducer } from 'react';
import Add from './components/NewPost/Add';
import PostGrid from './components/grid/PostGrid';
import {Route,Switch,BrowserRouter, useHistory} from 'react-router-dom';
import Home from './components/Home/Home';
import Signin from './components/signin/Signin';
import { initialState, reducer } from './reducer';
import Signup from './components/signup/Signup';
import Contact from './components/Contact/Contact';
import newUser from './components/newUser/newUser';
import Stat from './components/Stats/Stat';


export const UserContext=createContext();
 
const Routing = () =>
{
  const history=useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(() =>
  {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user!=null)
    {
      dispatch({type:"USER",payload:user})
    }
    else{
      history.push('/newUser')
      //first make them go to opening page
      //then from there redirect to signin page
    }
  },[])

  return (
   
    //making them all private routes
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/add" component={Add}/>
    <Route path="/grid" component={PostGrid}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/signin" component={Signin}/>
    <Route path="/contact" component={Contact}/>
    <Route path="/newUser" component={newUser}/>
    <Route path="/stats" component={Stat}/>
  </Switch>
  )
}





function App() {

  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <div className="App">
    <UserContext.Provider value={{state,dispatch}}>
          <BrowserRouter>
          <Routing/>
          </BrowserRouter>
          </UserContext.Provider>
    </div>
  );
}

export default App;
