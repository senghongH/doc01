# TypeScript Basics

Learn the fundamental types and type annotations in TypeScript.

## Type Annotations

TypeScript uses type annotations to explicitly specify types.

```typescript
// Variable type annotations
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;
```

## Primitive Types

### String

```typescript
let firstName: string = "John";
let lastName: string = 'Doe';
let greeting: string = `Hello, ${firstName}!`;
```

### Number

```typescript
let integer: number = 42;
let float: number = 3.14;
let hex: number = 0xff;
let binary: number = 0b1010;
let octal: number = 0o744;
```

### Boolean

```typescript
let isValid: boolean = true;
let hasPermission: boolean = false;
```

### Null and Undefined

```typescript
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// With strict null checks, these are distinct types
let maybeString: string | null = null;
let optionalNum: number | undefined = undefined;
```

## Type Inference

TypeScript can infer types automatically:

```typescript
// Type inferred as string
let message = "Hello, World!";

// Type inferred as number
let count = 42;

// Type inferred as boolean
let active = true;

// Type inferred as string[]
let names = ["Alice", "Bob", "Charlie"];
```

::: tip
Let TypeScript infer types when the type is obvious. Add explicit annotations when it improves clarity or when inference doesn't work as expected.
:::

## Arrays

```typescript
// Array of strings
let names: string[] = ["Alice", "Bob", "Charlie"];

// Array of numbers
let scores: number[] = [85, 92, 78, 95];

// Alternative syntax using generics
let items: Array<string> = ["apple", "banana", "cherry"];

// Mixed arrays with union types
let mixed: (string | number)[] = ["hello", 42, "world", 100];
```

### Array Methods with Types

```typescript
const numbers: number[] = [1, 2, 3, 4, 5];

// map returns number[]
const doubled = numbers.map(n => n * 2);

// filter returns number[]
const evens = numbers.filter(n => n % 2 === 0);

// find returns number | undefined
const found = numbers.find(n => n > 3);

// reduce with explicit type
const sum = numbers.reduce((acc, n) => acc + n, 0);
```

## Tuples

Fixed-length arrays with specific types at each position:

```typescript
// [string, number] tuple
let person: [string, number] = ["Alice", 30];

// Accessing tuple elements
let name = person[0];  // string
let age = person[1];   // number

// Tuple with optional element
let point: [number, number, number?] = [10, 20];

// Named tuple elements (TypeScript 4.0+)
type Coordinate = [x: number, y: number, z?: number];
let coord: Coordinate = [10, 20, 30];
```

### Tuple Destructuring

```typescript
const tuple: [string, number, boolean] = ["hello", 42, true];
const [str, num, bool] = tuple;

// Function returning tuple
function getNameAndAge(): [string, number] {
    return ["John", 30];
}

const [name, age] = getNameAndAge();
```

## Enums

Named constants:

```typescript
// Numeric enum
enum Direction {
    Up,     // 0
    Down,   // 1
    Left,   // 2
    Right   // 3
}

let dir: Direction = Direction.Up;

// Enum with explicit values
enum Status {
    Pending = 1,
    Active = 2,
    Inactive = 3
}

// String enum
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

let color: Color = Color.Red;
```

### Const Enums

More efficient, inlined at compile time:

```typescript
const enum HttpStatus {
    OK = 200,
    NotFound = 404,
    InternalError = 500
}

// Compiled to: let status = 200;
let status = HttpStatus.OK;
```

## Any Type

Opt out of type checking (use sparingly):

```typescript
let anything: any = "hello";
anything = 42;
anything = true;
anything = { name: "test" };

// No type checking on 'any'
anything.nonExistentMethod(); // No error at compile time
```

::: warning
Avoid using `any` as it defeats the purpose of TypeScript. Use `unknown` for truly unknown types.
:::

## Unknown Type

Type-safe alternative to `any`:

```typescript
let value: unknown = "hello";

// Must narrow type before using
if (typeof value === "string") {
    console.log(value.toUpperCase()); // OK
}

// Error: Object is of type 'unknown'
// value.toUpperCase();

// Type assertion
let str = value as string;
```

## Void Type

For functions that don't return a value:

```typescript
function logMessage(message: string): void {
    console.log(message);
}

// Arrow function with void
const greet = (name: string): void => {
    console.log(`Hello, ${name}!`);
};
```

## Never Type

For functions that never return:

```typescript
// Function that throws
function throwError(message: string): never {
    throw new Error(message);
}

// Infinite loop
function infiniteLoop(): never {
    while (true) {
        // ...
    }
}

// Exhaustive checking
type Shape = "circle" | "square";

function getArea(shape: Shape): number {
    switch (shape) {
        case "circle":
            return Math.PI * 10 * 10;
        case "square":
            return 10 * 10;
        default:
            // This ensures all cases are handled
            const exhaustiveCheck: never = shape;
            return exhaustiveCheck;
    }
}
```

## Object Type

```typescript
// Object type annotation
let person: object = { name: "John", age: 30 };

// More specific object type
let user: { name: string; age: number } = {
    name: "John",
    age: 30
};

// Optional properties
let config: { debug?: boolean; timeout: number } = {
    timeout: 5000
};

// Readonly properties
let point: { readonly x: number; readonly y: number } = {
    x: 10,
    y: 20
};
// point.x = 5; // Error: Cannot assign to 'x'
```

## Union Types

A value can be one of several types:

```typescript
let id: string | number;
id = "abc123";
id = 123;

// Union with null
let name: string | null = null;
name = "John";

// Function with union parameter
function printId(id: string | number): void {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(2));
    }
}
```

## Literal Types

Exact values as types:

```typescript
// String literal
let direction: "up" | "down" | "left" | "right";
direction = "up";    // OK
// direction = "diagonal"; // Error

// Numeric literal
let dice: 1 | 2 | 3 | 4 | 5 | 6;
dice = 3;  // OK
// dice = 7; // Error

// Boolean literal
let success: true = true;

// Combining with other types
type Result = "success" | "error" | null;
```

## Type Aliases

Create reusable type definitions:

```typescript
// Simple alias
type ID = string | number;

// Object type alias
type User = {
    id: ID;
    name: string;
    email: string;
};

// Function type alias
type Callback = (data: string) => void;

// Union type alias
type Status = "pending" | "active" | "inactive";

// Using aliases
let userId: ID = "abc123";
let user: User = { id: 1, name: "John", email: "john@example.com" };
```

## Type Assertions

Tell TypeScript you know more about the type:

```typescript
// Angle bracket syntax
let value: unknown = "hello";
let length1: number = (<string>value).length;

// As syntax (preferred, required in JSX)
let length2: number = (value as string).length;

// Asserting to more specific type
const canvas = document.getElementById("canvas") as HTMLCanvasElement;

// Non-null assertion (use carefully)
let element = document.querySelector(".btn")!;
```

## Practice Exercise

Create a typed shopping cart:

```typescript
type Product = {
    id: number;
    name: string;
    price: number;
    category: "electronics" | "clothing" | "food";
};

type CartItem = {
    product: Product;
    quantity: number;
};

type Cart = {
    items: CartItem[];
    total: number;
};

function addToCart(cart: Cart, product: Product, quantity: number): Cart {
    const existingItem = cart.items.find(
        item => item.product.id === product.id
    );

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ product, quantity });
    }

    cart.total = cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return cart;
}

// Usage
const laptop: Product = {
    id: 1,
    name: "Laptop",
    price: 999,
    category: "electronics"
};

let myCart: Cart = { items: [], total: 0 };
myCart = addToCart(myCart, laptop, 1);
```
