Why variables?
 Container that stores a value. 
1.storage purpose ->store data's temporarily in memory. 
2.reusability->Once set, it can reference multiple times without repeating the value again. 
3.Flexibility,dynamic->Can change value of it during runtime allowing it to adapt situations or inputs. 
4.Readability->Descriptive names give reader an idea of what value represents making it self-documenting.
 5.Reduce error->Without it, when manually updating is error prone. It helps to reduce error.
 6.Calculations-> 7.Scope Control->defines the scope of data.

 Not necessary: 
1.No need for reuse
 2.Direct Calculations 
3.Where not needing to return any value(in function)
 4.Hardcoded Data ->data that is directly embedded into the source code of a program
Implicit Global Variable Declaration  
myVariable = 42;

 Var:------------------------------------------------
1.Traditional way of declaring variables
 2.Global scope->This means that a variable declared with var inside a function is accessible throughout the entire function, regardless of the block (loops, conditionals, etc.) in which it was declared.
 3.Hoisting->Variables declared with var are hoisted to the top of their scope (function or global).
 This means that you can reference a var variable before its actual declaration in the code, but its value will be undefined until the assignment is made. 
4.Re-declared in same scope 

1.Declaring: var x = 10; 
console.log(x); // Output: 10 
2.Redeclaring: 
var y = 5; 
var y = 20; // Redeclaration of 'y' without error 
console.log(y); // Output: 20
 3.Hoisting:
 a; 
var a;
 a=10;

 Let------------------------------------------------
1.Block-scope->only accessible within the block in which it is defined
 if (true) { 
let x = 5; 
console.log(x); // Output: 5 
} 
console.log(x); // Error 
2.No hoisting 
3.No redeclaration in the same scope

 const-----------------------------------------------
 1.used for immutability of the reference-->reference to the value is constant and doesnt mean value is const
 2.It can change only in object and arrays because it is reference types.
 When you declare them with const, the reference to the object or array is immutable, but the contents of the object or array can still be modified.



Basic operations:
An operator is unary if it has a single operand. 
An operator is binary if it has a two operand. 
Addition +,
Subtraction -,
Multiplication *,
Division /,
Remainder %,
Exponentiation **.


String:
 if the binary + is applied to strings, it merges (concatenates) them:
let s = "my" + "string";
alert(s); // mystring
Note that if any of the operands is a string, then the other one is converted to a string too.

The binary + is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.
alert( 6 - '2' ); // 4, converts '2' to a number
alert( '6' / '2' ); // 3, converts both operands to numbers

The unary plus or, in other words, the plus operator + applied to a single value, doesn’t do anything to numbers. But if the operand is not a number, the unary plus converts it into a number.

let x = 1;
alert( +x ); // 1

let y = -2;
alert( +y ); // -2

// Converts non-numbers
alert( +true ); // 1
alert( +"" );   // 0
Binary addition in string--------
let apples = "2";
let oranges = "3";

alert( apples + oranges ); // "23", the binary plus concatenates strings

Binary addition if we want to treat it as a number----
let apples = "2";
let oranges = "3";

// both values converted to numbers before the binary plus
alert( +apples + +oranges ); // 5

Precedence:
If the precedence is the same, the execution order is from left to right.
Chained assignments evaluate from right to left.
Eg;a = b = c = 2 + 2;

Modify-in-place:
 to apply an operator to a variable and store the new result in that same variable.
eg;let n = 2;
n = n + 5;
n = n * 2;

Increment/Decrement:
Increasing or decreasing a number by one is among the most common numerical operations.
“postfix form”: counter++--increment/decrement after the value is used
“prefix form” :++counter-------  increment/decrement before the value is used 



Bitwise operators:
AND ( & )
OR ( | )
XOR ( ^ )
NOT ( ~ )
LEFT SHIFT ( << )
RIGHT SHIFT ( >> )
ZERO-FILL RIGHT SHIFT ( >>> )

Comma-----The comma operator , is one of the rarest and most unusual operators. Sometimes, it’s used to write shorter code, so we need to know it in order to understand what’s going on.

The comma operator allows us to evaluate several expressions, dividing them with a comma ,. Each of them is evaluated but only the result of the last one is returned.
let a = (1 + 2, 3 + 4);
alert( a );---only 3+4 is returned.





Comparisons----------------------------------------------------------------
Number comparison:

Greater/less than: a > b, a < b.
Greater/less than or equals: a >= b, a <= b.
Equals: a == b
Not equal


All comparison operators return a boolean value:

true – means “yes”, “correct” or “the truth”.
false – means “no”, “wrong” or “not the truth”

String comparison:

To see whether a string is greater than another, JavaScript uses the so-called “dictionary” or “lexicographical” order.

Comparison between different types
When comparing values of different types, JavaScript converts the values to numbers.\\

Eg: alert( '2' > 1 );
alert( true == 1 );

Strict equality:
A regular equality check == has a problem. It cannot differentiate 0 from false

A strict equality operator === checks the equality without type conversion
alert( null == undefined ); // true
alert( null === undefined ); // false

null/undefined are converted to numbers: null becomes 0, while undefined becomes NaN.

The value undefined shouldn’t be compared to other values:

Comparison operators return a boolean value.
Strings are compared letter-by-letter in the “dictionary” order.
When values of different types are compared, they get converted to numbers (with the exclusion of a strict equality check).
The values null and undefined equal == each other and do not equal any other value.




Conditional statements->>
to perform different actions based on different conditions.

If condition:
The if(...) statement evaluates a condition in parentheses and, if the result is true, executes a block of code.
The if (…) statement evaluates the expression in its parentheses and converts the result to a boolean.
A number 0, an empty string "", null, undefined, and NaN all become false

Ternary operator:
let age = prompt('age?', 18);

let message = (age < 3) ? 'Hi, baby!' :
  (age < 18) ? 'Hello!' :
  (age < 100) ? 'Greetings!' :
  'What an unusual age!';

alert( message );





Logical--------------------------------------------------------------------------------------------------------------------

|| (OR), && (AND), ! (NOT), ?? (Nullish Coalescing)
they can be applied to values of any type, not only Boolean
Their result can also be of any type.


The “OR” operator is represented with two vertical line symbols:
result = a || b;
the logical OR is meant to manipulate boolean values only. If any of its arguments are true, it returns true, otherwise it returns false.

OR || extended version in javascript:
The OR || operator does the following:

Evaluates operands from left to right.
For each operand, converts it to boolean. If the result is true, stops and returns the original value of that operand.
If all operands have been evaluated (i.e. all were false), returns the last operand.
A value is returned in its original form, without the conversion.

alert( 1 || 0 ); // 1 (1 is truthy)
alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)
alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)

->Another feature of OR || operator is the so-called “short-circuit” evaluation.
It means that || processes its arguments until the first truthy value is reached, and then the value is returned immediately, without even touching the other argument.

The AND operator is represented with two ampersands &&:

result = a && b;
In classical programming, AND returns true if both operands are truthy and false otherwise

The AND && operator does the following:

Evaluates operands from left to right.
For each operand, converts it to a boolean. If the result is false, stops and returns the original value of that operand.
If all operands have been evaluated (i.e. all were truthy), returns the last operand.

 AND returns the first falsy value or the last value if none were found.


The boolean NOT operator is represented with an exclamation sign !.

The syntax is pretty simple:

result = !value;The boolean NOT operator is represented with an exclamation sign !.

The syntax is pretty simple:

result = !value;

The operator accepts a single argument and does the following:

Converts the operand to boolean type: true/false.
Returns the inverse value

---------------------------------------------------|
let userName = prompt("Who's there?", '');

if (userName === 'Admin') {

  let pass = prompt('Password?', '');

  if (pass === 'TheMaster') {
    alert( 'Welcome!' );
  } else if (pass === '' || pass === null) {
    alert( 'Canceled' );
  } else {
    alert( 'Wrong password' );
  }

} else if (userName === '' || userName === null) {
  alert( 'Canceled' );
} else {
  alert( "I don't know you" );
}
-----------------------------------------------------
Loops------------------------------------------------
(while and for)
We often need to repeat actions  -> Loops are a way to repeat the same code multiple times.
A single execution of the loop body is called an iteration
do while ->The loop will first execute the body, then check the condition, and, while it’s truthy, execute it again and again.
JavaScript supports different kinds of loops:

for - loops through a block of code a number of times
for/in - loops through the properties of an object
for/of - loops through the values of an iterable object
while - loops through a block of code while a specified condition is true
do/while - also loops through a block of code while a specified condition is true


Switch:--------
Use the switch statement to select one of many code blocks to be executed.




Jasvascript specials-----------------------
!.Code structure -->line break with semicolon,line-break without,
2.Strict mode --->he directive must be at the top of a script or at the beginning of a function body.
Without "use strict", everything still works, but some features behave in the old-fashioned, “compatible” way. We’d generally prefer the modern behavior
3.variables-->dynamically typed.
4.8 datatypes --> typeof operator
5.Interactions-->prompt(question, [default])
Ask a question, and return either what the visitor entered or null if they clicked “cancel”.
confirm(question)
Ask a question and suggest to choose between Ok and Cancel. The choice is returned as true/false.
alert(message)
Output a message.

6.Operators-->Arithmetic,assignment,bitwise,conditional,logical,comparisons,Nullish coalescing operator
7.Loops-->while,do,for  , Directives->Break/continue;
8.Switch  ->>The “switch” construct can replace multiple if checks. It uses === (strict equality) for comparisons
9.Functions--->Function declaration:function sum(a, b) {
 				 let result = a + b;
 				 return result;
}


expression:let sum = function(a, b) {
 	 let result = a + b;
	 return result;
};

Arrow-->let sum = (a, b) => a + b;
let sum = (a, b) => {
  return a + b;		//multiline syntax with return
}

let sayHi = () => alert("Hello");//without arguments

let double = n => n * 2;//single argument



(a, b, ...r) => expression
(a = 400, b = 20, c) => expression
([a, b] = [10, 20]) => expression
({ a, b } = { a: 10, b: 20 }) => expression

Objects----------------------------------
Objects are associative arrays with several special features.

They store properties (key-value pairs), where:

Property keys must be strings or symbols (usually strings).
Values can be of any type.
To access a property, we can use:

The dot notation: obj.property.
Square brackets notation obj["property"]. Square brackets allow taking the key from a variable, like obj[varWithKey].
Additional operators:

To delete a property: delete obj.prop.
To check if a property with the given key exists: "key" in obj.
To iterate over an object: for (let key in obj) loop.

Object reference and copying-------------------------
A variable assigned to an object stores not the object itself, but its “address in memory” – in other words “a reference” to it.

When an object variable is copied, the reference is copied, but the object itself is not duplicated.

let user = { name: "John" };

let admin = user; // copy the reference


Constructor operators----------------------------
Constructor functions technically are regular functions. There are two conventions though:

They are named with capital letter first.
They should be executed only with "new" operator.


Symbol-----------------------------------------------
A “symbol” represents a unique identifier.
let id = Symbol();
Two symbols with same description-not equal
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false

Symbols don’t auto-convert to a string:

let id = Symbol("id");
alert(id); // TypeError: Cannot convert a Symbol value to a string

let id = Symbol("id");
alert(id.toString()); // Symbol(id), now it works

Symbols allow us to create “hidden” properties of an object, that no other part of code can accidentally access or overwrite.



