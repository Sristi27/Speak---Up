import logo from './logo.svg';
import './App.css';
import Add from './components/addPosts/Add';
import PostGrid from './components/grid/PostGrid';

import {Route,Switch,BrowserRouter, useHistory} from 'react-router-dom';
import Home from './components/Home/Home';
import Signin from './components/signin/Signin';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducer';
import Signup from './components/signup/Signup';


export const UserContext=createContext();
 
const Routing = () =>
{
  const history=useHistory()
  const {state,dispatch} = useContext(UserContext)

  useEffect(() =>
  {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  if(user)
  {
    dispatch({type:"USER",payload:user})
  }
  else{
    history.push('/signin')
  }
  },[])

  return (
   
    <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/add" component={Add}/>
    <Route exact path="/grid" component={PostGrid}/>
    <Route exact path="/signin" component={Signin}/>
    <Route exact path="/signup" component={Signup}/>
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
