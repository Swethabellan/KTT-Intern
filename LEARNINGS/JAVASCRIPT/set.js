let recipeMap = new Map([
    ['cucumber', 500],
    ['tomatoes', 350],
    ['onion',    50]
  ]);
 
  for (let vegetable of recipeMap.keys()) {
    console.log(vegetable);
  }
  
  for (let amount of recipeMap.values()) {
    console.log(amount); 
  }
  
  for (let amount of recipeMap.entries()) {
    console.log(amount); 
  }
  
  for (let entry of recipeMap) { 
    console.log(entry); 
  }


 let set=new Set();
set.add("Swetha");
set.add("Bellan")
for(let user of set){
    console.log(user);
}
console.log(set.size);

let weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, "ok");
console.log(weakMap.get(obj));

let wset=new WeakSet();
let tracked=[];
let name1={name:"Swetha"};
let name2={name:"Bellan"};
wset.add(name1);
wset.add(name2);
tracked.push(name1,name2);
let values = tracked.map(item => {
    return weakSet.has(item) ? item : null;
});
console.log(wset);

console.log(wset.has("Bellan"));
