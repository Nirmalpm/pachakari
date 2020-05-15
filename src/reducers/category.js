const initialState = [];

export default (state=initialState, action)=>{
    switch(action.type){
        case 'signedOut':
            return {}
        default:
            return state;
    }
}