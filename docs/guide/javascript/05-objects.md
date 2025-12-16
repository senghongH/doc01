# Objects

Objects are collections of key-value pairs. They are fundamental to JavaScript and used to represent complex data structures.

## Creating Objects

```js
// Object literal (recommended)
const person = {
    name: "John",
    age: 30,
    city: "New York"
};

// Object constructor
const car = new Object();
car.brand = "Toyota";
car.model = "Camry";

// Object.create()
const proto = { greet() { return "Hello"; } };
const obj = Object.create(proto);
```

## Accessing Properties

```js
const person = {
    name: "John",
    age: 30,
    "favorite color": "blue"
};

// Dot notation
console.log(person.name); // "John"

// Bracket notation
console.log(person["age"]); // 30
console.log(person["favorite color"]); // "blue"

// Dynamic property access
const prop = "name";
console.log(person[prop]); // "John"
```

## Modifying Objects

```js
const person = {
    name: "John",
    age: 30
};

// Add property
person.city = "New York";
person["country"] = "USA";

// Modify property
person.age = 31;

// Delete property
delete person.city;

console.log(person); // { name: "John", age: 31, country: "USA" }
```

## Object Methods

Methods are functions stored as object properties:

```js
const calculator = {
    value: 0,

    add(n) {
        this.value += n;
        return this;
    },

    subtract(n) {
        this.value -= n;
        return this;
    },

    getValue() {
        return this.value;
    }
};

// Method chaining
calculator.add(5).add(3).subtract(2);
console.log(calculator.getValue()); // 6
```

## Shorthand Syntax

### Property Shorthand

```js
const name = "John";
const age = 30;

// Old way
const person1 = {
    name: name,
    age: age
};

// Shorthand (ES6)
const person2 = { name, age };
console.log(person2); // { name: "John", age: 30 }
```

### Method Shorthand

```js
// Old way
const obj1 = {
    greet: function() {
        return "Hello";
    }
};

// Shorthand (ES6)
const obj2 = {
    greet() {
        return "Hello";
    }
};
```

### Computed Property Names

```js
const prop = "name";
const prefix = "user";

const obj = {
    [prop]: "John",
    [`${prefix}Id`]: 123,
    [`get${prop.charAt(0).toUpperCase() + prop.slice(1)}`]() {
        return this.name;
    }
};

console.log(obj); // { name: "John", userId: 123, getName: [Function] }
console.log(obj.getName()); // "John"
```

## Object Destructuring

```js
const person = {
    name: "John",
    age: 30,
    city: "New York"
};

// Basic destructuring
const { name, age } = person;
console.log(name, age); // "John" 30

// Renaming variables
const { name: fullName, age: years } = person;
console.log(fullName, years); // "John" 30

// Default values
const { country = "USA" } = person;
console.log(country); // "USA"

// Nested destructuring
const user = {
    id: 1,
    profile: {
        name: "Alice",
        email: "alice@example.com"
    }
};

const { profile: { name: userName, email } } = user;
console.log(userName, email); // "Alice" "alice@example.com"

// Rest pattern
const { name: n, ...rest } = person;
console.log(n);    // "John"
console.log(rest); // { age: 30, city: "New York" }
```

## Spread Operator

```js
const defaults = {
    theme: "light",
    fontSize: 14,
    language: "en"
};

const userPrefs = {
    theme: "dark",
    fontSize: 16
};

// Merge objects (later values override)
const settings = { ...defaults, ...userPrefs };
console.log(settings);
// { theme: "dark", fontSize: 16, language: "en" }

// Copy object
const copy = { ...defaults };

// Add/override properties
const extended = { ...defaults, fontSize: 18, notifications: true };
```

## Object Static Methods

### Object.keys(), Object.values(), Object.entries()

```js
const person = {
    name: "John",
    age: 30,
    city: "New York"
};

console.log(Object.keys(person));
// ["name", "age", "city"]

console.log(Object.values(person));
// ["John", 30, "New York"]

console.log(Object.entries(person));
// [["name", "John"], ["age", 30], ["city", "New York"]]

// Iterate with entries
for (const [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}
```

### Object.assign()

```js
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const result = Object.assign(target, source);
console.log(result); // { a: 1, b: 3, c: 4 }
console.log(target); // { a: 1, b: 3, c: 4 } (modified!)

// Clone without modifying original
const clone = Object.assign({}, target);
```

### Object.freeze() and Object.seal()

```js
const frozen = Object.freeze({ name: "John" });
frozen.name = "Jane";  // Silently fails (throws in strict mode)
frozen.age = 30;       // Silently fails
console.log(frozen);   // { name: "John" }

const sealed = Object.seal({ name: "John" });
sealed.name = "Jane";  // Works! Can modify existing
sealed.age = 30;       // Fails! Cannot add new
console.log(sealed);   // { name: "Jane" }
```

### Object.fromEntries()

```js
const entries = [
    ["name", "John"],
    ["age", 30],
    ["city", "New York"]
];

const obj = Object.fromEntries(entries);
console.log(obj); // { name: "John", age: 30, city: "New York" }

// Convert Map to Object
const map = new Map([["a", 1], ["b", 2]]);
const objFromMap = Object.fromEntries(map);
console.log(objFromMap); // { a: 1, b: 2 }
```

## Checking Properties

```js
const person = {
    name: "John",
    age: 30
};

// in operator
console.log("name" in person);    // true
console.log("city" in person);    // false

// hasOwnProperty
console.log(person.hasOwnProperty("name"));    // true
console.log(person.hasOwnProperty("toString")); // false (inherited)

// Optional chaining
const user = { profile: { name: "John" } };
console.log(user.profile?.name);     // "John"
console.log(user.settings?.theme);   // undefined (no error)
console.log(user.settings?.theme ?? "light"); // "light" (with fallback)
```

## Iterating Over Objects

```js
const person = {
    name: "John",
    age: 30,
    city: "New York"
};

// for...in loop
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Object.keys()
Object.keys(person).forEach(key => {
    console.log(`${key}: ${person[key]}`);
});

// Object.entries()
for (const [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}
```

## Nested Objects

```js
const company = {
    name: "Tech Corp",
    address: {
        street: "123 Main St",
        city: "San Francisco",
        country: "USA"
    },
    employees: [
        { name: "John", role: "Developer" },
        { name: "Jane", role: "Designer" }
    ]
};

// Accessing nested properties
console.log(company.address.city); // "San Francisco"
console.log(company.employees[0].name); // "John"

// Deep cloning (structured clone)
const deepCopy = structuredClone(company);

// Or with JSON (loses functions and special types)
const jsonCopy = JSON.parse(JSON.stringify(company));
```

## Getters and Setters

```js
const person = {
    firstName: "John",
    lastName: "Doe",

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    set fullName(value) {
        const parts = value.split(" ");
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
};

console.log(person.fullName); // "John Doe"

person.fullName = "Jane Smith";
console.log(person.firstName); // "Jane"
console.log(person.lastName);  // "Smith"
```

## Object.defineProperty()

For fine-grained property control:

```js
const person = {};

Object.defineProperty(person, "name", {
    value: "John",
    writable: true,      // Can be modified
    enumerable: true,    // Shows in for...in
    configurable: true   // Can be deleted/reconfigured
});

Object.defineProperty(person, "id", {
    value: 12345,
    writable: false,     // Read-only
    enumerable: false    // Hidden from iteration
});

console.log(person.name);       // "John"
console.log(Object.keys(person)); // ["name"] (id is hidden)
```

## Common Patterns

### Factory Function

```js
function createUser(name, age) {
    return {
        name,
        age,
        greet() {
            return `Hi, I'm ${this.name}`;
        }
    };
}

const user1 = createUser("Alice", 25);
const user2 = createUser("Bob", 30);
```

### Object Composition

```js
const canWalk = {
    walk() {
        return `${this.name} is walking`;
    }
};

const canSwim = {
    swim() {
        return `${this.name} is swimming`;
    }
};

function createDuck(name) {
    return Object.assign(
        { name },
        canWalk,
        canSwim
    );
}

const duck = createDuck("Donald");
console.log(duck.walk()); // "Donald is walking"
console.log(duck.swim()); // "Donald is swimming"
```

## Exercises

### Exercise 1: Deep Merge
Create a function that deeply merges two objects.

::: details Solution
```js
function deepMerge(target, source) {
    const result = { ...target };

    for (const key of Object.keys(source)) {
        if (source[key] instanceof Object && !Array.isArray(source[key])) {
            result[key] = deepMerge(result[key] || {}, source[key]);
        } else {
            result[key] = source[key];
        }
    }

    return result;
}

const obj1 = {
    a: 1,
    b: { c: 2, d: 3 }
};

const obj2 = {
    b: { d: 4, e: 5 },
    f: 6
};

console.log(deepMerge(obj1, obj2));
// { a: 1, b: { c: 2, d: 4, e: 5 }, f: 6 }
```
:::

### Exercise 2: Object Difference
Find properties that differ between two objects.

::: details Solution
```js
function objectDiff(obj1, obj2) {
    const diff = {};
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

    for (const key of allKeys) {
        if (obj1[key] !== obj2[key]) {
            diff[key] = {
                old: obj1[key],
                new: obj2[key]
            };
        }
    }

    return diff;
}

const before = { name: "John", age: 30, city: "NYC" };
const after = { name: "John", age: 31, country: "USA" };

console.log(objectDiff(before, after));
// {
//   age: { old: 30, new: 31 },
//   city: { old: "NYC", new: undefined },
//   country: { old: undefined, new: "USA" }
// }
```
:::

### Exercise 3: Path Access
Access nested object properties using a string path.

::: details Solution
```js
function getByPath(obj, path) {
    return path.split(".").reduce((current, key) => current?.[key], obj);
}

function setByPath(obj, path, value) {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
        if (!(key in current)) current[key] = {};
        return current[key];
    }, obj);
    target[lastKey] = value;
}

const data = {
    user: {
        profile: {
            name: "John"
        }
    }
};

console.log(getByPath(data, "user.profile.name")); // "John"

setByPath(data, "user.profile.age", 30);
console.log(data.user.profile.age); // 30
```
:::

## Summary

- Objects store key-value pairs
- Access properties with dot notation or brackets
- Destructuring extracts properties concisely
- Spread operator copies and merges objects
- `Object.keys()`, `values()`, `entries()` enable iteration
- Getters and setters provide computed properties
- `Object.freeze()` prevents modifications
- Optional chaining (`?.`) safely accesses nested properties

## Next Steps

Continue to [DOM Manipulation](/guide/javascript/06-dom) to learn how to interact with web pages.
