export const dateString = () =>{
    var today = new Date();
    var month = today.getMonth() < 10 ? '0'+(today.getMonth()+1) : (today.getMonth()+1);
    var d = today.getDate() < 10 ? '0'+today.getDate() : today.getDate();
    var date = today.getFullYear()+'-'+month+'-'+d;
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
}