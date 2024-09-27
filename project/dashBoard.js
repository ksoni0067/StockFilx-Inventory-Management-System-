const user=JSON.parse(localStorage.getItem("BID"));
if( user==null){
    alert("Data is not accessable");
    window.location.href='index.html';
    
}
let currUser=JSON.parse(localStorage.getItem(user));
let History=(currUser.History) || [];

document.querySelectorAll('.bname').forEach((e)=>{
    e.innerText=currUser.businessName ;
})
document.querySelectorAll('.gstno').forEach((e)=>{
    e.innerText=`GST NO: ${currUser.gstin}`;
})
let c=1;
document.querySelector('.add').addEventListener('click',(e)=>{
    e.preventDefault();
    let flag=true;
    let pName=document.querySelector('#stockname').value;
    let count=Number(document.querySelector('#amount').value);
    if(pName=='' || count==0 ){
        alert("Please Enter valid Product and Quantity");
        return;
    }
   
    let price=Number(document.querySelector('#price').value);
    let date=(new Date()).toLocaleString();
    let temp=currUser.stockList || {};
    if( temp[pName]){
        if(count<0 && (0-count)>temp[pName].count){
            alert("Product is Not Available in Stock");
            document.querySelector('.two').reset();
            return ;
        }
        let tempCount=temp[pName].count;
        temp[pName].count+=count;
        if(count>0){
            currUser.investment+=price*count;
            temp[pName].price=parseFloat(((temp[pName].price*tempCount)+(price*count))/(tempCount+count)).toFixed(2);

        }
        else{
            currUser.investment+=temp[pName].price*count;
            currUser.profit=parseFloat(Number(currUser.profit)+(price-temp[pName].price)*Math.abs(count)).toFixed(2);
            
        }
    
        if(temp[pName].count === 0){
            addHistory(temp[pName].productId,pName,count,price,date);
            History.push([temp[pName].productId,pName,count,price,date]);
            currUser.History=History;
            delete temp[pName];
            flag=false;
        
        }
    }
    else {
        if( count<=0){
            alert("Product is Not Available in Stock");
            document.querySelector('.two').reset();
            
            return ;
        }
    currUser.investment+=price*count;

        temp[pName]={
            Name :pName,
            productId: genrate(),
            count:count,
            price:price,
        }
        
        c++;
    }
    currUser.stockList=temp;
    if(flag){
        addHistory(temp[pName].productId,pName,count,price,date);
        History.push([temp[pName].productId,pName,count,price,date]);
        currUser.History=History;
    }
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
document.querySelector('.out').addEventListener('click',()=>{
    localStorage.setItem("BID",null);
    window.location.href='index.html';
})
function update(){
    document.querySelectorAll('.count').forEach((e)=>{
        e.innerText=`${Object.keys(currUser.stockList).length} Items`;
    })
    document.querySelectorAll('.invest').forEach((e)=>{
        e.innerText=`₹ ${currUser.investment}`;
    })
    document.querySelector('.pro').innerText=`₹ ${parseFloat(currUser.profit).toFixed(2)}`;

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
const veiw=document.querySelector('.veiw');
const con=document.querySelector('.c');
const stockveiw=document.querySelector('.stockveiw');
let showList=true;
veiw.addEventListener('click',(e)=>{
    e.preventDefault();
    if(showList){
        veiw.innerText='Go Back'
        con.style.display='none';
        stockveiw.style.display='flex';
        showList=false;
        for( let key in currUser.stockList){
            let newEle=document.createElement('tr');
            newEle.innerHTML=`
                <td>${currUser.stockList[key].productId}</td>
                <td>${currUser.stockList[key].Name}</td>
                <td>₹ ${currUser.stockList[key].price}</td>
                <td>${currUser.stockList[key].count}</td>
                `
            document.querySelector('.list').prepend(newEle);
        }
       
    }
    else{
        veiw.innerText='View Stock'
        con.style.display='grid';
        document.querySelector('.list').innerHTML="";
        stockveiw.style.display='none';
        showList=true;
    }
 
    

})