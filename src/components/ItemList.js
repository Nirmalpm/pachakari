import React from 'react';
import {connect} from 'react-redux';
import {addItem, getItems} from '../actions';
import Item from './Item';
import ItemForm from './ItemForm';
import ItemFilter from './ItemFilter';
import _ from 'lodash';



class ItemList extends React.Component{
    state={
        items:[],
        selectedItem:null
    };
    
    onSubmit = (item,resetForm,setSubmitting) =>{
       // console.log(item)
        this.props.addItem(item,resetForm,setSubmitting);
        this.props.getItems();
    };
    onEdit = (item) =>{
        this.setState({selectedItem:item})
        console.log(item)
        if(item.itemUnit == null){
            item.itemUnit = "";
        }
        
    }
    renderItems(){
        //console.log(this.state)
        if(this.state.items){
            return this.state.items.map((item)=>{
                return (
                    <Item key={item.itemId} item={item} onEdit={this.onEdit}/>             
                );
            });
        }        
    }

    onFilterItem = (items) =>{
        this.setState({items:items});
    }

    render(){
        console.log(this.state.selectedItem)
        const defaultValues=this.state.selectedItem ? {...this.state.selectedItem,edit:true} :{
            itemDescription:'',
            itemName:'',
            itemQuantity:null,
            itemPrice:null,
            itemUnit:"",
            edit:false        
        }
        //console.log(defaultValues)
        return(
            <div>
                <div className="center"> 
                    <ItemFilter items={this.props.items} filterItem={this.onFilterItem}/>
                </div><br/>
                <div className="flex-container">                
                    <div className="column">
                        <ItemForm onSubmit={this.onSubmit} defaultValues={defaultValues}/>   </div>
                <   div className="column bg-alt">{this.renderItems()}</div>
                </div>
            </div>
            
        );
    }

    shouldComponentUpdate(nextProps, nextState){
        //console.log('inside shouldComponentUpdate')
        //console.log(this.props.items,nextProps.items)
        //console.log(this.state.items,nextState.items)
        const st = !_.isEqual(this.props.items,nextProps.items)
        const pr = !_.isEqual(this.state.items,nextState.items)
        const it = !_.isEqual(this.state.selectedItem,nextState.selectedItem)
        //console.log(st,pr)        
        return st || pr || it   
    }

    componentDidUpdate (){
        //console.log('inside componentDidUpdate')
        //console.log(this.props.items)
        this.setState({items:this.props.items});
    }1          
}

const mapStateToProps = (state) =>{
    //console.log('inside mapStateToProps')
    return state.item;
}

export default connect(mapStateToProps,{addItem,getItems})(ItemList);