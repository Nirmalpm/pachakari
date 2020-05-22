import React from 'react';
//import logo from '../veg-thmb.jpg';
import {logout} from '../actions/signin';
import {connect} from 'react-redux';

class Header extends React.Component{

    logout(){
        //console.log(this.props)
        this.props.logout();
    }
    render(){
        return(
            <div>
                {/*<img src={logo} alt="Pachakari"/>*/}
                <a onClick={()=>this.logout()} style={{float:'right',margin:25, color:'green',cursor:'pointer', fontWeight:'bold'}}>Logout</a>
                
            </div>
        );
    }    
}

const mapStateToProps = (state) =>{
    //console.log(state)
    return state;
}
export default connect(mapStateToProps,{logout})(Header);