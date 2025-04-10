class Order {
    static totalOrders = 0;
  
    constructor(customer, item, price) {
      this.customer = customer;
      this.item = item;
      this.price = price;
  
      Order.totalOrders++;
    }
  
    getDetails() {
      return `${this.customer} ordered ${this.item} for $${this.price}`;
    }

    static getTotalOrders() {
      return `Total orders placed: ${Order.totalOrders}`;
    }
  }
  
  const order1 = new Order("Swetha", "Pizza", 12.99);
  console.log(order1.getDetails()); 
  console.log(Order.getTotalOrders());
//   console.log(order1.getTotalOrders()) ;
  
  const order2 = new Order("Sushma", "Burger", 8.50);
  console.log(order2.getDetails()); 
  console.log(Order.getTotalOrders()); 
  
  const order3 = new Order("Priya", "Fries", 15.00);
  console.log(order3.getDetails()); 
  console.log(Order.getTotalOrders());

console.log("\nPublic/Private properties")
  //private_public_properties:
  class CoffeeMachine {
    _waterAmount = 0;
  
    set waterAmount(value) {
      if (value < 0) {
        value = 0;
      }
      this._waterAmount = value;
    }
  
    get waterAmount() {
      return this._waterAmount;
    }
  
    constructor(power) {
      this._power = power;
    }
  
  }
  
  let coffeeMachine = new CoffeeMachine(100);
  
  coffeeMachine.waterAmount = -10; 

  console.log("Public : "+ coffeeMachine.waterAmount);

  console.log("\nProtected property\n");
  class CoffeeMachine1 {
    _waterAmount = 0;
  
    setWaterAmount(value) {
      if (value < 0) value = 0;
      this._waterAmount = value;
    }
  
    getWaterAmount() {
      return this._waterAmount;
    }
  }
  
//   console.log(new CoffeeMachine1().setWaterAmount(100));

console.log("\nPrivate property\n");
class CoffeeMachine2{
    #waterLimit = 200;
  
    #fixWaterAmount(value) {
      if (value < 0) return 0;
      if (value > this.#waterLimit) return this.#waterLimit;
    }
  
    setWaterAmount(value) {
      this.#waterLimit = this.#fixWaterAmount(value);
    }
}
  
  
// let c= new CoffeeMachine2();
  
//   console.log(c.#fixWaterAmount(123));
// //   coffeeMachine.#waterLimit = 1000; 
// }



console.log("\nError Handling:");
try{
    console.log("Catch block");
    Abc;
    console.log("End of try");

}catch(err){
    console.log("error occured because the variable is not declared\n");
    console.log("Error name : " + err.name);
    console.log("Error message : " + err.message);
}

//json parse
let json = '{"name":"Swetha", "age": 20 , "Dept":"IT" , "Year":4, "College": "Bannari Amman Institute of Technology }';
/*Error code:
 let user = JSON.parse(json); 
 console.log( user.name );
 console.log( user.Dept ); */
 


 try {
 
   let user = JSON.parse(json); // <-- when an error occurs...
   alert( user.name ); // doesn't work
 
 } catch (err) {
   // ...the execution jumps here
   console.log( "Our apologies, the data has errors, we'll try to request it one more time." );
   console.log( "Error name : "+err.name );
   console.log("Error Message : " + err.message );
 }
//checking error type using instamceof operator
try {
    user;
  } catch (err) {
    if (err instanceof ReferenceError) {
      console.log('ReferenceError');
    }
  }

  //Adding two numbers
  function addNumbers(input1,input2){
    try{
        let num1=parseFloat(input1);
        let num2=parseFloat(input2);
        if(isNaN(num1) || isNaN(num2)){
            throw new Error("Input is invalid!");
        }
        let result=num1+num2;
        console.log(`Result : ${result}`);
    }catch(error){
        console.error(`Error : ${error.message}`);
        console.log("Unable to calculate")
    }
  }
  addNumbers(10,9);
  addNumbers("abc",9)
  addNumbers("2",5);

  