
import {setAuth,authResponseToken} from '../utils/setAuthorization';
import jwt from 'jsonwebtoken';

export const login = (userName, password) => async (dispatch) =>{
    const {token} = await authResponseToken(userName, password);
    console.log(token)
    if(token){
      console.log(token)
      const obj = jwt.decode(token);
      console.log(obj)
      dispatch({type:'signedIn',payload:{isSignedIn:true,user:obj.user_name,role:obj.authorities}});
    }else{
      setAuth({},{})
    }
  }
  
  export const refreshLogin = (type,payload) =>{
    return {type,payload}
  }
  
  export const logout = () => {
       setAuth({},{});
       return {type:'signedOut'};
  }