let employee = {
    id: "EMP-1001",
    firstName: "Priya",
    lastName: "Bellan",
    age: 28,
    gender: "Female",
    email: "priyabellan@gmail.com",
    phoneNumber: "9876543210",

    department: "Software Engineering",
    jobTitle: "Senior Developer",
    employeeType: "Full-Time",
    salary: 85000.50,
    bonusPercentage: 15,
    startDate: "2020-06-15",
    manager: {
        name: "Swetha",
        id: "EMP-0500",
        email: "swetha@gmail.com"
    },


    skills: ["JavaScript", "React", "Node.js", "SQL", "AWS"],
    certifications: [
        { name: "AWS Certified Developer", year: 2022 },
        { name: "SQL", year: 2023 }
    ],

    isActive: true,
    onLeave: false,
    leaveType: null,

    performanceScore: 4.7, 
    projectsCompleted: 12,
    currentProject: {
        projectId: "PRJ-202",
        name: "E-Commerce Platform Upgrade",
        deadline: "2025-07-30",
        teamSize: 6
    },


    address: {
        street: "123 Green Avenue",
        city: "Bangalore",
        state: "Karnataka",
        country: "India",
        postalCode: "560001"
    },

   
    healthInsurance: true,
    monthlyDeduction: 250.75,
    benefits: ["Health Insurance", "Dental Coverage", "Paid Time Off"],

   
    emergencyContact: {
        name: "Sushma Bellan",
        relation: "Daughter",
        phone: "9123456789"
    },
    addbenefits:function(benift){
        this.benefits.push(benift)
        console.log(`${benift}`)
    }
    ,
    calculateFinalSalary: function() {
        const bonusAmount = (this.salary * this.bonusPercentage) / 100;
        return this.salary + bonusAmount - (this.monthlyDeduction * 12);
    }
};

employee.addbenefits("Hike");
console.log(employee.benefits);
employee.finalSalary = employee.calculateFinalSalary();


delete employee.calculateFinalSalary;

console.log(employee);
console.log("\n");

console.log("Lowercase : " +employee.firstName.toLowerCase());
console.log(employee.email.toLowerCase()); 
console.log("UpperCase : " + employee.lastName.toUpperCase()); 
console.log(employee.id.toUpperCase()); 
console.log("Slice : " + employee.email.slice(0, 5));
console.log(employee.phoneNumber.slice(0, 3)); 
console.log("Substring : " +employee.startDate.substring(0, 4));
console.log(employee.jobTitle.substring(7)); 
console.log("Replace : " + employee.email.replace("gmail", "company")); 
console.log(employee.jobTitle.replace("Senior", "Lead")); 
let skillsString = employee.skills.join(", ");
console.log(skillsString.replaceAll(",", ";")); 
console.log("Split : " + employee.email.split("@")); 
console.log(employee.startDate.split("-")); 
console.log("Accessing character : " +employee.firstName.charAt(0)); 
console.log(employee.id.charAt(4)); 
console.log("index : " +employee.email.indexOf("@")); 
console.log(employee.department.indexOf("Engineering")); 
console.log(employee.employeeType.indexOf('T',3));
console.log("LAst occurence : " + employee.phoneNumber.lastIndexOf("-")); 
console.log(employee.email.lastIndexOf(".")); 
console.log("Includes : "+ employee.department.includes("Software"));
console.log(employee.email.includes("gmail"));
console.log(employee.email.includes("gmail",3));
console.log("Startswith : " +employee.phoneNumber.startsWith("+91")); 
console.log(employee.id.startsWith("EMP"));
console.log("EndsWith : " +employee.email.endsWith(".com")); 
console.log("Concat : " +employee.firstName.concat(" ", employee.lastName)); 
console.log("Formatting patterns : "+"-".repeat(10)); 
console.log("Format Strings : " +employee.id.padStart(10, "0")); 
console.log(employee.startDate.padStart(12, "-")); 
console.log(employee.firstName.padEnd(10, ".")); 
console.log(employee.jobTitle.padEnd(20, " ")); 

console.log("\n");
let fullName = employee.firstName.concat(" ", employee.lastName).toUpperCase();
let emailDomain = employee.email.split("@")[1];
let shortId = employee.id.slice(4);

console.log(`Employee: ${fullName}`);
console.log(`Domain: ${emailDomain}`);
console.log(`ID Number: ${shortId}`);
