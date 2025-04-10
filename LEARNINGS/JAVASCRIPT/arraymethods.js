//Sort->Reordering array elements (e.g., alphabetically, numerically) for display or processing inplace.
// Array of quiz participants with their scores
const leaderboard = [
  { username: "Alice", score: 85 },
  { username: "Bob", score: 92 },
  { username: "Charlie", score: 78 },
  { username: "Dana", score: 95 }
];
leaderboard.sort((a, b) => b.score - a.score);

// console.log("Top Performers:");
// leaderboard.forEach((player, index) => {
//   console.log(`${index + 1}. ${player.username} - ${player.score} points`);
// });

//map()-> map() method creates a new array with transformed data without modifying the original
//
const products = [
  { name: "T-Shirt", price: 19.99 },
  { name: "Jeans", price: 49.5 },
  { name: "Sneakers", price: 79 }
];
const displayProducts = products.map(product => ({
  name: product.name,
  formattedPrice: `$${product.price.toFixed(2)}`
}));
// console.log("Products for Sale:");
// displayProducts.forEach(product => {
//   console.log(`${product.name}: ${product.formattedPrice}`);
// });

//find() ->it returns the first element in an array that matches a condition,

const users = [
  { username: "sarah", bio: "Loves hiking", status: "online" },
  { username: "mike", bio: "Coffee addict", status: "offline" },
  { username: "lisa", bio: "Travel enthusiast", status: "online" }
];

const selectedUser = users.find(user => user.username === "mike");

if (selectedUser) {
  console.log(`Profile: ${selectedUser.username}`);
  console.log(`Bio: ${selectedUser.bio}`);
  console.log(`Status: ${selectedUser.status}`);
} else {
  console.log("User not found!");
}


//filter()->it creates a new array containing only the elements that pass a condition
const tasks1 = [
  { title: "Buy groceries", completed: false },
  { title: "Finish report", completed: true },
  { title: "Call mom", completed: false },
  { title: "Pay bills", completed: true }
];

// Filter to show only active (incomplete) tasks
const activeTasks = tasks1.filter(task => !task.completed);

// // Display the active tasks
// console.log("Active Tasks:");
// activeTasks.forEach(task => console.log(`- ${task.title}`));


//reduce()->it takes an array and "reduces" it to a single value (like a sum), making it ideal for aggregating data such as totals, averages, or other cumulative calculations in real time.
const expenses = [
  { category: "Food", amount: 25.50 },
  { category: "Transport", amount: 15.75 },
  { category: "Entertainment", amount: 30.00 }
];

const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
console.log(`Total Expenses: $${totalSpent}`);

//forEach()->it iterates over each element in the array and performs an action (like sending a notification) without needing to return a new array.
const passengers = [
  { name: "Emma", phone: "555-0101" },
  { name: "Liam", phone: "555-0102" },
  { name: "Olivia", phone: "555-0103" }
];

passengers.forEach(passenger => {
  console.log(`Sending notification to ${passenger.name} at ${passenger.phone}: "Driver is now available near you!"`);
});

//for of()->it provides a simple, readable way to iterate over array elements directly (without needing indices like a traditional for loop), making it ideal for sequential processing with the flexibility to break or skip iterations.

const messages = [
  "Hey, how are you?",
  "This is urgent, please reply!",
  "What’s for dinner?",
  "Urgent: meeting now!"
];
for (const message of messages) {
  if (message.toLowerCase().includes("urgent")) {
    console.log(`[PRIORITY] ${message}`);
  } else {
    console.log(`[Normal] ${message}`);
  }
}

//for loop()->it gives you precise control over the iteration (e.g., stopping after a specific number of items) and allows you to work with indices, which is useful for tracking positions or limiting the scope of the check.

const inventory = [
  { name: "T-Shirt", stock: 5 },
  { name: "Jeans", stock: 12 },
  { name: "Sneakers", stock: 2 },
  { name: "Hat", stock: 8 }
];
const lowStockThreshold = 5;
for (let i = 0; i < 3; i++) {
  const product = inventory[i];
  if (product.stock < lowStockThreshold) {
    console.log(`Restock Alert: ${product.name} has only ${product.stock} left!`);
  } else {
    console.log(`${product.name} stock is okay: ${product.stock}`);
  }
}


































//Slice->Extracting a subset of an array without modifying the original
const fruits = ["apple", "banana", "orange", "grape"];
const citrus = fruits.slice(1, 3);
console.log(citrus);

// //join->Converting an array into a single string
// const colors = ["red", "blue", "green"];
// const colorString = colors.join(", ");
// console.log(colorString);

// //indexOf->Finding the position of an element
// const animals = ["cat", "dog", "bird"];
// const index = animals.indexOf("dog");
// console.log(index);

// //includes->Checking if an element exists in an array
// const numbers1 = [10, 20, 30];
// const hasTwenty = numbers1.includes(20);
// console.log(hasTwenty);

// //forEach->Performing an action on each element
// const names = ["Alice", "Bob", "Charlie"];
// names.forEach((name) => console.log(`Hi, ${name}!`));

// //map->Transforming each element into a new value
// const numbers2 = [1, 2, 3];
// const doubled = numbers2.map((num) => num * 2);
// console.log(doubled);
//----------------------------------------------------------
/*map(): 
Displaying a list of discounted prices on an e-commerce website
Eg: Applying discount to all items*/
const prices=[100,200,300]
const discount=prices.map(price=>price*0.9);
console.log(discount);

/*forEach()
Sending email reminders to users about an upcoming event
Eg:Logging email notifications.*/
const attendees = ["john@example.com", "sara@example.com"];
attendees.forEach(email => console.log(`Reminder sent to ${email}`));

/*Calculating total hours worked in the first 3 days of a workweek for payroll.
Summing hours logged.*/
const hoursWorked = [8, 7, 6, 8, 9];
let totalHours = 0;
for (let i = 0; i < 3; i++) {
  totalHours += hoursWorked[i];
}
console.log(`Hours worked: ${totalHours}`);

/*for...of
Checking a list of tasks for overdue items in a to-do app.
Flagging overdue tasks*/
const tasks = ["Submit report", "Call client", "Pay bill"];
for (const task of tasks) {
  if (task === "Pay bill") {
    console.log(`Overdue: ${task}`);
  }
}


