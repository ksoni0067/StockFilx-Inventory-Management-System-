const user=JSON.parse(localStorage.getItem("BID"));
let currUser=JSON.parse(localStorage.getItem(user));
let History=(currUser.History) || [];

document.querySelector('.bname').innerText=currUser.businessName ;
document.querySelector('.gstno').innerText=`GST NO: ${currUser.gstin}`;
let c=1;
document.querySelector('.add').addEventListener('click',(e)=>{
    e.preventDefault();
    let pName=document.querySelector('#stockname').value;
    let count=Number(document.querySelector('#amount').value);
    let price=Number(document.querySelector('#price').value);
    if(pName=='' || count==0 ){
        alert("Please Enter valid Product and Quantity");
        return;
    }
    currUser.investment+=price*count;
    let date=(new Date()).toLocaleString();
    let temp=currUser.stockList || {};
    if( temp[pName]){
        temp[pName].count+=count;
        temp[pName].price=price;
    }
    else {
        if( count<=0){
            alert("Product is Not Available in Stock");
            document.querySelector('.two').reset();

            return ;
        }
        temp[pName]={
            Name :pName,
            productId: genrate(),
            count:count,
            price:price,
        }

        c++;
    }
    currUser.stockList=temp;
    addHistory(temp[pName].productId,pName,count,price,date);
    History.push([temp[pName].productId,pName,count,price,date]);
    currUser.History=History;
    localStorage.setItem(user,JSON.stringify(currUser));
    update();
    document.querySelector('.two').reset();
})
update();
(function printHistory(){
    History.forEach((i)=>{
        addHistory(i[0],i[1],i[2],i[3],i[4]);
    });
    
})();
document.querySelector('.ab').addEventListener('click',()=>{
    window.location.href='index.html';
})
function update(){
    document.querySelector('.count').innerText=`${Object.keys(currUser.stockList).length} Items`;
    document.querySelector('.invest').innerText=`₹ ${currUser.investment}.00`;
}
function genrate(){
    return ('#'+c+(Math.floor(Math.random()*100)+1));
};
function addHistory(id, name, count,price,date){
    let newEle=document.createElement('tr');
    newEle.innerHTML=`
        <td>${id}</td>
        <td>${name}</td>
        <td>${count}</td>
        <td>₹ ${price}</td>
        <td>${date}</td>
    `
    document.getElementById('history-table-body').prepend(newEle);
}