import React from 'react';

class ItemFilter extends React.Component{
    constructor(props){
        super(props);
        this.state={itemName:""}
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange = (event) =>{
        event.preventDefault();        
        let name = event.target.value;
        console.log(name)
        this.setState({itemName:event.target.value});
        console.log(this.props.items)
        if(this.props.items){
            const items = this.props.items.filter((item)=> item.itemName.indexOf(name) > -1 );
            this.props.filterItem(items);
        }        
    }
    render(){
        return(
            <div>
                <label htmlFor="item">Search Item</label>
                <input type="text" id="item" name="item" value={this.state.itemName} 
                    placeholder="Search Text" onChange={(e)=>this.handleChange(e)} autoComplete="off"/>
            </div>
        )
    }
}

export default ItemFilter;