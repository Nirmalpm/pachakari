//import history from '../history';
import {axiosResource,axiosResourceHeader,axiosAuthRegister} from '../api/axios';
import {ItemFormData,signUpFormData,OrderFormData,CartItem} from '../utils/FormDataUtil';
import {refreshAuthCallDispatch} from '../utils/setAuthorization';
//import {saveState, loadState} from '../utils/localStorage';


export const getItems = () => async (dispatch, getState) => {
    console.log(axiosResource)
    try{
        const response = await axiosResource(axiosResourceHeader()).get('/api/items');
        dispatch({type:'items',payload:response.data});
    }catch(err){
      console.log(axiosResourceHeader(),err)
      refreshAuthCallDispatch(dispatch, '/api/items','items',axiosResourceHeader())
    }
}

export const getImage= (imageName) => async(dispatch) =>{
  try{ 
    const img =  await axiosResource(axiosResourceHeader()).get(`/api/thumbnail/${imageName}`);
    dispatch({type:'get_image',payload:img.data});
  }catch(err){
    refreshAuthCallDispatch(dispatch, `/api/thumbnail/${imageName}`,'get_item',axiosResourceHeader())
  }
}
export const addItem = (item, resetForm,setSubmitting, user) =>async (dispatch, getState) => {
        const formData = ItemFormData(item,user);
        const response = await axiosResource(axiosResourceHeader())({
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
            const response1 = await axiosResource(axiosResourceHeader()).get('/api/items');
            dispatch({type:'items',payload:response1.data});
          }
    }

export const signUp = (user) => async (dispatch) =>{
  const userData = signUpFormData(user);
  console.log(userData)
  const response = await axiosAuthRegister().post('/register/user',userData)
  console.log(response.data)
}

export const signUpConfirm = (user) => async (dispatch) =>{
  const response = await axiosAuthRegister().post('/register/confirmuser/2',user)
  console.log(response.data)
}

export const getUser = (id) => async (dispatch) =>{
  const response = await axiosAuthRegister().get('/register/user?id='+id);
  dispatch({type:'getUser',payload:response.data});
}
/*
export const addToShoppingList = ({item,orderQty,image,isSelected}) => async (dispatch)=>{
        let items = await loadState('items');
        console.log(items)
        if(items && items.length > 0){
            if(isSelected){
              var removeIndex = items.map(function(item) { return item.itemId; }).indexOf(item.itemId);
              console.log(removeIndex)
              items.splice(removeIndex, 1);
              localStorage.removeItem('items')
              saveState([...items],'items')
            }else{
              items.push({...item,quantity:orderQty,image:image});
              console.log(items)
              localStorage.removeItem('items')
              saveState([...items],'items')
            }            
        }else{
          items = [{...item,quantity:orderQty,image:image}]
          saveState(items,'items')
        } 
        console.log('payload',items)
        dispatch({type:'shopping_cart',payload:items}) ;
}*/

export const addToShoppingList = ({item,orderQty,image,user}) => async (dispatch)=>{
  const purchaseItem =  CartItem(item,orderQty,image,user);
  console.log(purchaseItem)
  const response =  await axiosResource(axiosResourceHeader()).post(`/api/cart`,purchaseItem);
  console.log('payload',response.data)
  dispatch({type:'shopping_cart',payload:response.data}) ;
}

export const getShoppingList = (user) => async (dispatch)=>{
  const response =  await axiosResource(axiosResourceHeader()).get(`/api/cartitems?user=${user}`);
  console.log('payload',response.data)
  dispatch({type:'shopping_cart',payload:response.data}) ;
}

export const deleteShoppingListItem = (id,user) => async (dispatch)=>{
  const response =  await axiosResource(axiosResourceHeader()).delete(`/api/cart/${id}?user=${user}`);
  console.log('payload',response.data)
  dispatch({type:'shopping_cart',payload:response.data}) ;
}

export const deleteShoppingList = (user) => async (dispatch)=>{
  const response =  await axiosResource(axiosResourceHeader()).delete(`/api/cart?user=${user}`);
  console.log('payload',response.data)
  dispatch({type:'shopping_cart',payload:response.data}) ;
}


export const createOrder = ({shoppingitems,user}) => async (dispatch) =>{
  const formData = OrderFormData(shoppingitems,user);  
  const response =  await axiosResource(axiosResourceHeader()).post(`/api/order`,formData);
  console.log(formData)
  dispatch({type:'order_items',payload:response.data});
}