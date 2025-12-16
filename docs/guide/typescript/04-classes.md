# Classes

Learn Object-Oriented Programming with TypeScript classes.

## Basic Class

```typescript
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): string {
        return `Hello, I'm ${this.name}`;
    }
}

const person = new Person("John", 30);
console.log(person.greet()); // "Hello, I'm John"
```

## Parameter Properties

Shorthand for declaring and initializing properties:

```typescript
class Person {
    // Automatically creates and assigns properties
    constructor(
        public name: string,
        public age: number,
        private ssn: string
    ) {}
}

const person = new Person("John", 30, "123-45-6789");
console.log(person.name); // "John"
// console.log(person.ssn); // Error: private
```

## Access Modifiers

### Public (default)

```typescript
class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public speak(): void {
        console.log(`${this.name} makes a sound`);
    }
}
```

### Private

```typescript
class BankAccount {
    private balance: number = 0;

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    withdraw(amount: number): boolean {
        if (amount <= this.balance) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount();
account.deposit(100);
// account.balance; // Error: private
console.log(account.getBalance()); // 100
```

### Protected

```typescript
class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    bark(): void {
        // Can access protected member
        console.log(`${this.name} barks!`);
    }
}

const dog = new Dog("Buddy");
dog.bark(); // "Buddy barks!"
// dog.name; // Error: protected
```

## Readonly Properties

```typescript
class Config {
    readonly apiUrl: string;
    readonly timeout: number;

    constructor(apiUrl: string, timeout: number = 5000) {
        this.apiUrl = apiUrl;
        this.timeout = timeout;
    }
}

const config = new Config("https://api.example.com");
// config.apiUrl = "other"; // Error: readonly
```

## Getters and Setters

```typescript
class Circle {
    private _radius: number = 0;

    get radius(): number {
        return this._radius;
    }

    set radius(value: number) {
        if (value < 0) {
            throw new Error("Radius cannot be negative");
        }
        this._radius = value;
    }

    get area(): number {
        return Math.PI * this._radius ** 2;
    }

    get circumference(): number {
        return 2 * Math.PI * this._radius;
    }
}

const circle = new Circle();
circle.radius = 5;
console.log(circle.area); // 78.54...
// circle.area = 100; // Error: no setter
```

## Static Members

```typescript
class MathUtils {
    static readonly PI = 3.14159;

    static add(a: number, b: number): number {
        return a + b;
    }

    static multiply(a: number, b: number): number {
        return a * b;
    }
}

console.log(MathUtils.PI);           // 3.14159
console.log(MathUtils.add(2, 3));    // 5

// Static blocks (ES2022)
class Database {
    static connection: string;

    static {
        // Initialization logic
        Database.connection = "initialized";
    }
}
```

## Inheritance

```typescript
class Animal {
    constructor(public name: string) {}

    move(distance: number): void {
        console.log(`${this.name} moved ${distance} meters`);
    }
}

class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name); // Call parent constructor
    }

    bark(): void {
        console.log("Woof!");
    }

    // Override parent method
    move(distance: number): void {
        console.log("Running...");
        super.move(distance); // Call parent method
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.bark();     // "Woof!"
dog.move(10);   // "Running..." then "Buddy moved 10 meters"
```

## Abstract Classes

Cannot be instantiated, only extended:

```typescript
abstract class Shape {
    abstract getArea(): number;
    abstract getPerimeter(): number;

    // Concrete method
    describe(): string {
        return `Area: ${this.getArea()}, Perimeter: ${this.getPerimeter()}`;
    }
}

class Rectangle extends Shape {
    constructor(
        private width: number,
        private height: number
    ) {
        super();
    }

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }

    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

// const shape = new Shape(); // Error: cannot instantiate abstract
const rect = new Rectangle(10, 5);
console.log(rect.describe()); // "Area: 50, Perimeter: 30"
```

## Implementing Interfaces

```typescript
interface Printable {
    print(): void;
}

interface Serializable {
    serialize(): string;
    deserialize(data: string): void;
}

class Document implements Printable, Serializable {
    constructor(public content: string) {}

    print(): void {
        console.log(this.content);
    }

    serialize(): string {
        return JSON.stringify({ content: this.content });
    }

    deserialize(data: string): void {
        const parsed = JSON.parse(data);
        this.content = parsed.content;
    }
}
```

## Generic Classes

```typescript
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
```

## This Type

```typescript
class Builder {
    private value: string = "";

    add(text: string): this {
        this.value += text;
        return this;
    }

    addLine(text: string): this {
        this.value += text + "\n";
        return this;
    }

    build(): string {
        return this.value;
    }
}

// Method chaining
const result = new Builder()
    .add("Hello")
    .add(" ")
    .addLine("World")
    .add("!")
    .build();
```

## Class Expressions

```typescript
// Anonymous class
const MyClass = class {
    constructor(public value: string) {}
};

// Named class expression
const AnotherClass = class NamedClass {
    static description = "A named class";
};

const instance = new MyClass("hello");
```

## Mixins

Compose classes from multiple sources:

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

// Mixin functions
function Timestamped<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        timestamp = new Date();
    };
}

function Tagged<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        tag: string = "";

        setTag(tag: string) {
            this.tag = tag;
        }
    };
}

// Base class
class User {
    constructor(public name: string) {}
}

// Apply mixins
const TimestampedUser = Timestamped(User);
const TaggedTimestampedUser = Tagged(Timestamped(User));

const user = new TaggedTimestampedUser("John");
user.setTag("admin");
console.log(user.name);      // "John"
console.log(user.timestamp); // Date
console.log(user.tag);       // "admin"
```

## Practice Exercise

Create a task management system:

```typescript
enum TaskStatus {
    Todo = "TODO",
    InProgress = "IN_PROGRESS",
    Done = "DONE"
}

enum Priority {
    Low = 1,
    Medium = 2,
    High = 3
}

interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: Priority;
    createdAt: Date;
    completedAt?: Date;
}

abstract class TaskManager {
    protected tasks: Map<string, Task> = new Map();

    abstract generateId(): string;

    addTask(title: string, priority: Priority = Priority.Medium): Task {
        const task: Task = {
            id: this.generateId(),
            title,
            status: TaskStatus.Todo,
            priority,
            createdAt: new Date()
        };
        this.tasks.set(task.id, task);
        return task;
    }

    getTask(id: string): Task | undefined {
        return this.tasks.get(id);
    }

    updateStatus(id: string, status: TaskStatus): boolean {
        const task = this.tasks.get(id);
        if (!task) return false;

        task.status = status;
        if (status === TaskStatus.Done) {
            task.completedAt = new Date();
        }
        return true;
    }

    deleteTask(id: string): boolean {
        return this.tasks.delete(id);
    }

    getAllTasks(): Task[] {
        return Array.from(this.tasks.values());
    }

    getTasksByStatus(status: TaskStatus): Task[] {
        return this.getAllTasks().filter(t => t.status === status);
    }

    getTasksByPriority(priority: Priority): Task[] {
        return this.getAllTasks().filter(t => t.priority === priority);
    }
}

class SimpleTaskManager extends TaskManager {
    private counter = 0;

    generateId(): string {
        return `task-${++this.counter}`;
    }
}

class UUIDTaskManager extends TaskManager {
    generateId(): string {
        return crypto.randomUUID();
    }
}

// Usage
const manager = new SimpleTaskManager();

const task1 = manager.addTask("Learn TypeScript", Priority.High);
const task2 = manager.addTask("Build a project", Priority.Medium);

manager.updateStatus(task1.id, TaskStatus.InProgress);
console.log(manager.getTasksByStatus(TaskStatus.InProgress));
```
