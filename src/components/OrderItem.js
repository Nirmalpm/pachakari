    import React from 'react';    
    import {addToShoppingList,deleteShoppingListItem} from '../actions';
    import {connect} from 'react-redux'
    
    class OrderItem extends React.Component{
        state={
            orderItem:null,
            user:this.props.user
        }
    
        render(){
            //console.log(this.props)
            const {itemId,itemName,itemPurchasedPrice,quantity,image,imageName} = this.props.item;
            console.log(image)
            return (
                <div className="orderItem">
                    <div>{itemName}</div>
                    <div>
                        <img  style={{borderRadius:'10px'}} key={imageName} 
                        src={image} alt={imageName} width="50"/>
                    </div>
                    <div>Rs. {itemPurchasedPrice}</div>
                    <div> {quantity}</div>
                    <i className="window close icon" onClick={()=> this.props.deleteShoppingListItem(itemId,this.state.user)}/>
                </div>
            );
        }
    }

    export default connect(null,{addToShoppingList,deleteShoppingListItem})(OrderItem);