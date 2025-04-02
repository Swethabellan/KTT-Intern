/*Objects Creation
a.Creating Object using string literals*/
const person = {
    name: "John",
    age: 30,
    greet: function() {
        console.log("Hello!");
    }
};
//b.Creating object using new object constructor
const person1 = new Object();
person1.name = "John";
person11.age = 30;
person.greet = function() {
    console.log("Hello!");
};

/*Accessing objects
a.Dot notation*/
console.log(person.name);
console.log(person.age);  

//b.Bracket notation
console.log(person1["name"]); 
console.log(person1["age"]);  

/*Adding and Modifying
a.Dot notation*/
person.name = "Mike";  
person.city = "New York";  

//b.Bracket noytation
person["age"] = 35;  
person["country"] = "USA";  

//deleting properties
delete person.age;  
console.log(person.age);  

//Methods in Objects
const car = {
    brand: "Toyota",
    model: "Corolla",
    year: 2015,
    getDetails: function() {
        return `${this.brand} ${this.model} (${this.year})`;
    }
};

console.log(car.getDetails());  


//Iterating over Objects:
//a.for...in loop:
for (let key in person) {
    console.log(key + ": " + person[key]);
}

//Checking property exsitence
console.log("name" in person);  // true
console.log(person.hasOwnProperty("age"));  


/*this keyword:
The this keyword inside an object method refers to the object that is the owner of the method.*/

const person = {
    name: "John",
    greet: function() {
        console.log("Hello, " + this.name);
    }
};

person.greet(); 

//for in loop
let user = {
    name: "John",
    age: 30,
    isAdmin: true
  };
  
  for (let key in user) {
    alert( key );  // name, age, isAdmin
    alert( user[key] ); // John, 30, true
  }

  //ordered  for integer properties:

  let codes = {
    "49": "Germany",
    "41": "Switzerland",
    "44": "Great Britain",
    // ..,
    "1": "USA"
  };
  
  for (let code in codes) {
    alert(code); // 1, 41, 44, 49
  }

  //object reference and copying
let message = "Hello!";
let phrase = message;

//accessing objects and modifying
let username = { name: 'John' };
let admin = username;
admin.name = 'Pete'; 
alert(user.name);

//Comparison by reference
let a = {};
let b = a; 
alert( a == b ); // true
alert( a === b ); // true


let a1 = {};
let b1 = {}; // two independent objects
alert( a1 == b1 ); // false

//Cloning:
let user1 = {
    name: "John",
    age: 30
  };
  
  let clone = {}; 
  for (let key in user1) {
    clone[key] = user[key];
  }
  clone.name = "Pete"; 
  alert( user1.name ); // John

//Object assign:
let user2 = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

Object.assign(user, permissions1, permissions2);

alert(user2.name); // John
alert(user2.canView); // true
alert(user2.canEdit); // true

//this 
let user3 = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}
user3.f = sayHi;
admin.f = sayHi;

user3.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

/*Constructor functions:  
1.Named with captial letter first
2. Should execute only with "new operator"*/
function User(name) {
    this.name = name;
    this.isAdmin = false;
  }
  
  let user4 = new User("Jack");
  
  alert(user.name); // Jack
  alert(user.isAdmin); // false

//Return from Constructors:
function BigUser() {
    this.name = "John";
    return { name: "Godzilla" };  //Godzilla
  }
  alert( new BigUser().name );  // Godzilla

//Methods in constructor
function User(name) {
    this.name = name;
  
    this.sayHi = function() {
      alert( "My name is: " + this.name );
    };
  }
  
  let john = new User("John");
  
  john.sayHi(); // My name is: John

//Chaining:->a safe way to access nested object propertie

let user6 = {}; // user has no address
alert(user6.address ? user6.address.street ? user6.address.street.name : null : null);

let user5 = {}; // user has no address
alert( user5?.address?.street ); // undefined (no error)


//Symbols:


let id1 = Symbol("id");
alert(id); // TypeError

let id2 = Symbol("id");
alert(id.toString());//works

let user7 = { // belongs to another code
    name: "John"
  };
  
  let id = Symbol("id");
  
  user7[id] = 1;
  
  alert( user7[id] ); // we can access the data using the symbol as the key



  /*Object Conversion
  a.obj-String*/
  alert(obj);
anotherObj[obj] = 123;

//b,Number:
let num = Number(obj);

let n = +obj; 

let delta = date1 - date2;

let greater = user1 > user2;

