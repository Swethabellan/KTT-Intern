function pow(x,n){
    if(n==1){
        return x;
    }else{
        return x*pow(x,n-1);
    }
}
console.log(pow(2,3));
function pow(x,n){
    return (n==1)?x:(x*pow(x,n-1));
}
console.log(pow(2,3));
//linkedlist
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;
console.log(list);

function fibonacci(n){
    if(n<=0) return 0;
    if(n==1) return 1;
    return fibonacci(n-1)+fibonacci(n-2);

}
for(let i=0;i<5;i++){
    console.log(fibonacci(i));
}


//Code blocks
{
   
    let message = "Swetha";
  
    console.log(message);
  
  }
  {
    let message = "Bellan";
  
    console.log(message);
  
  }
  console.log(message); 
  for (let i = 0; i < 3; i++) {
    
    console.log(i); 
  }
  
  console.log(i);

  //new function:
  let sum = new Function('a', 'b', 'return a + b');

console.log( sum(1, 2) );
let sayHi = new Function('alert("Hello")');

sayHi();