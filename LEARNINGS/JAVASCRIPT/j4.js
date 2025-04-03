// //Objects:
// //1.Object literal notation:

// const person = {
//     name: "Swetha",
//     age: 20,
//     greet: function() {
//       console.log("Hello!");
//     }
//   };

//   //2.new Object() Constructor:

// const person1 = new Object();
// person1.name = "Sushma";
// person1.age = 25;
// person1.greet = function() {
//   console.log("Hi there!");
// };

// //3.using Object.create()

// const a = {
//     greet: function() {
//       console.log("Hello from prototype!");
//     }
//   };
//   const person5 = Object.create(a);
//   person5.name = "Sushma";
//   person5.age = 25;

//   //4.using constructor function:

//   function Person(name, age) {
//     this.name = name;
//     this.age = age;
//     this.greet = function() {
//       console.log("Greetings!");
//     };
//   }
//   const person2 = new Person("Dave", 35);

//   //5.Class Syntax

//   class Person1 {
//     constructor(name, age) {
//       this.name = name;
//       this.age = age;
//     }
//     greet() {
//       console.log("Hey there!");
//     }
//   }
//   const person3 = new Person1("Eve", 22);

//   //6.Using Object.assign()

//   const person4 = Object.assign({}, { name: "Grace", age: 27 }, { greet: function() { console.log("Hello!"); } });

//   //Ways to access Object properties:
 
//   //1.Dot Notation:

// console.log(person.name); 
// person.age = 33; 

//   //2.Bracket notation:

//   console.log(person["name"]); 
//   person["age"] = 43; 

//   //3.Destructing assignment:;

//   const { name, age } = person;
//   console.log(name);
//   console.log(age); 

//   //4.Object.keys(),Object.values(),Object.entries()

// console.log(Object.keys(person));   // ["name", "age"]
// console.log(Object.values(person)); // ["Swetha", 33]
// console.log(Object.entries(person)); // [["name", " swetha"], ["age", 32]]

//   //5.Using for...in loop
  
//   for(let key in person2){
//     console.log(`${key}: ${person[key]}`);
//   }

//   //6.using hasOwnProperty:

//   console.log(person2.hasOwnProperty("name")); // true
// console.log(person2.hasOwnProperty("toString")); // false 

//   //7.Accessing methods:

//   person.greet(); 

//   //Nesting Objects:

//   const person7 = {
//     name: "abc",
//     address: {
//       city: "New York",
//       zip: "10001"
//     }
//   };
//   console.log(person7.address.city); // "New York"

//   //Property Deletion:

//   delete person7.age;
//  console.log(person7.age); // undefined

//     //Freezing objects:

//     Object.freeze(person7);
//     person7.age = 50; // Fails silently in non-strict mode


//   //Javascript object constructors:
//   function Person2(first,last,age,color){
//     this.firstname=first;
//     this.lastname=last;
//     this.age=age;
//     this.color=color;
//     this.fullname=function(){
//         return this.firstname+ " " +this.lastname;
//     }
// }
// const ab=new Person2();
// ab.firstname="av";
// ab.lastname="ac"
// ab.age=20;
// ab.color="red";
// ab.fullname;
// ab;


for(let i=0;i<3;i++){
   middle: for(let j=0;j<3;j++){
        for(let k=0;k<3;k++){
            if(!(i==0 || j==1 ||k==0)){
                console.log("Hi");
               break middle;
            }else{
                console.log("Hello");
            }
        }
    }
}


//object assign()
const object1 = {  
    a: 1,  
    b: 2,  
    c: 3  
  };  
  const object3= {  
    g: 1,  
    h: 2,  
    i: 3  
  };    
    
  const object2 = Object.assign({c: 4, d: 5}, object1);  
  const object4 = Object.assign({g: 34, h: 25}, object3);  
  console.log(object2.c, object2.d);  
  console.log(object4.g, object4.h);  

//create method:
const proto = {  
    printIntro: function () {  
    console.log(`My full name is ${this.Fname}. Am I Alive? ${this.isalive}`);  
    }  
    };  
    const name = Object.create(proto);  
   name.Fname="Sushma";
   name.isalive=true;
   name.printIntro();

   //Object entries()
   const student1={1:"abc",100:"xyz"}
   console.log(Object.entries(student1));

    //array of objects inside single objects:
    const personsData = [
        { name: "Swetha", age: 24 },
        { name: "Sushma", age: 37 },
        { name: "Priya", age: 41 }
      ];
      
      const people = {
        list: personsData
      };
      
      console.log(people);
      console.log(people.list[0].name); 

//this keyword is not bound:

let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

user.f = sayHi;
admin.f = sayHi;

user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); 


//constructor function:
function User(name) {
    this.name = name;
    this.isAdmin = false;
  }
  
  let user = new User("Jack");
  
  alert(user.name); // Jack
  alert(user.isAdmin); // false
