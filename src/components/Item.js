import React from 'react';
import {axiosResource} from '../api/axios';

class Item extends React.Component{
    state={image:null}
    getImage = async (imageName) =>{
        const img =  await axiosResource().get(`/api/thumbnail/${imageName}`);
        this.setState({image:img.data})
    }
    render(){
        //console.log(this.state.image)
        const {itemName,itemDescription,
            itemPrice,itemUnit,imageName, itemQuantity} = this.props.item;
        return(
            <div style={{display:'flex',width:'100%'}}>
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
                <div><i className="edit icon" onClick={()=>this.props.onEdit(this.props.item)}/></div>
            </div>
            );
    };
    componentDidMount(){
       this.getImage(this.props.item.imageName);
    }
    
}

export default Item;