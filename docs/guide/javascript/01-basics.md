# JavaScript Basics

Learn the fundamental building blocks of JavaScript programming.

## Variables

Variables are containers for storing data values. JavaScript has three ways to declare variables:

### var (Legacy)

```js
var name = "John";
var age = 25;
```

### let (Modern - Reassignable)

```js
let count = 0;
count = 1; // Can be reassigned
```

### const (Modern - Constant)

```js
const PI = 3.14159;
// PI = 3; // Error! Cannot reassign
```

::: tip Best Practice
Use `const` by default, and `let` when you need to reassign. Avoid `var` in modern JavaScript.
:::

## Data Types

JavaScript has 8 data types:

### Primitive Types

```js
// String
let greeting = "Hello, World!";
let name = 'Alice';
let template = `Hello, ${name}!`; // Template literal

// Number
let integer = 42;
let float = 3.14;
let negative = -10;

// BigInt
let bigNumber = 9007199254740991n;

// Boolean
let isActive = true;
let isCompleted = false;

// Undefined
let notDefined;
console.log(notDefined); // undefined

// Null
let empty = null;

// Symbol
let id = Symbol("id");
```

### Reference Type

```js
// Object
let person = {
    name: "John",
    age: 30
};

// Array (special type of object)
let fruits = ["apple", "banana", "orange"];
```

## Type Checking

Use `typeof` to check the type of a value:

```js
console.log(typeof "Hello");     // "string"
console.log(typeof 42);          // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (historical bug)
console.log(typeof {});          // "object"
console.log(typeof []);          // "object"
console.log(typeof function(){}); // "function"
```

## Operators

### Arithmetic Operators

```js
let a = 10;
let b = 3;

console.log(a + b);  // 13 (Addition)
console.log(a - b);  // 7  (Subtraction)
console.log(a * b);  // 30 (Multiplication)
console.log(a / b);  // 3.333... (Division)
console.log(a % b);  // 1  (Modulus/Remainder)
console.log(a ** b); // 1000 (Exponentiation)

// Increment and Decrement
let count = 5;
count++;  // 6
count--;  // 5
```

### Assignment Operators

```js
let x = 10;

x += 5;  // x = x + 5  → 15
x -= 3;  // x = x - 3  → 12
x *= 2;  // x = x * 2  → 24
x /= 4;  // x = x / 4  → 6
x %= 4;  // x = x % 4  → 2
```

### Comparison Operators

```js
let a = 5;
let b = "5";

// Equality (type coercion)
console.log(a == b);   // true

// Strict Equality (no type coercion)
console.log(a === b);  // false

// Inequality
console.log(a != b);   // false
console.log(a !== b);  // true

// Relational
console.log(a > 3);    // true
console.log(a < 3);    // false
console.log(a >= 5);   // true
console.log(a <= 5);   // true
```

::: warning
Always use `===` and `!==` for comparisons to avoid unexpected type coercion.
:::

### Logical Operators

```js
let a = true;
let b = false;

// AND - both must be true
console.log(a && b);  // false

// OR - at least one must be true
console.log(a || b);  // true

// NOT - inverts the boolean
console.log(!a);      // false
console.log(!b);      // true
```

### Ternary Operator

```js
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // "Adult"
```

## String Operations

```js
let firstName = "John";
let lastName = "Doe";

// Concatenation
let fullName = firstName + " " + lastName;
console.log(fullName); // "John Doe"

// Template Literals (ES6)
let greeting = `Hello, ${firstName}!`;
console.log(greeting); // "Hello, John!"

// String Methods
let text = "JavaScript";
console.log(text.length);        // 10
console.log(text.toUpperCase()); // "JAVASCRIPT"
console.log(text.toLowerCase()); // "javascript"
console.log(text.charAt(0));     // "J"
console.log(text.indexOf("S"));  // 4
console.log(text.slice(0, 4));   // "Java"
console.log(text.includes("Script")); // true
```

## Type Conversion

```js
// String to Number
let str = "42";
let num1 = Number(str);      // 42
let num2 = parseInt(str);    // 42
let num3 = parseFloat("3.14"); // 3.14
let num4 = +"42";            // 42 (unary plus)

// Number to String
let num = 42;
let str1 = String(num);      // "42"
let str2 = num.toString();   // "42"
let str3 = num + "";         // "42"

// To Boolean
console.log(Boolean(1));     // true
console.log(Boolean(0));     // false
console.log(Boolean(""));    // false
console.log(Boolean("text")); // true
console.log(Boolean(null));  // false
console.log(Boolean(undefined)); // false
```

## Exercises

### Exercise 1: Variable Declaration
Declare variables for your name, age, and whether you're a student.

::: details Solution
```js
const name = "Alice";
let age = 25;
const isStudent = true;

console.log(`${name} is ${age} years old.`);
console.log(`Student: ${isStudent}`);
```
:::

### Exercise 2: Temperature Converter
Convert Celsius to Fahrenheit using the formula: F = (C × 9/5) + 32

::: details Solution
```js
const celsius = 25;
const fahrenheit = (celsius * 9/5) + 32;

console.log(`${celsius}°C = ${fahrenheit}°F`);
// Output: 25°C = 77°F
```
:::

### Exercise 3: Swap Variables
Swap the values of two variables without using a third variable.

::: details Solution
```js
let a = 5;
let b = 10;

// Using destructuring
[a, b] = [b, a];

console.log(a); // 10
console.log(b); // 5
```
:::

## Summary

- Use `const` for values that won't change, `let` for values that will
- JavaScript has 8 data types: String, Number, BigInt, Boolean, Undefined, Null, Symbol, and Object
- Use `===` for strict equality comparisons
- Template literals make string interpolation easy
- Type conversion can be explicit or implicit

## Next Steps

Continue to [Control Flow](/guide/javascript/02-control-flow) to learn about conditionals and loops.
