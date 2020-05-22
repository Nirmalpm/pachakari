import React from 'react';
import OrderItem from '../components/OrderItem';
import {connect} from 'react-redux';
import _ from 'lodash';
import {createOrder,getShoppingList,deleteShoppingList} from '../actions'

class ShoppingCart extends React.Component{
    state = {
        shoppingitems:[],
        user:this.props.user
    }
    renderOrderItems(){
        console.log(this.state.shoppingitems)
        if(this.state.shoppingitems.length > 0){
            return this.state.shoppingitems.map((item,index)=>{
               // console.log(item,index)
                return (                   
                        <OrderItem item={item} key={`${item.itemId}_${index}`} user={this.state.user}/>                    
                );
            });
        }        
    }
    handleCreateOrder = () =>{
        console.log(this.state)
        this.props.createOrder(this.state);
    }
    getTotalAmount = () =>{
        if(this.state.shoppingitems.length > 0){
            return this.state.shoppingitems.map((item)=>{
                return item.itemPurchasedPrice * item.quantity
            }
            ).reduce((total,value)=> total + value);
        }
    }
    getTotalQty = () =>{
        if(this.state.shoppingitems.length > 0){
            return this.state.shoppingitems.map((item)=>{
                console.log(item.quantity)
                return item.quantity
            }
            ).reduce((total,value)=> parseInt(total) + parseInt(value));
        }
    }
    render(){
        return (
            <div className="orderItems">
                <div className="orderItem">
                    <div>Name</div>
                    <div>
                        Item
                    </div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <i>&nbsp;</i>
                </div>
                <hr/>
                {this.renderOrderItems()}
                <hr/>
                <div className="orderItem">
                    <div>&nbsp;</div>
                    <div>
                        Total:
                    </div>
                    <div>Rs.{this.getTotalAmount()}</div>
                    <div>{this.getTotalQty()}</div>
                    <i><button onClick={()=>this.handleCreateOrder()}>Place Order</button></i>
                    <i><button onClick={()=>this.props.deleteShoppingList(this.state.user)}>Remove Items</button></i>
                </div>
            </div>
        );
    }

    componentDidMount = () =>{
        console.log('---------inside:componentDidMount');
        this.props.getShoppingList(this.props.user);
    }

    shouldComponentUpdate(nextProps, nextState){
        const pr = !_.isEqual(this.props,nextProps)
        const st = !_.isEqual(this.state,nextState)
        //console.log(st,pr)        
        return  pr || st  
    }

    componentDidUpdate (){
        this.setState({shoppingitems:this.props.shoppingitems,user:this.props.user});
    }      
}

const mapStateToProps = (state) =>{
    console.log(state)
    return {shoppingitems:state.item.shoppingList?state.item.shoppingList:[],user:state.signin.user};
}
export default connect(mapStateToProps,{createOrder,getShoppingList,deleteShoppingList})(ShoppingCart);