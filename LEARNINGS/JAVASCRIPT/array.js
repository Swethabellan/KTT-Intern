let employeeDetails = [
    "EMP-1002",                        
    "Amit Kumar",                      
    32,                                
    true,                              
    "amit.kumar@techcorp.com",         

    // Job Details
    {
        title: "Lead Software Engineer",
        department: "Product Development",
        startDate: "2019-03-10"
    },                                 
    95000.75,                         
    12.5,                            

    ["Python", "Django", "Docker", "Kubernetes"],  
    [
        { name: "PMP Certification", year: 2021 },
        { name: "Python Developer", year: 2020 }
    ],                              
    false,                             
    null,                              
    "Hybrid",                          

    4.8,                              
    15,                              
    {
        id: "PRJ-305",
        name: "Cloud Migration",
        status: "In Progress",
        team: ["EMP-1003", "EMP-1004"]
    },                                 

    // Address
    {
        street: "45 Tech Park Road",
        city: "Pune",
        state: "Maharashtra",
        country: "India",
        pinCode: "411001"
    },                                 

   
    true,                              
    300.25,                   
    ["Health Insurance", "Gym Membership", "Transport Allowance"], // Array: Benefits

    {
        name: "Neha Kumar",
        relation: "Spouse",
        phone: "+91-9988776655"
    },                               

    
    function(salary, bonusPercentage, monthlyDeduction) {
        const bonus = (salary * bonusPercentage) / 100;
        return salary + bonus - (monthlyDeduction * 12);
    },             

    null                    
];
console.log(employeeDetails.sort());

console.log(employeeDetails);
console.log("\n");
employeeDetails.push("abc");

employeeDetails.pop();

employeeDetails.unshift("abc");
//  let user = employeeDetails.find(item => employeeDetails.relation == "Spouse");
// console.log(user.phone);
let arr=[1,2,3,4];
console.log(arr.indexOf(3));
console.log(employeeDetails.includes(null));

// for (let value of Object.values(user)) {
//     alert(value); // John, then 30
//   }


// console.log(employeeDetails.concat(arr));
// employeeDetails.forEach((item,index,array)=>{
//     console.log(`${item} is at index ${index} in ${array}`);
// })

