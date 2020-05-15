//import history from '../history';
import {axiosResource} from '../api/axios';
import {ItemFormData} from '../utils/FormDataUtil';
import {setAuth,refreshAuthCallDispatch,authResponseToken} from '../utils/setAuthorization';
import jwt from 'jsonwebtoken';


export const login = (userName, password) => async (dispatch) =>{
  const {token} = await authResponseToken(userName, password);
  console.log(token)
  if(token){
    console.log(token)
    const obj = jwt.decode(token);
    dispatch({type:'signedIn',payload:{signedIn:true,user:obj.user_name}});
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

export const getItems = () => async (dispatch, getState) => {
    console.log(axiosResource)
    try{
        const response = await axiosResource().get('/api/items');
        dispatch({type:'items',payload:response.data});
    }catch(err){
      console.log(err)
      refreshAuthCallDispatch(dispatch, '/api/items','items')
    }
}
export const addItem = (item, resetForm,setSubmitting) =>async (dispatch, getState) => {
        const formData = ItemFormData();
        const response = await axiosResource()({
            method: "POST",
            url: '/api/item',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data; '
            }
          })
          resetForm();  
          setSubmitting(false);
          if(response.data){
            const response1 = await axiosResource().get('/api/items');
            dispatch({type:'items',payload:response1.data});
          }
    }
