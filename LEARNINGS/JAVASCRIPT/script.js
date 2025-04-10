function f(){
  console.log("Hi");
}
let
 a=setTimeout(f,1000);
// console.log(a);
clearTimeout(a);
function fun(fname,lname){
  console.log(fname+','+lname);
}
setTimeout(fun,2000,"Swetha","Bellan");
let b=setInterval(() => console.log("Sushma"),2000);
// setTimeout(() => {clearInterval(b); console.log('Stop');},5000);
clearInterval(b);

let timerId = setTimeout(function tick() {
  console.log('tick');
  timerId = setTimeout(tick, 2000); // (*)
}, 2000);
clearTimeout(timerId);


let user = {
  firstName: "Swetha",
  sayHi() {
    console.log(`Hello, ${this.firstName}!`);
  }
};
setTimeout(user.sayHi,1000);
setTimeout(() => user.sayHi(),1000);

let user1 = {
  firstName: "USing bind that allows to fix this"
};

function func() {
  console.log(this.firstName);
}

let funcUser = func.bind(user1);
funcUser(); 
//binding partial functions:
function mul(a, b) {
  return a * b;
}

let triple = mul.bind(null, 3);

console.log( triple(3) );
console.log( triple(4) ); 
console.log( triple(5) ); 

let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(
      student => console.log(this.title + ': ' + student)
    );
  }
};

group.showList();

//Property Descriptor:
let user2 = {
  name: "John"
};

let descriptor = Object.getOwnPropertyDescriptor(user2, 'name');

console.log( JSON.stringify(descriptor, null, 2 ) );

let user3 = {};

Object.defineProperty(user3, "name", {
  value: "John"
});

let descriptor1 = Object.getOwnPropertyDescriptor(user3, 'name');

console.log( JSON.stringify(descriptor1, null, 2 ) );
//getter and setter
let sname={
  fname:"Swetha",
  lname:"Bellan",
  get fullname(){
    return `${this.fname} ${this.lname}`;

  },
  set fullname(value){
    [this.fname,this.lname] = value.split( " ");
  }
};
console.log(sname);
sname.fullname="Sushma Bellan";
console.log(sname);

let animal={
  eats:true,
  walk(){
    console.log("Animal walks");
    
  }
};
let rabbit={
  jumps:true,
  __proto__:animal

};
for(let prop in rabbit)
  console.log(prop);
for(let prop in rabbit){
  let ownprop=rabbit.hasOwnProperty(prop);
  if(ownprop){
    console.log(`own:${prop}`);
  }else{
    console.log(`Inherited:${prop}`);
  }
}
// rabbit.__proto__ =animal;
// console.log(rabbit);
// console.log(rabbit.eats);
// rabbit.walk();
// console.log(rabbit.walk);



