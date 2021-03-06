import axios from 'axios';

export const axiosResourceHeader = () => {
    return {'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`}
  }

export const axiosAuthRegister =  () => axios.create({
        baseURL:'http://localhost:8080',
    });   


export const axiosResource = (header) => {
    return axios.create({
        baseURL:'http://localhost:9010',
        headers: header
    });
}  

export const axiosAuth =  () =>{
    const consumerKey = 'oauth_client_id';
    const consumerSecret = 'oauth_client_secret';
    const authHeader = Buffer.from(`${consumerKey}:${consumerSecret}`, `binary`).toString(`base64`);
    console.log(authHeader)
    return axios.create({
        baseURL:'http://localhost:8080',
        headers:{
            'Authorization': `Basic ${authHeader}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });      
} 
