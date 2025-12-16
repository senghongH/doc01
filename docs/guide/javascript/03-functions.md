# Functions

Functions are reusable blocks of code that perform specific tasks. They are fundamental to JavaScript programming.

## Function Declaration

The traditional way to define a function:

```js
function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet("Alice")); // "Hello, Alice!"
```

### Function with Multiple Parameters

```js
function add(a, b) {
    return a + b;
}

console.log(add(5, 3)); // 8
```

### Function without Return

```js
function logMessage(message) {
    console.log(message);
    // implicitly returns undefined
}

const result = logMessage("Hello");
console.log(result); // undefined
```

## Function Expression

Assign a function to a variable:

```js
const multiply = function(a, b) {
    return a * b;
};

console.log(multiply(4, 5)); // 20
```

## Arrow Functions (ES6)

A concise syntax for writing functions:

```js
// Basic arrow function
const greet = (name) => {
    return `Hello, ${name}!`;
};

// Single parameter - parentheses optional
const double = n => n * 2;

// Multiple parameters - parentheses required
const add = (a, b) => a + b;

// No parameters - empty parentheses required
const sayHello = () => "Hello!";

// Returning an object - wrap in parentheses
const createUser = (name, age) => ({ name, age });

console.log(double(5));         // 10
console.log(add(3, 4));         // 7
console.log(createUser("John", 25)); // { name: "John", age: 25 }
```

::: tip When to Use Arrow Functions
- Short, simple functions
- Callbacks
- When you need to preserve `this` context
:::

## Parameters and Arguments

### Default Parameters

```js
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}

console.log(greet());        // "Hello, Guest!"
console.log(greet("Alice")); // "Hello, Alice!"
```

### Rest Parameters

Collect remaining arguments into an array:

```js
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));       // 6
console.log(sum(1, 2, 3, 4, 5)); // 15
```

### Combining Parameters

```js
function introduce(greeting, ...names) {
    return `${greeting}, ${names.join(" and ")}!`;
}

console.log(introduce("Hello", "Alice", "Bob", "Charlie"));
// "Hello, Alice and Bob and Charlie!"
```

### Arguments Object

Available in regular functions (not arrow functions):

```js
function showArgs() {
    console.log(arguments);
    console.log(arguments.length);
}

showArgs(1, 2, 3); // [1, 2, 3], 3
```

## Scope

### Global Scope

```js
const globalVar = "I'm global";

function showGlobal() {
    console.log(globalVar); // Accessible
}

showGlobal();
```

### Function Scope

```js
function myFunction() {
    const localVar = "I'm local";
    console.log(localVar); // Accessible
}

myFunction();
// console.log(localVar); // Error: not defined
```

### Block Scope (let and const)

```js
if (true) {
    let blockScoped = "I'm block scoped";
    const alsoBlockScoped = "Me too";
    var notBlockScoped = "I escape blocks";
}

// console.log(blockScoped);     // Error
// console.log(alsoBlockScoped); // Error
console.log(notBlockScoped);     // "I escape blocks"
```

### Lexical Scope (Closures)

Inner functions have access to outer function variables:

```js
function outer() {
    const outerVar = "I'm from outer";

    function inner() {
        console.log(outerVar); // Can access outerVar
    }

    inner();
}

outer(); // "I'm from outer"
```

## Closures

A closure is a function that remembers its lexical scope:

```js
function createCounter() {
    let count = 0;

    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

const counter2 = createCounter();
console.log(counter2()); // 1 (separate instance)
```

### Practical Closure Example

```js
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

## Higher-Order Functions

Functions that take functions as arguments or return functions:

### Function as Argument

```js
function processArray(arr, callback) {
    const result = [];
    for (const item of arr) {
        result.push(callback(item));
    }
    return result;
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### Function as Return Value

```js
function createGreeter(greeting) {
    return function(name) {
        return `${greeting}, ${name}!`;
    };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

console.log(sayHello("Alice")); // "Hello, Alice!"
console.log(sayHi("Bob"));      // "Hi, Bob!"
```

## Immediately Invoked Function Expression (IIFE)

A function that runs immediately after being defined:

```js
(function() {
    const private = "I'm private";
    console.log(private);
})();

// Arrow function IIFE
(() => {
    console.log("Arrow IIFE");
})();

// With parameters
((name) => {
    console.log(`Hello, ${name}!`);
})("World");
```

## Recursion

A function that calls itself:

```js
// Factorial: n! = n × (n-1) × (n-2) × ... × 1
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log(factorial(5)); // 120 (5 × 4 × 3 × 2 × 1)

// Fibonacci sequence
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(7)); // 13 (0, 1, 1, 2, 3, 5, 8, 13)
```

::: warning
Always include a base case to prevent infinite recursion!
:::

## The `this` Keyword

The value of `this` depends on how a function is called:

```js
const person = {
    name: "Alice",
    greet: function() {
        console.log(`Hello, I'm ${this.name}`);
    },
    greetArrow: () => {
        console.log(`Hello, I'm ${this.name}`); // 'this' is not the object!
    }
};

person.greet();      // "Hello, I'm Alice"
person.greetArrow(); // "Hello, I'm undefined"
```

### Binding `this`

```js
function greet() {
    console.log(`Hello, ${this.name}`);
}

const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

// call - invokes immediately with arguments
greet.call(person1);           // "Hello, Alice"

// apply - like call, but arguments as array
greet.apply(person2);          // "Hello, Bob"

// bind - returns a new function
const greetAlice = greet.bind(person1);
greetAlice();                  // "Hello, Alice"
```

## Callback Functions

Functions passed as arguments to other functions:

```js
function fetchData(callback) {
    // Simulate async operation
    setTimeout(() => {
        const data = { id: 1, name: "Product" };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log("Received:", data);
});

// With arrow function
fetchData((data) => {
    console.log("Received:", data);
});
```

## Exercises

### Exercise 1: Function Composition
Create a function that composes two functions together.

::: details Solution
```js
function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}

const addOne = x => x + 1;
const double = x => x * 2;

const addOneThenDouble = compose(double, addOne);
console.log(addOneThenDouble(5)); // 12 ((5 + 1) * 2)
```
:::

### Exercise 2: Memoization
Create a memoized version of a function that caches results.

::: details Solution
```js
function memoize(fn) {
    const cache = {};

    return function(...args) {
        const key = JSON.stringify(args);

        if (key in cache) {
            console.log("From cache");
            return cache[key];
        }

        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

const slowAdd = (a, b) => {
    // Simulate slow operation
    return a + b;
};

const fastAdd = memoize(slowAdd);
console.log(fastAdd(1, 2)); // 3 (calculated)
console.log(fastAdd(1, 2)); // 3 (from cache)
```
:::

### Exercise 3: Curry Function
Implement a curry function that transforms f(a, b, c) into f(a)(b)(c).

::: details Solution
```js
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        };
    };
}

function add(a, b, c) {
    return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```
:::

## Summary

- Functions can be declared, expressed, or written as arrow functions
- Default and rest parameters provide flexibility
- Scope determines variable accessibility
- Closures remember their lexical environment
- Higher-order functions accept or return functions
- `this` binding varies based on how a function is called
- Callbacks are essential for asynchronous programming

## Next Steps

Continue to [Arrays](/guide/javascript/04-arrays) to learn about working with collections of data.
