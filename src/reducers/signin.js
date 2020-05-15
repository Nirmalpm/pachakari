const initialState = {}
export default (state=initialState,action) =>{
    switch(action.type){
        case 'signedIn':
            return {isSignedIn:action.payload.signedIn,user:action.payload.user}
        case 'signedOut':
            return {isSignedIn:false,user:null}    
        default:
            return state;
    }
}