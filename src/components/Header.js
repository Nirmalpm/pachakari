import React from 'react';
import logo from '../veg-thmb.jpg';
import {logout} from '../actions';
import {connect} from 'react-redux';

class Header extends React.Component{

    logout(){
        console.log(this.props)
        this.props.logout();
    }
    render(){
        return(
            <div>
                <img src={logo} alt="Pachakari"/>
                <button onClick={()=>this.logout()}>Logout</button>
                
            </div>
        );
    }    
}

const mapStateToProps = (state) =>{
    console.log(state)
    return state;
}
export default connect(mapStateToProps,{logout})(Header);