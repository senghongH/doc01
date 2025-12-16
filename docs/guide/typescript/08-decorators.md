# Decorators

Learn metaprogramming with TypeScript decorators.

## Introduction

Decorators are special declarations that can modify classes, methods, properties, and parameters.

::: tip
Enable decorators in tsconfig.json:
```json
{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```
:::

## Class Decorators

Modify or replace class constructors:

```typescript
// Simple class decorator
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        return `Hello, ${this.greeting}`;
    }
}

// Decorator factory (returns decorator)
function logger(prefix: string) {
    return function <T extends { new (...args: any[]): {} }>(
        constructor: T
    ) {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                console.log(`${prefix}: Instance created`);
            }
        };
    };
}

@logger("MyClass")
class MyClass {
    constructor(public name: string) {}
}

const instance = new MyClass("Test");
// Output: "MyClass: Instance created"
```

### Replacing Constructor

```typescript
function withTimestamp<T extends { new (...args: any[]): {} }>(
    constructor: T
) {
    return class extends constructor {
        createdAt = new Date();
    };
}

@withTimestamp
class Document {
    constructor(public title: string) {}
}

const doc = new Document("My Doc") as Document & { createdAt: Date };
console.log(doc.createdAt); // Current date
```

## Method Decorators

Modify method behavior:

```typescript
function log(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Calling ${propertyKey} with:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Result:`, result);
        return result;
    };

    return descriptor;
}

class Calculator {
    @log
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(2, 3);
// Output:
// Calling add with: [2, 3]
// Result: 5
```

### Decorator Factory for Methods

```typescript
function debounce(ms: number) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        let timeout: NodeJS.Timeout;
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                originalMethod.apply(this, args);
            }, ms);
        };

        return descriptor;
    };
}

class SearchInput {
    @debounce(300)
    search(query: string) {
        console.log("Searching for:", query);
    }
}
```

### Measure Execution Time

```typescript
function measure(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        const start = performance.now();
        const result = await originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`${propertyKey} took ${end - start}ms`);
        return result;
    };

    return descriptor;
}

class DataService {
    @measure
    async fetchData() {
        await new Promise(resolve => setTimeout(resolve, 100));
        return { data: "test" };
    }
}
```

## Property Decorators

Modify property behavior:

```typescript
function required(target: any, propertyKey: string) {
    let value: any;

    const getter = function () {
        return value;
    };

    const setter = function (newVal: any) {
        if (newVal === undefined || newVal === null || newVal === "") {
            throw new Error(`${propertyKey} is required`);
        }
        value = newVal;
    };

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}

class User {
    @required
    name!: string;

    @required
    email!: string;
}

const user = new User();
// user.name = ""; // Error: name is required
user.name = "John"; // OK
```

### Observable Property

```typescript
function observable(target: any, propertyKey: string) {
    const privateKey = `_${propertyKey}`;
    const callbacksKey = `_${propertyKey}Callbacks`;

    Object.defineProperty(target, propertyKey, {
        get() {
            return this[privateKey];
        },
        set(value) {
            const oldValue = this[privateKey];
            this[privateKey] = value;

            if (this[callbacksKey]) {
                this[callbacksKey].forEach((cb: Function) =>
                    cb(value, oldValue)
                );
            }
        }
    });

    target[`on${propertyKey.charAt(0).toUpperCase() + propertyKey.slice(1)}Change`] =
        function (callback: Function) {
            if (!this[callbacksKey]) {
                this[callbacksKey] = [];
            }
            this[callbacksKey].push(callback);
        };
}

class Store {
    @observable
    count = 0;
}

const store = new Store() as Store & {
    onCountChange: (cb: (n: number, o: number) => void) => void;
};

store.onCountChange((newVal, oldVal) => {
    console.log(`Count changed from ${oldVal} to ${newVal}`);
});

store.count = 5; // "Count changed from 0 to 5"
```

## Parameter Decorators

Mark parameters for special handling:

```typescript
const requiredParams: Map<string, number[]> = new Map();

function required(
    target: any,
    propertyKey: string,
    parameterIndex: number
) {
    const params = requiredParams.get(propertyKey) || [];
    params.push(parameterIndex);
    requiredParams.set(propertyKey, params);
}

function validate(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const params = requiredParams.get(propertyKey) || [];

        for (const index of params) {
            if (args[index] === undefined || args[index] === null) {
                throw new Error(
                    `Parameter at index ${index} is required for ${propertyKey}`
                );
            }
        }

        return originalMethod.apply(this, args);
    };

    return descriptor;
}

class UserService {
    @validate
    createUser(
        @required name: string,
        @required email: string,
        age?: number
    ) {
        return { name, email, age };
    }
}

const service = new UserService();
// service.createUser(null, "test@test.com"); // Error
service.createUser("John", "john@test.com"); // OK
```

## Accessor Decorators

Modify getters and setters:

```typescript
function configurable(value: boolean) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        descriptor.configurable = value;
    };
}

class Point {
    private _x: number = 0;
    private _y: number = 0;

    @configurable(false)
    get x() {
        return this._x;
    }

    @configurable(false)
    get y() {
        return this._y;
    }
}
```

## Decorator Composition

Multiple decorators are applied bottom-up:

```typescript
function first() {
    console.log("first(): factory evaluated");
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        console.log("first(): called");
    };
}

function second() {
    console.log("second(): factory evaluated");
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        console.log("second(): called");
    };
}

class ExampleClass {
    @first()
    @second()
    method() {}
}

// Output:
// first(): factory evaluated
// second(): factory evaluated
// second(): called
// first(): called
```

## Metadata Reflection

Use reflect-metadata for runtime type information:

```typescript
import "reflect-metadata";

function Type(type: any) {
    return Reflect.metadata("design:type", type);
}

function getType(target: any, propertyKey: string) {
    return Reflect.getMetadata("design:type", target, propertyKey);
}

class User {
    @Type(String)
    name!: string;

    @Type(Number)
    age!: number;
}

const nameType = getType(User.prototype, "name"); // String
const ageType = getType(User.prototype, "age");   // Number
```

## Practice Exercise

Create a validation decorator system:

```typescript
import "reflect-metadata";

// Validation decorators
const validatorsKey = Symbol("validators");

interface Validator {
    validate(value: any): boolean;
    message: string;
}

function addValidator(target: any, propertyKey: string, validator: Validator) {
    const validators: Map<string, Validator[]> =
        Reflect.getMetadata(validatorsKey, target) || new Map();

    const propertyValidators = validators.get(propertyKey) || [];
    propertyValidators.push(validator);
    validators.set(propertyKey, propertyValidators);

    Reflect.defineMetadata(validatorsKey, validators, target);
}

// Decorator factories
function MinLength(min: number, message?: string) {
    return function (target: any, propertyKey: string) {
        addValidator(target, propertyKey, {
            validate: (value) => typeof value === "string" && value.length >= min,
            message: message || `${propertyKey} must be at least ${min} characters`
        });
    };
}

function MaxLength(max: number, message?: string) {
    return function (target: any, propertyKey: string) {
        addValidator(target, propertyKey, {
            validate: (value) => typeof value === "string" && value.length <= max,
            message: message || `${propertyKey} must be at most ${max} characters`
        });
    };
}

function Email(message?: string) {
    return function (target: any, propertyKey: string) {
        addValidator(target, propertyKey, {
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            message: message || `${propertyKey} must be a valid email`
        });
    };
}

function Min(min: number, message?: string) {
    return function (target: any, propertyKey: string) {
        addValidator(target, propertyKey, {
            validate: (value) => typeof value === "number" && value >= min,
            message: message || `${propertyKey} must be at least ${min}`
        });
    };
}

function Max(max: number, message?: string) {
    return function (target: any, propertyKey: string) {
        addValidator(target, propertyKey, {
            validate: (value) => typeof value === "number" && value <= max,
            message: message || `${propertyKey} must be at most ${max}`
        });
    };
}

// Validate function
function validate<T extends object>(obj: T): { valid: boolean; errors: string[] } {
    const validators: Map<string, Validator[]> =
        Reflect.getMetadata(validatorsKey, obj) || new Map();

    const errors: string[] = [];

    for (const [propertyKey, propertyValidators] of validators) {
        const value = (obj as any)[propertyKey];

        for (const validator of propertyValidators) {
            if (!validator.validate(value)) {
                errors.push(validator.message);
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

// Usage
class CreateUserDto {
    @MinLength(2)
    @MaxLength(50)
    name!: string;

    @Email()
    email!: string;

    @Min(0)
    @Max(120)
    age!: number;
}

const dto = new CreateUserDto();
dto.name = "J";
dto.email = "invalid";
dto.age = 150;

const result = validate(dto);
console.log(result);
// {
//     valid: false,
//     errors: [
//         "name must be at least 2 characters",
//         "email must be a valid email",
//         "age must be at most 120"
//     ]
// }
```
