const t1=performance.now();
for(let i=1;i<=100;i++){
    let para=document.createElement('p');
    para.textContent="This is paragraph"+i;
    document.body.appendChild(para);    
}

const t2=performance.now();

console.log("Total time tacken ="+(t2-t1));

const t3=performance.now();
let myDiv=document.createElement('div');
for(let i=1;i<=100;i++){
    let para=document.createElement('p');
    para.textContent="This is paragraph"+i;
    myDiv.appendChild(para);    
}
document.body.appendChild(myDiv);

const t4=performance.now();

console.log("Total time tacken ="+(t3-t4));

//fregment
const t5=performance.now();
let fregment=document.createDocumentFragment();
for(let i=1;i<=100;i++){
    let para=document.createElement('p');
    para.textContent="This is paragraph"+i;
    fregment.appendChild(para);    
}

document.body.appendChild(fregment);

const t6=performance.now();

console.log("Total time tacken ="+(t6-t5));
