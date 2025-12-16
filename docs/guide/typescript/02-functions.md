# Functions

Learn how to type functions in TypeScript.

## Function Type Annotations

### Parameter and Return Types

```typescript
// Named function with types
function add(a: number, b: number): number {
    return a + b;
}

// Arrow function with types
const multiply = (a: number, b: number): number => {
    return a * b;
};

// Implicit return type (inferred)
const divide = (a: number, b: number) => a / b;
```

### Function Expression Types

```typescript
// Type annotation on variable
const greet: (name: string) => string = (name) => {
    return `Hello, ${name}!`;
};

// Using type alias
type MathOperation = (a: number, b: number) => number;

const subtract: MathOperation = (a, b) => a - b;
```

## Optional Parameters

```typescript
function greet(name: string, greeting?: string): string {
    return greeting ? `${greeting}, ${name}!` : `Hello, ${name}!`;
}

greet("John");           // "Hello, John!"
greet("John", "Hi");     // "Hi, John!"

// Optional must come after required
function example(required: string, optional?: number): void {
    // ...
}
```

## Default Parameters

```typescript
function greet(name: string, greeting: string = "Hello"): string {
    return `${greeting}, ${name}!`;
}

greet("John");           // "Hello, John!"
greet("John", "Hi");     // "Hi, John!"

// Default with type inference
function createUser(name: string, age: number = 18) {
    return { name, age };
}
```

## Rest Parameters

```typescript
function sum(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3);       // 6
sum(1, 2, 3, 4, 5); // 15

// Rest with other parameters
function logMessages(prefix: string, ...messages: string[]): void {
    messages.forEach(msg => console.log(`${prefix}: ${msg}`));
}
```

## Function Overloads

Define multiple function signatures:

```typescript
// Overload signatures
function format(value: string): string;
function format(value: number): string;
function format(value: Date): string;

// Implementation signature
function format(value: string | number | Date): string {
    if (typeof value === "string") {
        return value.trim();
    } else if (typeof value === "number") {
        return value.toFixed(2);
    } else {
        return value.toISOString();
    }
}

format("hello");     // OK
format(42);          // OK
format(new Date()); // OK
```

### Complex Overloads

```typescript
// Different return types based on input
function getValue(key: "name"): string;
function getValue(key: "age"): number;
function getValue(key: "active"): boolean;
function getValue(key: string): string | number | boolean {
    const data: Record<string, string | number | boolean> = {
        name: "John",
        age: 30,
        active: true
    };
    return data[key];
}

const name = getValue("name");     // type: string
const age = getValue("age");       // type: number
const active = getValue("active"); // type: boolean
```

## this Parameter

Explicitly type `this`:

```typescript
interface User {
    name: string;
    greet(this: User): void;
}

const user: User = {
    name: "John",
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
};

user.greet(); // OK

// const greet = user.greet;
// greet(); // Error: 'this' context is not of type 'User'
```

## Callback Functions

```typescript
// Callback type
function fetchData(callback: (data: string) => void): void {
    // Simulate async operation
    setTimeout(() => {
        callback("Data loaded");
    }, 1000);
}

fetchData((data) => {
    console.log(data);
});

// More complex callback
type Callback<T> = (error: Error | null, result?: T) => void;

function loadUser(id: number, callback: Callback<User>): void {
    // Implementation
}
```

## Void vs Undefined

```typescript
// void - function doesn't return
function log(message: string): void {
    console.log(message);
}

// Contextual typing allows returning undefined
const callback: () => void = () => {
    return undefined; // OK
};

// But not other values
const callback2: () => void = () => {
    // return "hello"; // Error
};
```

## Never Return Type

```typescript
// Throws an error
function fail(message: string): never {
    throw new Error(message);
}

// Infinite loop
function forever(): never {
    while (true) {}
}

// Type guard that narrows to never
function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}
```

## Function Type Expressions

```typescript
// Inline function type
let handler: (event: MouseEvent) => void;

// Function type alias
type ClickHandler = (event: MouseEvent) => void;

// Function type in interface
interface ButtonProps {
    onClick: (event: MouseEvent) => void;
    onHover?: (event: MouseEvent) => void;
}

// Call signatures in object types
type Logger = {
    (message: string): void;
    level: string;
};
```

## Construct Signatures

For constructor functions:

```typescript
// Construct signature
type Constructor = {
    new (name: string): User;
};

// Class as constructor
class User {
    constructor(public name: string) {}
}

function createInstance(ctor: Constructor, name: string): User {
    return new ctor(name);
}

const user = createInstance(User, "John");
```

## Generic Functions

Type parameters for reusable functions:

```typescript
// Basic generic function
function identity<T>(value: T): T {
    return value;
}

identity<string>("hello"); // Explicit type
identity(42);              // Type inferred as number

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const result = pair("hello", 42); // [string, number]
```

### Generic Constraints

```typescript
// Constrain to types with length property
function logLength<T extends { length: number }>(value: T): void {
    console.log(value.length);
}

logLength("hello");    // OK
logLength([1, 2, 3]);  // OK
// logLength(42);      // Error: number doesn't have length

// Constrain to specific interface
interface HasId {
    id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id);
}
```

## Async Functions

```typescript
// Async function returns Promise
async function fetchUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
}

// Arrow async function
const loadData = async (): Promise<string[]> => {
    const response = await fetch("/api/data");
    return response.json();
};

// Async with error handling
async function safeFetch<T>(url: string): Promise<T | null> {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}
```

## Practice Exercise

Create a typed event emitter:

```typescript
type EventCallback<T> = (data: T) => void;

type EventMap = {
    login: { userId: string; timestamp: Date };
    logout: { userId: string };
    message: { from: string; text: string };
};

class EventEmitter<T extends Record<string, unknown>> {
    private listeners: {
        [K in keyof T]?: EventCallback<T[K]>[];
    } = {};

    on<K extends keyof T>(event: K, callback: EventCallback<T[K]>): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(callback);
    }

    emit<K extends keyof T>(event: K, data: T[K]): void {
        const callbacks = this.listeners[event];
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }

    off<K extends keyof T>(event: K, callback: EventCallback<T[K]>): void {
        const callbacks = this.listeners[event];
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }
}

// Usage
const emitter = new EventEmitter<EventMap>();

emitter.on("login", (data) => {
    console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

emitter.emit("login", { userId: "123", timestamp: new Date() });
```
