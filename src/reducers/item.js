const initialState = {};

export default (state=initialState, action) => {
    switch(action.type){
        case 'items':
            return {...state,'items':action.payload};
        case 'add_item':
            return {...state,'item':action.payload};   
        case 'get_image':
            return {...state,'image':action.payload};    
        case 'shopping_cart':
            return {...state,'shoppingList':action.payload};      
        case 'order_items':
            return {...state,'orderCreated':action.payload};    
        case 'signedOut':
            return {}
        default:
            return state;
    }
}