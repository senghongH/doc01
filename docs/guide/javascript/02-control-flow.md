# Control Flow

Learn how to control the flow of your JavaScript programs using conditionals and loops.

## Conditional Statements

### if Statement

```js
let age = 18;

if (age >= 18) {
    console.log("You are an adult");
}
```

### if...else Statement

```js
let temperature = 25;

if (temperature > 30) {
    console.log("It's hot outside");
} else {
    console.log("The weather is nice");
}
```

### if...else if...else Statement

```js
let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else if (score >= 60) {
    console.log("Grade: D");
} else {
    console.log("Grade: F");
}
```

### Nested if Statements

```js
let age = 25;
let hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        console.log("You can drive");
    } else {
        console.log("You need a license to drive");
    }
} else {
    console.log("You are too young to drive");
}
```

## Switch Statement

Use `switch` when comparing a single value against multiple options:

```js
let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
}

console.log(dayName); // "Wednesday"
```

### Switch with Multiple Cases

```js
let fruit = "apple";

switch (fruit) {
    case "apple":
    case "pear":
    case "banana":
        console.log("This is a common fruit");
        break;
    case "dragon fruit":
    case "durian":
        console.log("This is an exotic fruit");
        break;
    default:
        console.log("Unknown fruit");
}
```

::: warning
Don't forget the `break` statement! Without it, execution will "fall through" to the next case.
:::

## Loops

### for Loop

The most common loop for a known number of iterations:

```js
// Basic for loop
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// Counting backwards
for (let i = 5; i > 0; i--) {
    console.log(i); // 5, 4, 3, 2, 1
}

// Custom increment
for (let i = 0; i <= 10; i += 2) {
    console.log(i); // 0, 2, 4, 6, 8, 10
}
```

### while Loop

Executes while a condition is true:

```js
let count = 0;

while (count < 5) {
    console.log(count);
    count++;
}
// Output: 0, 1, 2, 3, 4
```

### do...while Loop

Executes at least once, then checks the condition:

```js
let count = 0;

do {
    console.log(count);
    count++;
} while (count < 5);
// Output: 0, 1, 2, 3, 4
```

The difference from `while`:

```js
let x = 10;

// This won't execute at all
while (x < 5) {
    console.log("while:", x);
}

// This executes once
do {
    console.log("do-while:", x);
} while (x < 5);
// Output: "do-while: 10"
```

### for...of Loop

Iterates over iterable objects (arrays, strings, etc.):

```js
// Array
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
    console.log(fruit);
}
// apple, banana, orange

// String
const text = "Hello";
for (const char of text) {
    console.log(char);
}
// H, e, l, l, o
```

### for...in Loop

Iterates over object properties:

```js
const person = {
    name: "John",
    age: 30,
    city: "New York"
};

for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}
// name: John
// age: 30
// city: New York
```

::: tip
Use `for...of` for arrays and `for...in` for objects.
:::

## Loop Control

### break Statement

Exits the loop immediately:

```js
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break;
    }
    console.log(i);
}
// Output: 0, 1, 2, 3, 4
```

### continue Statement

Skips the current iteration:

```js
for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue;
    }
    console.log(i);
}
// Output: 0, 1, 3, 4
```

### Labeled Statements

Control nested loops:

```js
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outer; // Breaks out of both loops
        }
        console.log(`i=${i}, j=${j}`);
    }
}
// i=0, j=0
// i=0, j=1
// i=0, j=2
// i=1, j=0
```

## Truthy and Falsy Values

JavaScript evaluates values as `true` or `false` in boolean contexts:

### Falsy Values

```js
// These are all falsy
if (false) console.log("false");
if (0) console.log("0");
if (-0) console.log("-0");
if (0n) console.log("0n");
if ("") console.log("empty string");
if (null) console.log("null");
if (undefined) console.log("undefined");
if (NaN) console.log("NaN");

// None of the above will print
```

### Truthy Values

```js
// These are all truthy
if (true) console.log("true");           // ✓
if (1) console.log("1");                 // ✓
if ("hello") console.log("string");      // ✓
if ([]) console.log("empty array");      // ✓
if ({}) console.log("empty object");     // ✓
if (function(){}) console.log("function"); // ✓
```

## Short-Circuit Evaluation

### Logical AND (&&)

```js
// Returns first falsy value or last value
console.log(true && "Hello");   // "Hello"
console.log(false && "Hello");  // false
console.log("Hi" && "Hello");   // "Hello"
console.log("" && "Hello");     // ""

// Practical use: conditional execution
const isLoggedIn = true;
isLoggedIn && console.log("Welcome!");
```

### Logical OR (||)

```js
// Returns first truthy value or last value
console.log(false || "Hello");  // "Hello"
console.log("" || "Default");   // "Default"
console.log(null || "Fallback"); // "Fallback"

// Practical use: default values
const name = userInput || "Guest";
```

### Nullish Coalescing (??)

```js
// Returns right side only if left is null or undefined
console.log(null ?? "Default");     // "Default"
console.log(undefined ?? "Default"); // "Default"
console.log(0 ?? "Default");        // 0
console.log("" ?? "Default");       // ""
console.log(false ?? "Default");    // false
```

## Exercises

### Exercise 1: FizzBuzz
Print numbers 1-20. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", for multiples of both print "FizzBuzz".

::: details Solution
```js
for (let i = 1; i <= 20; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}
```
:::

### Exercise 2: Find Prime Numbers
Print all prime numbers between 1 and 50.

::: details Solution
```js
for (let num = 2; num <= 50; num++) {
    let isPrime = true;

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            isPrime = false;
            break;
        }
    }

    if (isPrime) {
        console.log(num);
    }
}
```
:::

### Exercise 3: Pyramid Pattern
Create a pyramid pattern with 5 rows using loops.

::: details Solution
```js
const rows = 5;

for (let i = 1; i <= rows; i++) {
    let spaces = " ".repeat(rows - i);
    let stars = "*".repeat(2 * i - 1);
    console.log(spaces + stars);
}

/*
Output:
    *
   ***
  *****
 *******
*********
*/
```
:::

## Summary

- Use `if...else` for simple conditions, `switch` for multiple value comparisons
- `for` loops are ideal when you know the number of iterations
- `while` loops are useful when the condition determines when to stop
- `for...of` iterates over array values, `for...in` over object keys
- Use `break` to exit loops and `continue` to skip iterations
- Understand truthy/falsy values for cleaner conditionals
- Short-circuit evaluation enables concise conditional logic

## Next Steps

Continue to [Functions](/guide/javascript/03-functions) to learn about creating reusable code blocks.
