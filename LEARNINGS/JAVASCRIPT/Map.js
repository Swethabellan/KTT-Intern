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

let map=new Map(Object.entries(employee));

console.log(map.get('email'));




