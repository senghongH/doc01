# Objects & Interfaces

Learn how to define and use interfaces in TypeScript.

## Basic Interface

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

const user: User = {
    id: 1,
    name: "John",
    email: "john@example.com"
};
```

## Optional Properties

```typescript
interface Config {
    host: string;
    port: number;
    debug?: boolean;    // Optional
    timeout?: number;   // Optional
}

const config: Config = {
    host: "localhost",
    port: 3000
    // debug and timeout are optional
};
```

## Readonly Properties

```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = { x: 10, y: 20 };
// point.x = 5; // Error: Cannot assign to 'x'

// Readonly array
interface Data {
    readonly items: readonly string[];
}
```

## Index Signatures

For objects with dynamic keys:

```typescript
// String index signature
interface StringMap {
    [key: string]: string;
}

const colors: StringMap = {
    red: "#ff0000",
    green: "#00ff00",
    blue: "#0000ff"
};

// Number index signature
interface NumberArray {
    [index: number]: string;
}

const arr: NumberArray = ["a", "b", "c"];

// Mixed with regular properties
interface Dictionary {
    length: number;
    [key: string]: number | string;
}
```

## Extending Interfaces

```typescript
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
    bark(): void;
}

const dog: Dog = {
    name: "Buddy",
    breed: "Golden Retriever",
    bark() {
        console.log("Woof!");
    }
};

// Extending multiple interfaces
interface Swimmer {
    swim(): void;
}

interface Duck extends Animal, Swimmer {
    quack(): void;
}
```

## Interface vs Type Alias

Both can define object shapes, but have differences:

```typescript
// Interface - can be extended and merged
interface User {
    name: string;
}

interface User {
    age: number;
}
// Merged: User has both name and age

// Type alias - cannot be merged
type Person = {
    name: string;
};

// type Person = { age: number }; // Error: Duplicate identifier

// Type can use unions
type ID = string | number;

// Type can use mapped types
type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};
```

::: tip
Use `interface` for object shapes that might be extended. Use `type` for unions, intersections, and complex type manipulations.
:::

## Function Interfaces

```typescript
// Function type interface
interface MathFunc {
    (a: number, b: number): number;
}

const add: MathFunc = (a, b) => a + b;
const multiply: MathFunc = (a, b) => a * b;

// Callable interface with properties
interface Counter {
    (): number;
    count: number;
    reset(): void;
}

function createCounter(): Counter {
    const fn = function() {
        return ++fn.count;
    } as Counter;
    fn.count = 0;
    fn.reset = function() {
        fn.count = 0;
    };
    return fn;
}
```

## Class Interfaces

```typescript
interface Printable {
    print(): void;
}

interface Loggable {
    log(message: string): void;
}

class Document implements Printable, Loggable {
    constructor(public content: string) {}

    print(): void {
        console.log(this.content);
    }

    log(message: string): void {
        console.log(`[LOG] ${message}`);
    }
}
```

## Generic Interfaces

```typescript
interface Container<T> {
    value: T;
    getValue(): T;
    setValue(value: T): void;
}

class Box<T> implements Container<T> {
    constructor(public value: T) {}

    getValue(): T {
        return this.value;
    }

    setValue(value: T): void {
        this.value = value;
    }
}

const stringBox = new Box<string>("hello");
const numberBox = new Box<number>(42);

// Generic interface with constraints
interface Repository<T extends { id: number }> {
    findById(id: number): T | undefined;
    save(item: T): void;
    delete(id: number): boolean;
}
```

## Intersection Types

Combine multiple types:

```typescript
interface HasName {
    name: string;
}

interface HasAge {
    age: number;
}

type Person = HasName & HasAge;

const person: Person = {
    name: "John",
    age: 30
};

// Intersection with type alias
type Employee = Person & {
    employeeId: string;
    department: string;
};
```

## Nested Interfaces

```typescript
interface Address {
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

interface Company {
    name: string;
    address: Address;
    employees: Employee[];
}

interface Employee {
    id: number;
    name: string;
    position: string;
    address?: Address;
}

const company: Company = {
    name: "Tech Corp",
    address: {
        street: "123 Main St",
        city: "San Francisco",
        country: "USA",
        postalCode: "94102"
    },
    employees: [
        { id: 1, name: "John", position: "Developer" },
        { id: 2, name: "Jane", position: "Designer" }
    ]
};
```

## Utility Types for Interfaces

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Partial - all properties optional
type PartialUser = Partial<User>;

// Required - all properties required
type RequiredUser = Required<PartialUser>;

// Pick - select specific properties
type UserCredentials = Pick<User, "email" | "password">;

// Omit - exclude properties
type PublicUser = Omit<User, "password">;

// Readonly - all properties readonly
type ReadonlyUser = Readonly<User>;

// Record - create object type from keys and values
type UserRoles = Record<string, "admin" | "user" | "guest">;
```

## Discriminated Unions

Use common property to distinguish types:

```typescript
interface Circle {
    kind: "circle";
    radius: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Triangle {
    kind: "triangle";
    base: number;
    height: number;
}

type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        case "triangle":
            return (shape.base * shape.height) / 2;
    }
}

const circle: Shape = { kind: "circle", radius: 5 };
console.log(getArea(circle)); // 78.54...
```

## Type Guards with Interfaces

```typescript
interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}

// Type guard function
function isFish(pet: Bird | Fish): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

function move(pet: Bird | Fish): void {
    if (isFish(pet)) {
        pet.swim();
    } else {
        pet.fly();
    }
}

// Using 'in' operator
function move2(pet: Bird | Fish): void {
    if ("swim" in pet) {
        pet.swim();
    } else {
        pet.fly();
    }
}
```

## Practice Exercise

Create a typed API response system:

```typescript
// Base response interface
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
    timestamp: Date;
}

// Specific data types
interface User {
    id: number;
    name: string;
    email: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
}

// Paginated response
interface PaginatedResponse<T> extends ApiResponse<T[]> {
    pagination: {
        page: number;
        perPage: number;
        total: number;
        totalPages: number;
    };
}

// API client interface
interface ApiClient {
    get<T>(url: string): Promise<ApiResponse<T>>;
    post<T, U>(url: string, data: U): Promise<ApiResponse<T>>;
    put<T, U>(url: string, data: U): Promise<ApiResponse<T>>;
    delete(url: string): Promise<ApiResponse<void>>;
}

// Implementation
class HttpClient implements ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get<T>(url: string): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}${url}`);
        const data = await response.json();
        return {
            success: response.ok,
            data: response.ok ? data : undefined,
            error: response.ok ? undefined : data,
            timestamp: new Date()
        };
    }

    async post<T, U>(url: string, body: U): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return {
            success: response.ok,
            data: response.ok ? data : undefined,
            error: response.ok ? undefined : data,
            timestamp: new Date()
        };
    }

    async put<T, U>(url: string, body: U): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return {
            success: response.ok,
            data: response.ok ? data : undefined,
            error: response.ok ? undefined : data,
            timestamp: new Date()
        };
    }

    async delete(url: string): Promise<ApiResponse<void>> {
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: "DELETE"
        });
        return {
            success: response.ok,
            timestamp: new Date()
        };
    }
}

// Usage
const api = new HttpClient("https://api.example.com");

async function getUser(id: number): Promise<User | null> {
    const response = await api.get<User>(`/users/${id}`);
    return response.success ? response.data! : null;
}
```
