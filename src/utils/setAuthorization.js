import {axiosAuth, axiosResource} from '../api/axios';

export const setAuth =  (token, refresh_token)=>{
    if(token){
        axiosAuth().defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('jwtToken',token);
        localStorage.setItem('jwtRefreshToken',refresh_token);
    }else {
        delete axiosAuth().defaults.headers.common['Authorization'];
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('jwtRefreshToken');
    }
};

export const refreshAuthCallDispatch = async (dispatch, resourceUrl, dispatchAction) =>{
    const refresh_token = localStorage.getItem('jwtRefreshToken');
    const response = await axiosAuth().post(`/oauth/token?grant_type=refresh_token&refresh_token=${refresh_token}`);
    console.log(1,refresh_token);
    console.log(11,localStorage.getItem('jwtToken'));
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('jwtRefreshToken');
    console.log(111,localStorage.getItem('jwtToken'));
    console.log(2,response.data);
    if(response.data.access_token){
        setAuth(response.data.access_token,response.data.refresh_token);
    }else{
        setAuth({},{})
        return;
    }   
    console.log(3,resourceUrl);
    console.log(4,localStorage.getItem('jwtToken'));
    const response1 = await axiosResource.get(resourceUrl);
    dispatch({type:dispatchAction,payload:response1.data});
};

export const authResponseToken = async(userName, password) => {
    setAuth({},{});
    const response = await axiosAuth().post(`/oauth/token?grant_type=password&username=${userName}&password=${password}`);
    const token = response.data.access_token;
    const refresh_token = response.data.refresh_token;
    setAuth(token,refresh_token);
    console.log({token,refresh_token})
    return {token,refresh_token}
}
