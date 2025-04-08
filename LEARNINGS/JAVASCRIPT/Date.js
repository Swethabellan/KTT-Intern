//Creation:
let now=new Date();
console.log(now);
console.log(now.getHours());
console.log(now.getMinutes());
console.log(now.getMonth());



let Jan01_1970 = new Date(0);
console.log(Jan01_1970 );

let Jan02_1970 = new Date(24 * 3600 * 1000);
console.log( Jan02_1970 );

let Dec31_1969 = new Date(-24 * 3600 * 1000);
console.log( Dec31_1969 );
let date = new Date(2011, 0, 1, 2, 3, 4, 567);
console.log( date );

//Setting date component:
let today= new Date();
today.setHours(0);
console.log(today);
console.log(today.setHours(0,0,0,0));

//Autocorrection:
let date1 = new Date(2013, 0, 32); 
console.log(date1);
let start = Date.now(); 
console.log(start);

function diff(date,date1){
    return date1-date;
}
// console.log("Time diff" + bench(diff))


