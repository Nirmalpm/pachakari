import React from 'react';
import {connect} from 'react-redux';
import {addItem, getItems} from '../actions';
import Item from './Item';
import ItemForm from './ItemForm';
import ItemFilter from './ItemFilter';
import ShoppingCart from './ShoppingCart';
import _ from 'lodash';



class ItemList extends React.Component{
    state={
        items:[],
        selectedItem:null,
        isFilter: false,
        user: null
    };

    isAuthorized = (permission) =>{
        return this.state.user ? _.includes(this.state.user.role,permission): false
    }
    
    onSubmit = (item,resetForm,setSubmitting,isModified) =>{
        //console.log(item)
        this.setState({selectedItem:null,isFilter:false,items:[]})
        this.props.addItem(item,resetForm,setSubmitting,this.state.user.user,isModified);
        //resetForm();
        
        //this.props.getItems();
    };
    onEdit = (event,item) =>{
        event.preventDefault();
        this.setState({selectedItem:item})
        //console.log(item)
        if(item.itemUnit == null){
            item.itemUnit = "";
        }
        
    }
    renderItems(){
        //console.log(this.state)
        if(this.state.items){
            return this.state.items.map((item)=>{
                return (
                    <Item key={item.itemId} item={item} 
                    onEdit={this.onEdit} 
                    isEditable={this.isAuthorized('ROLE_EDIT')} 
                    isBuyable={this.isAuthorized('ROLE_BUY')}
                    user={this.state.user.user}
                    />             
                );
            });
        }        
    }

    onFilterItem = (items) =>{
        this.setState({items:items,isFilter:true});
    }

    render(){
        //console.log(this.state.selectedItem)
        const defaultValues=this.state.selectedItem ? {...this.state.selectedItem,edit:true} :{
            itemDescription:'',
            itemName:'',
            itemQuantity:null,
            itemPrice:null,
            itemUnit:"",
            edit:false        
        }
        //console.log(defaultValues)
        
        const className = this.isAuthorized('ROLE_EDIT')? "flex-container" : "flex-container flex-container-buy-only-width";
        return(
            <div>
                <div className="center"> 
                    <ItemFilter items={this.props.items} filterItem={this.onFilterItem}/>
                </div><br/>
                <div className="container">
                    <div className={className}>                
                        {this.isAuthorized('ROLE_EDIT')?
                        <div className="column">
                            <label>Create Item</label><br/><br/> 
                        <ItemForm onSubmit={this.onSubmit} defaultValues={defaultValues} /> 
                        </div>: null
                        }    
                        <div className="column bg-alt">{this.renderItems()}</div>
                        
                    </div>
                    <ShoppingCart user={this.state.user}/> 
                </div>
            </div>
            
        );
    }

    shouldComponentUpdate(nextProps, nextState){
        //console.log('inside shouldComponentUpdate')
        //console.log(this.props.items,nextProps.items)
        //console.log(this.state.items,nextState.items)
        //console.log(this.props,this.state)
        const st = !_.isEqual(this.props.items,nextProps.items)
        const pr = !_.isEqual(this.state.items,nextState.items)
        const it = !_.isEqual(this.state.selectedItem,nextState.selectedItem)
        //console.log(st,pr)        
        return st || pr || it   
    }

    componentDidUpdate (){
        //console.log('inside componentDidUpdate')
        //console.log(this.props.items)
        if(!this.state.isFilter){
            this.setState({items:this.props.items,user:this.props.user});
        }
    }      
}

const mapStateToProps = (state) =>{
    //console.log('inside mapStateToProps')
    return {items:state.item.items,user:state.signin};
}

export default connect(mapStateToProps,{addItem,getItems})(ItemList);