import {dateString,dateStringT} from './DateUtil';

export const ItemFormData = (item, user) =>{
    var formData = new FormData();
    if(item.itemId){
        formData.append("itemId",item.itemId);
        formData.append("modifiedUser",user);        
    }else{
        formData.append("createdUser",user);
    }
    if(item.imageName){
        formData.append("imageName",item.imageName);
    }    
    formData.append("itemName",item.itemName);
    formData.append("itemDescription",item.itemDescription);
    formData.append("itemPrice",item.itemPrice);
    formData.append("itemQuantity",item.itemQuantity);
    formData.append("itemUnit",item.itemUnit);
    formData.append("createdDate",dateString());
    if(item.file){
        formData.append("file",item.file,item.file.fileName);
    }         
    return formData; 
}

export const signUpFormData = (user) =>{
    return {
        user:{
            userName: user.userName,
            firstName:user.firstName,
            lastName:user.lastName,
            emailId:user.email,
            createDate:dateStringT()
         },
        registerUrl:"http://localhost:3000/signup"
        } 
}



export const OrderFormData = (items, user) =>{
    const frameItems = () => {
        const itemArray = items.map((item) =>{
            return {
                itemId: item.itemId,
                itemName: item.itemName,
                itemPurchasedPrice: item.itemPrice,
                quantity: item.quantity
            }
        });
        return itemArray;
    }
    const order = {
        userId: user,
        purchaseDate: dateStringT(),
        items: frameItems()
    }
    
    console.log(order);
    return order;
}

export const CartItem = (item, quantity,image,user) =>{
    const PurchaseItem = {
        itemId: item.itemId,
        itemName: item.itemName,
        itemPurchasedPrice: item.itemPrice,
        quantity: quantity,
        user:user
    }
   
    return PurchaseItem;
}