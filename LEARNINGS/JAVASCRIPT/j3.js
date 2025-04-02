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
  