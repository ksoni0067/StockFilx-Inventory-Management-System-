const main=document.querySelector('.main');
const log=document.querySelector('.log');
const sig=document.querySelector('.sig');
document.getElementById('create').addEventListener('click', signUp);
document.querySelector('#Logi').addEventListener('click', logIn);
function signUp(event) {
    event.preventDefault();
    const businessName = document.getElementById('Bname').value;
    const gstin = document.getElementById('gstin').value;
    const ownerName = document.getElementById('own').value;
    const password = document.getElementById('set').value;
    const confirmPassword = document.getElementById('confi').value;
    if(businessName=='' || gstin =='' || ownerName==''|| password=='' ){
        alert('Please Fill All Feilds');
        return ;
    }
    if( gstin.length<8 || password.length<8){
        alert('Invalid Business ID or Password');
        return ;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    const userDetails = {
      businessName: businessName,
      gstin: gstin,
      ownerName: ownerName,
      password: password,
      investment:0,
      profit:0,
      stockList:new Object(),
      History:new Array()

    };
    document.querySelector('.formsig').reset();
    localStorage.setItem(gstin, JSON.stringify(userDetails));
  
    alert('Account created successfully!');
}
  
function logIn(event) {
    event.preventDefault(); 
    const enteredBusinessId = document.getElementById('BID').value;
    const enteredPassword = document.getElementById('logPass').value;
    const storedUser = JSON.parse(localStorage.getItem(enteredBusinessId));
    if (storedUser &&  storedUser.password === enteredPassword) {
        alert('Login successful!');
        localStorage.setItem("BID",JSON.stringify(enteredBusinessId));
        document.querySelector('.formlog').reset();
        window.location.href = 'dashBoard.html';

    } else {
        alert('Invalid Business ID or Password');
    }
}
document.querySelectorAll(".signin").forEach((e)=>{e.addEventListener('click',(e)=>{
    main.style.display='none';
    log.style.display='none';
    sig.style.display='flex';
    e.preventDefault(); 
})});
document.querySelectorAll('.login').forEach((e)=>{e.addEventListener('click',(e)=>{
    main.style.display='none';
    sig.style.display='none';
    log.style.display='flex';
    e.preventDefault(); 
})});
