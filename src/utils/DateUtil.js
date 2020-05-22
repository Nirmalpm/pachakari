export const dateString = () =>{
    var today = new Date();
    var month = today.getMonth() < 10 ? '0'+(today.getMonth()+1) : (today.getMonth()+1);
    var d = today.getDate() < 10 ? '0'+today.getDate() : today.getDate();
    var date = today.getFullYear()+'-'+month+'-'+d;
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
}

export const dateStringT = () =>{
    var today = new Date();
    var month = today.getMonth() < 10 ? '0'+(today.getMonth()+1) : (today.getMonth()+1);
    var d = today.getDate() < 10 ? '0'+today.getDate() : today.getDate();
    var date = today.getFullYear()+'-'+month+'-'+d;
    var hour = today.getHours() < 10 ? '0'+today.getHours() :today.getHours();
    var mins = today.getMinutes() < 10 ? '0'+today.getMinutes() :today.getMinutes();
    var secs = today.getSeconds() < 10 ? '0'+today.getSeconds() :today.getSeconds();
    var time = hour + ":" + mins + ":" + secs;
    return date+'T'+time;
}