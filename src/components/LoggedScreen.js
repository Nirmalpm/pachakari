import React,{Component} from 'react';
import Header from './Header';
import ItemList from './ItemList';
import {connect} from 'react-redux';
import {getItems} from '../actions';

class LoggedScreen extends Component{
    render(){
        return(
            <div >
                <Header/>
                <ItemList/>               
            </div>
        )
    }

    componentDidMount(){
        this.props.getItems();
    }
}


export default connect(null,{getItems})(LoggedScreen);