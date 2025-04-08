let family=["Swetha","Bellan","Sushma","Priya"]
let [yourname,fathername,sibling,mothername]=family;
console.log(yourname);
console.log(fathername);
let yname=family[0];
let fname=family[1];
console.log(yname);


[yourname,fathername,sibling,mothername]="Swetha Bellan Sushma Priya".split(' ');
console.log(sibling);

let user={};
[user.name,user.surname]="Swetha Bellan".split(' ');
console.log(user);

for(let[key,value] of Object.entries(user)){
    console.log(`${key} : ${value}`);
    
}
let [name1="Z", name2, ...rest]=["A","B","C","D","E"];
console.log(rest[0]);
console.log(name1);

console.log(rest.length);

var options = {title: "Menu",width: 100, height: 200 };
var {width: w, height: h, title} = options;
console.log(w);
let opt={
    ti:"Menu"
}
let {wi=200,heig=300,ti} = opt;
console.log(wi);
let student = {
    // Basic properties with different data types
    name: "Swetha Bellan",
    age: 21,
    gradeLevel: 12,
    isActive: true,
    money:1000000,
    amount:1e9,
    a: 0b11111111,
    b : 0o377,
    points:123.12342,
    name11:"Swetha\nBellan",
    name12:`Swetha
Bellan`,
    // Array of subjects and grades
    subjects: 
      { name21: "Math",
       name22: "English",
       name23: "Science",
      }
}
let  {
    // Basic properties with different data types
    name,
    age,
    isActive,
    amount,
    points,
    name11,
    name12,
    title1="Menu",
    // Array of subjects and grades
    subjects: {
      name21,
       name22, 
       name23, 
      
}
}=student;
console.log(title1);
// console.log(a);




