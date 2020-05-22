const initialState = {}
export default (state=initialState,action) =>{
    switch(action.type){
        case 'signedIn':
            return action.payload
        case 'signedOut':
            return {isSignedIn:false,user:null}  
        case 'getUser':
            return {user:action.payload}       
        default:
            return state;
    }
}