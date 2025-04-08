let user = {
    name: "John",
    age: 30,
  
    toString() {
      return `{name: "${this.name}", age: ${this.age}}`;
    }
  };
  
 console.log(user);
 let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    spouse: null
  };
  
  let json = JSON.stringify(student);
  console.log(typeof json);
  console.log(json);
  
  let user1 = {
    name: "John",
    age: 25,
    roles: {
      isAdmin: false,
      isEditor: true
    }
  };
  
 console.log(JSON.stringify(user1, null, 2));
 console.log(JSON.stringify(user1, null, 4));
console.log("\n");

let numbers = "[0, 1, 2, 3]";

numbers = JSON.parse(numbers);


console.log( numbers[1] );
