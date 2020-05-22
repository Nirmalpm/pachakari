import React from 'react';
import {axiosAuth,axiosResource,axiosResourceHeader} from '../api/axios';
import {setAuth} from '../utils/setAuthorization';
import {addToShoppingList} from '../actions';
import {connect} from 'react-redux';
import _ from 'lodash';

class Item extends React.Component{
    state={
        image:null,
        item:this.props.item,
        orderQty:0,
        isSelected: false,
        errorMsg:'',
        shoppingitems:[],
        user: this.props.user
    }
    getImage = async (imageName) =>{
        try{
            const img =  await axiosResource(axiosResourceHeader()).get(`/api/thumbnail/${imageName}`);
            this.setState({image:img.data})
        }catch(err){
            const refresh_token = localStorage.getItem('jwtRefreshToken');
            const response = await axiosAuth().post(`/oauth/token?grant_type=refresh_token&refresh_token=${refresh_token}`);
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('jwtRefreshToken');
            if(response.data.access_token){
                setAuth(response.data.access_token,response.data.refresh_token);
            }else{
                setAuth({},{})
                return;
            }   
            const img =  await axiosResource(axiosResourceHeader()).get(`/api/thumbnail/${imageName}`);
            this.setState({image:img.data})
        }
    }
    handleChange = (event) => {
        this.setState({[event.target.name]:event.target.value,isSelected: false})        
    }
    handleBlur = (event) => {
        if(this.state.orderQty < 0 || this.state.item.itemQuantity < this.state.orderQty){
            this.setState({errorMsg:'Set proper quantity'})
        }else{
            this.setState({errorMsg:''})
        }             
    }
    addToCart = () => {
        if(this.state.orderQty < 1){
            this.setState({errorMsg:'Set proper quantity'})
            return;
        }
        this.setState({errorMsg:''})
        console.log(this.state.item)
        this.setState({isSelected:!this.state.isSelected})
        this.props.addToShoppingList(this.state);
    }
    render(){
        //console.log(this.state.image)
        const cart = this.state.isSelected ? "icon cart arrow down" : "icon cart arrow";
        const {itemName,itemDescription,
            itemPrice,itemUnit,imageName, itemQuantity} = this.props.item;
        return(
            <div style={{display:'flex',width:'450px',justifyContent:'center'}}>
                <div style={{padding:10,width:'50%'}}>
                    <label >{itemName}</label>
                    <p>{itemDescription}<br/>
                    Costs:{itemPrice} / {itemUnit}<br/>
                    Quantity available <b>{itemQuantity}</b><br/>                   
                    </p> 
                </div>
                <div  style={{padding:10,width:'50%'}}>     
                    <img  style={{borderRadius:'10px'}} key={imageName} 
                    src={this.state.image} alt={imageName} width="100"/>
                    
                </div>
                <div className="center-vertical">                    
                    {this.props.isBuyable ?
                    <span>
                        <input type="number" name="orderQty" 
                        onChange={(event) => this.handleChange(event)} 
                        onBlur={(event) => this.handleBlur(event)}
                        value={this.state.orderQty}
                        className="orderItemCount" max={itemQuantity} min="0"/> 
                        <i className={cart} onClick={()=>this.addToCart()}/>                            
                        {this.props.isEditable ? 
                        <i className="edit icon outline" 
                        onClick={(event)=>this.props.onEdit(event,this.props.item) }/>:null}
                        {this.state.errorMsg?<p>{this.state.errorMsg}</p>:null}
                    </span>
                    :null}
                    
                </div>
            </div>
            );
    };
    componentDidMount(){
       this.getImage(this.props.item.imageName);
    }    
    shouldComponentUpdate(nextProps, nextState){
        const pr = !_.isEqual(this.props,nextProps)
        const st = !_.isEqual(this.state,nextState)
        //console.log(st,pr)        
        return  pr || st  
    }

    componentDidUpdate (){
        console.log(this.props.shoppingitems)
        const filterItem = this.props.shoppingitems.filter((item) => item.itemId === this.state.item.itemId);
        console.log(filterItem)
        if(filterItem && filterItem.length > 0){
          this.setState({shoppingitems:this.props.shoppingitems,isSelected:true});
        }else{
            this.setState({isSelected:false});  
        }        
    }  
}

const mapStateToProps = (state) =>{
   // console.log(state)
    return {shoppingitems:state.item.shoppingList?state.item.shoppingList:[]};
}

export default connect(mapStateToProps,{addToShoppingList})(Item);