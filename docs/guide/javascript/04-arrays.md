# Arrays

Arrays are ordered collections of data. They are one of the most commonly used data structures in JavaScript.

## Creating Arrays

```js
// Array literal (recommended)
const fruits = ["apple", "banana", "orange"];

// Array constructor
const numbers = new Array(1, 2, 3, 4, 5);

// Empty array
const empty = [];

// Mixed types
const mixed = [1, "hello", true, null, { name: "John" }];
```

## Accessing Elements

```js
const fruits = ["apple", "banana", "orange", "mango"];

// By index (0-based)
console.log(fruits[0]);  // "apple"
console.log(fruits[2]);  // "orange"

// Last element
console.log(fruits[fruits.length - 1]); // "mango"

// Using at() method (ES2022)
console.log(fruits.at(0));   // "apple"
console.log(fruits.at(-1));  // "mango" (negative index)
console.log(fruits.at(-2));  // "orange"
```

## Modifying Arrays

### Adding Elements

```js
const arr = [1, 2, 3];

// Add to end
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

// Add to beginning
arr.unshift(0);
console.log(arr); // [0, 1, 2, 3, 4]

// Add at specific position
arr.splice(2, 0, 1.5);
console.log(arr); // [0, 1, 1.5, 2, 3, 4]
```

### Removing Elements

```js
const arr = [1, 2, 3, 4, 5];

// Remove from end
const last = arr.pop();
console.log(last); // 5
console.log(arr);  // [1, 2, 3, 4]

// Remove from beginning
const first = arr.shift();
console.log(first); // 1
console.log(arr);   // [2, 3, 4]

// Remove at specific position
arr.splice(1, 1); // Remove 1 element at index 1
console.log(arr); // [2, 4]
```

### Replacing Elements

```js
const arr = [1, 2, 3, 4, 5];

// Direct assignment
arr[2] = 30;
console.log(arr); // [1, 2, 30, 4, 5]

// Using splice
arr.splice(1, 2, 20, 30); // Replace 2 elements starting at index 1
console.log(arr); // [1, 20, 30, 4, 5]
```

## Array Methods

### Iteration Methods

#### forEach()

Execute a function for each element:

```js
const numbers = [1, 2, 3];

numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});
// Index 0: 1
// Index 1: 2
// Index 2: 3
```

#### map()

Create a new array by transforming each element:

```js
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];

const names = users.map(user => user.name);
console.log(names); // ["Alice", "Bob"]
```

#### filter()

Create a new array with elements that pass a test:

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 17 },
    { name: "Charlie", age: 30 }
];

const adults = users.filter(user => user.age >= 18);
console.log(adults);
// [{ name: "Alice", age: 25 }, { name: "Charlie", age: 30 }]
```

#### reduce()

Reduce array to a single value:

```js
const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // 15

// Max value
const max = numbers.reduce((a, b) => a > b ? a : b);
console.log(max); // 5

// Grouping
const items = ["apple", "banana", "apple", "orange", "banana", "apple"];

const count = items.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
}, {});
console.log(count); // { apple: 3, banana: 2, orange: 1 }
```

#### find() and findIndex()

Find first matching element:

```js
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: "Bob" }

const index = users.findIndex(u => u.id === 2);
console.log(index); // 1
```

#### some() and every()

Test if elements pass a condition:

```js
const numbers = [1, 2, 3, 4, 5];

// some - at least one passes
console.log(numbers.some(n => n > 4));  // true
console.log(numbers.some(n => n > 10)); // false

// every - all must pass
console.log(numbers.every(n => n > 0)); // true
console.log(numbers.every(n => n > 3)); // false
```

### Transformation Methods

#### concat()

Merge arrays:

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

const merged = arr1.concat(arr2);
console.log(merged); // [1, 2, 3, 4, 5, 6]

// Using spread operator (preferred)
const merged2 = [...arr1, ...arr2];
console.log(merged2); // [1, 2, 3, 4, 5, 6]
```

#### slice()

Extract a portion of array:

```js
const arr = [1, 2, 3, 4, 5];

console.log(arr.slice(1, 4));  // [2, 3, 4]
console.log(arr.slice(2));     // [3, 4, 5]
console.log(arr.slice(-2));    // [4, 5]
console.log(arr.slice(1, -1)); // [2, 3, 4]
```

#### flat() and flatMap()

Flatten nested arrays:

```js
const nested = [1, [2, 3], [4, [5, 6]]];

console.log(nested.flat());    // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));   // [1, 2, 3, 4, 5, 6]
console.log(nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]

// flatMap = map + flat(1)
const sentences = ["Hello World", "How are you"];
const words = sentences.flatMap(s => s.split(" "));
console.log(words); // ["Hello", "World", "How", "are", "you"]
```

### Sorting Methods

#### sort()

Sort array in place:

```js
// Strings
const fruits = ["banana", "apple", "orange"];
fruits.sort();
console.log(fruits); // ["apple", "banana", "orange"]

// Numbers (need compare function!)
const numbers = [10, 5, 40, 25, 1000, 1];

// Wrong way
numbers.sort();
console.log(numbers); // [1, 10, 1000, 25, 40, 5] (sorted as strings!)

// Correct way
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 5, 10, 25, 40, 1000]

// Descending
numbers.sort((a, b) => b - a);
console.log(numbers); // [1000, 40, 25, 10, 5, 1]
```

#### reverse()

Reverse array in place:

```js
const arr = [1, 2, 3, 4, 5];
arr.reverse();
console.log(arr); // [5, 4, 3, 2, 1]
```

### Search Methods

#### includes()

Check if element exists:

```js
const arr = [1, 2, 3, 4, 5];

console.log(arr.includes(3));  // true
console.log(arr.includes(10)); // false
```

#### indexOf() and lastIndexOf()

Find element index:

```js
const arr = [1, 2, 3, 2, 1];

console.log(arr.indexOf(2));     // 1 (first occurrence)
console.log(arr.lastIndexOf(2)); // 3 (last occurrence)
console.log(arr.indexOf(10));    // -1 (not found)
```

### Joining Arrays

#### join()

Convert array to string:

```js
const arr = ["Hello", "World"];

console.log(arr.join(" "));  // "Hello World"
console.log(arr.join("-"));  // "Hello-World"
console.log(arr.join(""));   // "HelloWorld"
```

## Spread Operator

```js
// Copy array
const original = [1, 2, 3];
const copy = [...original];

// Merge arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4]

// Add elements
const withNew = [0, ...original, 4]; // [0, 1, 2, 3, 4]

// Convert to arguments
const numbers = [5, 2, 8, 1, 9];
console.log(Math.max(...numbers)); // 9
```

## Destructuring

```js
const arr = [1, 2, 3, 4, 5];

// Basic destructuring
const [first, second] = arr;
console.log(first, second); // 1, 2

// Skip elements
const [a, , c] = arr;
console.log(a, c); // 1, 3

// Rest pattern
const [head, ...tail] = arr;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
const [x = 10, y = 20] = [1];
console.log(x, y); // 1, 20

// Swapping
let m = 1, n = 2;
[m, n] = [n, m];
console.log(m, n); // 2, 1
```

## Common Patterns

### Remove Duplicates

```js
const arr = [1, 2, 2, 3, 3, 3, 4];

const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4]
```

### Filter and Map (Chain)

```js
const users = [
    { name: "Alice", age: 25, active: true },
    { name: "Bob", age: 17, active: true },
    { name: "Charlie", age: 30, active: false }
];

const activeAdultNames = users
    .filter(u => u.active && u.age >= 18)
    .map(u => u.name);

console.log(activeAdultNames); // ["Alice"]
```

### Group By

```js
const products = [
    { name: "Apple", category: "fruit" },
    { name: "Banana", category: "fruit" },
    { name: "Carrot", category: "vegetable" }
];

const grouped = products.reduce((acc, product) => {
    const key = product.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(product);
    return acc;
}, {});

console.log(grouped);
// {
//   fruit: [{ name: "Apple"... }, { name: "Banana"... }],
//   vegetable: [{ name: "Carrot"... }]
// }
```

## Exercises

### Exercise 1: Array Transformation
Given an array of numbers, return an array of their squares, keeping only even results.

::: details Solution
```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = numbers
    .map(n => n * n)
    .filter(n => n % 2 === 0);

console.log(result); // [4, 16, 36, 64, 100]
```
:::

### Exercise 2: Find Second Largest
Find the second largest number in an array.

::: details Solution
```js
function secondLargest(arr) {
    const sorted = [...arr].sort((a, b) => b - a);
    return sorted[1];
}

// Or without sorting
function secondLargestEfficient(arr) {
    let first = -Infinity;
    let second = -Infinity;

    for (const num of arr) {
        if (num > first) {
            second = first;
            first = num;
        } else if (num > second && num !== first) {
            second = num;
        }
    }

    return second;
}

console.log(secondLargest([5, 2, 8, 1, 9])); // 8
```
:::

### Exercise 3: Chunk Array
Split an array into chunks of specified size.

::: details Solution
```js
function chunk(arr, size) {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}

console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3));
// [[1, 2, 3], [4, 5, 6], [7]]
```
:::

## Summary

- Arrays are ordered collections accessed by index
- `push`/`pop` modify the end, `shift`/`unshift` modify the beginning
- `map`, `filter`, `reduce` are essential for data transformation
- `find` and `findIndex` locate single elements
- `sort` requires a compare function for numbers
- Spread operator and destructuring enable concise array operations
- Chain methods for complex transformations

## Next Steps

Continue to [Objects](/guide/javascript/05-objects) to learn about working with key-value data structures.
