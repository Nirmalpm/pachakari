const initialState = {};

export default (state=initialState, action) => {
    switch(action.type){
        case 'items':
            return {...state,'items':action.payload};
        case 'add_item':
            return {...state,'item':action.payload};    
        case 'signedOut':
            return {}
        default:
            return state;
    }
}