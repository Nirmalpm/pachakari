import React from 'react';
import {connect} from 'react-redux';
import {Router,Switch, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LoggedScreen from './components/LoggedScreen';
import history from './history';
import './App.css';
import {loadState} from './utils/localStorage';
import {refreshLogin} from './actions';
import Admin from './components/Admin';
import Item from './components/Item';


const SignUp = ()=>{
  return(
    <div>Sign Up</div>
  );
}

class App extends React.Component{
  onUnload = e => { // the method that will be used for both add and remove event
    e.preventDefault();
    e.returnValue = '';
  }

  state={
    isSignedIn:false
  }
  renderScreens(){
    console.log(this.props)
    if(!this.state.isSignedIn){
      return <LoginForm/>
    }else{
      return <LoggedScreen/>
    }
  }
  render(){
    console.log('inside render')
    return(
      <div className="App bgImage">
        <Router history={history}>
          <Switch>
              <Route path="/signup" exact render={()=>{
                return <SignUp/>
              }}/>
              <Route path="/admin" exact component={Admin}/>
              <Route path="/item" exact component={Item}/>
          </Switch>
          {this.renderScreens()}
          
        </Router>
      </div>
    );
  }

  shouldComponentUpdate(nextProps, nextState){
    const st = this.state.isSignedIn !== nextState.isSignedIn
    const pr = this.props.isSignedIn !== nextProps.isSignedIn
    console.log('inside shouldComponentUpdate state',st)
    console.log('inside shouldComponentUpdate props',pr)
    return st || pr;   
  }

  componentDidUpdate(){
    console.log('inside componentDidUpdate')
    this.setState({isSignedIn:this.props.isSignedIn})
  }
  componentDidMount(){
    console.log('inside componentDidMount')
    let state = loadState();
    if(state && state.signin){
      this.props.refreshLogin('signedIn',{signedIn:state.signin.isSignedIn,user:state.signin.user})
      this.setState({isSignedIn:state.signin.isSignedIn})
    }    
    console.log(state)   
    window.addEventListener("beforeunload", this.onUnload);
  }
  componentWillUnmount() {
      window.removeEventListener("beforeunload", this.onUnload);
  }

}

const mapStateToProps = (state) => {
  console.log('inside mapStateToProps')
  return state.signin;
}
export default connect(mapStateToProps,{refreshLogin})(App);