# Generics

Learn how to write reusable, type-safe code with generics.

## Introduction to Generics

Generics allow you to write flexible, reusable code that works with multiple types.

```typescript
// Without generics - loses type information
function identity(value: any): any {
    return value;
}

// With generics - preserves type information
function identityGeneric<T>(value: T): T {
    return value;
}

const str = identityGeneric<string>("hello"); // type: string
const num = identityGeneric(42);              // type: number (inferred)
```

## Generic Functions

```typescript
// Single type parameter
function first<T>(arr: T[]): T | undefined {
    return arr[0];
}

first([1, 2, 3]);        // number | undefined
first(["a", "b", "c"]);  // string | undefined

// Multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

const result = pair("hello", 42); // [string, number]

// With arrow functions
const last = <T>(arr: T[]): T | undefined => {
    return arr[arr.length - 1];
};
```

## Generic Constraints

Restrict type parameters to specific shapes:

```typescript
// Constrain to types with length
interface HasLength {
    length: number;
}

function logLength<T extends HasLength>(value: T): void {
    console.log(value.length);
}

logLength("hello");     // OK - string has length
logLength([1, 2, 3]);   // OK - array has length
// logLength(42);       // Error - number has no length

// Constrain to object with specific property
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person = { name: "John", age: 30 };
const name = getProperty(person, "name"); // string
const age = getProperty(person, "age");   // number
// getProperty(person, "email");          // Error
```

## Generic Interfaces

```typescript
interface Container<T> {
    value: T;
    getValue(): T;
}

const stringContainer: Container<string> = {
    value: "hello",
    getValue() {
        return this.value;
    }
};

// Generic interface with multiple types
interface KeyValuePair<K, V> {
    key: K;
    value: V;
}

const pair: KeyValuePair<string, number> = {
    key: "age",
    value: 30
};

// Generic interface for functions
interface Transformer<T, U> {
    (input: T): U;
}

const stringify: Transformer<number, string> = (num) => num.toString();
```

## Generic Classes

```typescript
class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

const numberQueue = new Queue<number>();
numberQueue.enqueue(1);
numberQueue.enqueue(2);
console.log(numberQueue.dequeue()); // 1

// Generic class with constraints
class DataStore<T extends { id: number }> {
    private items: Map<number, T> = new Map();

    add(item: T): void {
        this.items.set(item.id, item);
    }

    get(id: number): T | undefined {
        return this.items.get(id);
    }

    remove(id: number): boolean {
        return this.items.delete(id);
    }

    getAll(): T[] {
        return Array.from(this.items.values());
    }
}
```

## Generic Type Aliases

```typescript
// Generic type alias
type Result<T> = {
    success: boolean;
    data?: T;
    error?: string;
};

type UserResult = Result<{ id: number; name: string }>;

// Generic union type
type Maybe<T> = T | null | undefined;

let value: Maybe<string> = "hello";
value = null;
value = undefined;

// Generic function type
type AsyncFn<T> = () => Promise<T>;

const fetchUser: AsyncFn<User> = async () => {
    return { id: 1, name: "John" };
};
```

## Default Type Parameters

```typescript
interface ApiResponse<T = any> {
    data: T;
    status: number;
}

// Uses default type 'any'
const response1: ApiResponse = { data: "anything", status: 200 };

// Specifies type
const response2: ApiResponse<string[]> = {
    data: ["a", "b"],
    status: 200
};

// Default with constraints
type Container<T extends object = object> = {
    value: T;
};
```

## Conditional Types with Generics

```typescript
// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Extract array element type
type ElementType<T> = T extends (infer E)[] ? E : never;

type NumElement = ElementType<number[]>;  // number
type StrElement = ElementType<string[]>;  // string

// Unwrap Promise type
type Awaited<T> = T extends Promise<infer U> ? U : T;

type Result = Awaited<Promise<string>>;  // string
```

## Mapped Types with Generics

```typescript
// Make all properties optional
type Partial<T> = {
    [K in keyof T]?: T[K];
};

// Make all properties required
type Required<T> = {
    [K in keyof T]-?: T[K];
};

// Make all properties readonly
type Readonly<T> = {
    readonly [K in keyof T]: T[K];
};

// Pick specific properties
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// Create type from keys
type Record<K extends keyof any, V> = {
    [P in K]: V;
};

// Usage
interface User {
    id: number;
    name: string;
    email: string;
}

type PartialUser = Partial<User>;
type UserWithoutEmail = Omit<User, "email">;
type UserIdName = Pick<User, "id" | "name">;
```

## Generic Utility Functions

```typescript
// Type-safe Object.keys
function keys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
}

// Type-safe Object.entries
function entries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
    return Object.entries(obj) as [keyof T, T[keyof T]][];
}

// Merge objects with type safety
function merge<T extends object, U extends object>(
    target: T,
    source: U
): T & U {
    return { ...target, ...source };
}

// Group array by key
function groupBy<T, K extends keyof T>(
    items: T[],
    key: K
): Map<T[K], T[]> {
    const map = new Map<T[K], T[]>();

    for (const item of items) {
        const groupKey = item[key];
        const group = map.get(groupKey) || [];
        group.push(item);
        map.set(groupKey, group);
    }

    return map;
}
```

## Variance

Understanding how generic types relate:

```typescript
// Covariance - subtype relationship preserved
interface Producer<out T> {
    produce(): T;
}

// Contravariance - subtype relationship reversed
interface Consumer<in T> {
    consume(value: T): void;
}

// Invariance - no subtype relationship
interface Processor<T> {
    process(value: T): T;
}
```

## Practice Exercise

Build a type-safe event system:

```typescript
// Event map type
interface EventMap {
    click: { x: number; y: number };
    keypress: { key: string; code: number };
    submit: { data: Record<string, unknown> };
    error: { message: string; code: number };
}

// Type-safe event listener
type EventListener<T> = (event: T) => void;

class TypedEventEmitter<Events extends Record<string, unknown>> {
    private listeners = new Map<
        keyof Events,
        Set<EventListener<Events[keyof Events]>>
    >();

    on<K extends keyof Events>(
        event: K,
        listener: EventListener<Events[K]>
    ): () => void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }

        const listeners = this.listeners.get(event)!;
        listeners.add(listener as EventListener<Events[keyof Events]>);

        // Return unsubscribe function
        return () => {
            listeners.delete(listener as EventListener<Events[keyof Events]>);
        };
    }

    emit<K extends keyof Events>(event: K, data: Events[K]): void {
        const listeners = this.listeners.get(event);
        if (listeners) {
            listeners.forEach(listener => listener(data));
        }
    }

    once<K extends keyof Events>(
        event: K,
        listener: EventListener<Events[K]>
    ): void {
        const unsubscribe = this.on(event, (data) => {
            unsubscribe();
            listener(data);
        });
    }

    removeAllListeners<K extends keyof Events>(event?: K): void {
        if (event) {
            this.listeners.delete(event);
        } else {
            this.listeners.clear();
        }
    }
}

// Usage
const emitter = new TypedEventEmitter<EventMap>();

// Type-safe event handling
emitter.on("click", (event) => {
    console.log(`Clicked at ${event.x}, ${event.y}`);
});

emitter.on("keypress", (event) => {
    console.log(`Key: ${event.key}, Code: ${event.code}`);
});

// Type checking works!
emitter.emit("click", { x: 100, y: 200 });
// emitter.emit("click", { key: "a" }); // Error!

// One-time listener
emitter.once("submit", (event) => {
    console.log("Form submitted:", event.data);
});
```
