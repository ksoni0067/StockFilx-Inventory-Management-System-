const main=document.querySelector('.main');
const signin=document.querySelectorAll(".signin");
const login=document.querySelectorAll('.login');
const log=document.querySelector('.log');
const sig=document.querySelector('.sig');
signin.forEach((e)=>{e.addEventListener('click',()=>{
    
    main.style.display='none';
    log.style.display='none';
    sig.style.display='flex';
    e.preventDefault(); 
})});
login.forEach((e)=>{e.addEventListener('click',()=>{
    main.style.display='none';
    sig.style.display='none';
    log.style.display='flex';
    e.preventDefault(); 
})});