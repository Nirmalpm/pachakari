import {dateString} from './DateUtil';

export const ItemFormData = (item) =>{
    var formData = new FormData();
    formData.append("itemName",item.itemName);
    formData.append("itemDescription",item.itemDescription);
    formData.append("itemPrice",item.itemPrice);
    formData.append("itemQuantity",item.itemQuantity);
    formData.append("itemUnit",item.itemUnit);
    formData.append("createdDate",dateString());
    formData.append("file",item.file,item.file.fileName);     
    return formData; 
}