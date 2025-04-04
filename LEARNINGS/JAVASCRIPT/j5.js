// Simple Student object
const student = {
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
    name1:"Swetha\nBellan",
    name2:`Swetha
Bellan`,
    // Array of subjects and grades
    subjects: [
      { name: "Math", grade: 85 },
      { name: "English", grade: 90 },
      { name: "Science", grade: 88 }
    ],
  
    // Array of hobbies
    hobbies: ["Soccer", "Reading", "Drawing","Dancing"],
  
    // Methods
    addSubject: function(subjectName, grade) {
      this.subjects.push({ name: subjectName, grade: grade });
      console.log(`Added ${subjectName} with grade ${grade}.`);
    },
  
    getAverageGrade: function() {
      const total = this.subjects.reduce((sum, subject) => sum + subject.grade, 0);
      const average = total / this.subjects.length;
      return average;
    },
  
    showDetails: function() {
      console.log(this.name.toUpperCase());
      console.log(`Student: ${this.name}`);
      console.log(`Age: ${this.age}`);
      console.log(`Grade Level: ${this.gradeLevel}`);
      console.log(`Active: ${this.isActive ? "Yes" : "No"}`);
      console.log(`Hobbies: ${this.hobbies.join(", ")}`);
      console.log(`Average Grade: ${this.getAverageGrade().toFixed(1)}`);
    },
  
    addHobby: function(hobby) {
      this.hobbies.push(hobby);
      console.log(`Added hobby: ${hobby}`);
    }
  };
  console.log("Details of students\n");
  console.log(student);
  console.log("\n");
  console .log("SOME BASIC MATH OPERATIONS");
   console.log(student.a==student.b);
    console.log(student.a.toString(2));
    console.log("Round = " + Math.round(student.points));
    console.log("toFixed = " + student.points.toFixed(2));
    console.log("Arguments to numbers = "+isFinite(student.a));
    console.log(isFinite(student.name));
    console.log("NaN = " + Number.isNaN(student.name));
    console.log("NaN = " + isNaN(student.name));
    console.log("Int conversion = " + parseInt(student.points));
    console.log("Int conversion = " + parseInt(student.b,8));
    console.log("Math random number generation = " + Math.random());
    console.log("Math random = " + Math.random(1,5));
    // console.log("max = " +Math.max(student.subjects.grade[0],student.subjects.grade[1]));
    console.log("Min = " + Math.min(student.age,student.gradeLevel));
    console.log("Max = " + Math.max(student.age,student.gradeLevel));
    console.log("\n");
    console.log("String\'s manipulation");
    console.log(student.name1 == student.name2);
    console.log("Length of the name property = " + student.name.length);
    console.log("Accessing characters= " + student.name[0]);
    console.log("Accessing characters= " + student.name.at(-1));
    for(let char of student.name){
        console.log(char);
    }
    console.log("String's are immutable")
    // student.name='b' + student.name[8];
    console.log(student.name);
    console.log("Changing the case :" + student.name1.toUpperCase());
    console.log("Changing the case :" + student.name2.toLowerCase());
    console.log("Changing the case of a single character:" + student.name1[0].toUpperCase());
    console.log("Searching for a substring ="+student.name.indexOf('eth'));
    console.log("Searching for a substring from a position ="+student.name.indexOf('eth',2));
    console.log("includes : " + student.name.includes("Swetha"));
    console.log("Startswith = "+student.name.startsWith('Sw'));
    console.log("endswith = "+student.name.endsWith('an'));
    console.log("\n");
    console.log("Getting a substring : ")
    // console.log("slice->extracts a part of a string= "+ student.name(0,5));
    console.log("Substring -> Returns the part of the string between start and end\n "+ student.name.substring(2,6));
    console.log("Substr -> Returns the part of the string from start, with the given length.\n "+ student.name.substr(-4,2));
    console.log("codePointAt->Returns a decimal number representing the code for the character at position = " +student.name.codePointAt(0) );
    console.log("codePointAt->Returns a decimal number representing the code for the character at position (hexa)= " +student.name.codePointAt(0).toString(16) );
   
    

  // Testing the student object
  console.log("Initial Student Details:");
  student.showDetails();
  
  // Adding a new subject
  student.addSubject("History", 87);
  
  // Adding a new hobby
  student.addHobby("Swimming");
  
  // Showing updated details
  console.log("\nUpdated Student Details:");
  student.showDetails();

