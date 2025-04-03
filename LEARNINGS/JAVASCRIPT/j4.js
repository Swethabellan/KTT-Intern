//Objects:
//1.Object literal notation:

const person = {
    name: "Swetha",
    age: 20,
    greet: function() {
      console.log("Hello!");
    }
  };

  //2.new Object() Constructor:

const person1 = new Object();
person1.name = "Sushma";
person1.age = 25;
person1.greet = function() {
  console.log("Hi there!");
};

//3.using Object.create()

const a = {
    greet: function() {
      console.log("Hello from prototype!");
    }
  };
  const person1 = Object.create(a);
  person1.name = "Sushma";
  person1.age = 25;

  //4.using constructor function:

  function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
      console.log("Greetings!");
    };
  }
  const person2 = new Person("Dave", 35);

  //5.Class Syntax

  class Person {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    greet() {
      console.log("Hey there!");
    }
  }
  const person3 = new Person("Eve", 22);

  //6.Using Object.assign()

  const person4 = Object.assign({}, { name: "Grace", age: 27 }, { greet: function() { console.log("Hello!"); } });

  //Ways to access Object properties:
 
  //1.Dot Notation:

console.log(person.name); 
person.age = 33; 

  //2.Bracket notation:

  console.log(person["name"]); 
  person["age"] = 43; 

  //3.Destructing assignment:;

  const { name, age } = person;
  console.log(name);
  console.log(age); 

  //4.Object.keys(),Object.values(),Object.entries()

console.log(Object.keys(person));   // ["name", "age"]
console.log(Object.values(person)); // ["Swetha", 33]
console.log(Object.entries(person)); // [["name", " swetha"], ["age", 32]]

  //5.Using for...in loop
  
  for(let key in person2){
    console.log(`${key}: ${person[key]}`);
  }

  //6.using hasOwnProperty:

  console.log(person2.hasOwnProperty("name")); // true
console.log(person2.hasOwnProperty("toString")); // false 

  //7.Accessing methods:

  person.greet(); 

  //Nesting Objects:

  const person = {
    name: "abc",
    address: {
      city: "New York",
      zip: "10001"
    }
  };
  console.log(person.address.city); // "New York"

  //Property Deletion:

  delete person.age;
 console.log(person.age); // undefined

    //Freezing objects:

    Object.freeze(person);
    person.age = 50; // Fails silently in non-strict mode

  
