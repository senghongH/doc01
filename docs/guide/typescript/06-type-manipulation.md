# Type Manipulation

Learn advanced type operations in TypeScript.

## Keyof Operator

Extract keys from a type:

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

type UserKeys = keyof User; // "id" | "name" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const user: User = { id: 1, name: "John", email: "john@example.com" };
const name = getProperty(user, "name"); // string
```

## Typeof Operator

Get type from a value:

```typescript
const config = {
    host: "localhost",
    port: 3000,
    secure: false
};

type Config = typeof config;
// { host: string; port: number; secure: boolean }

// With functions
function createUser(name: string, age: number) {
    return { name, age, createdAt: new Date() };
}

type CreateUserReturn = ReturnType<typeof createUser>;
// { name: string; age: number; createdAt: Date }

// With const assertion for literal types
const routes = {
    home: "/",
    about: "/about",
    contact: "/contact"
} as const;

type Routes = typeof routes;
// { readonly home: "/"; readonly about: "/about"; readonly contact: "/contact" }
```

## Indexed Access Types

Access property types:

```typescript
interface User {
    id: number;
    name: string;
    address: {
        street: string;
        city: string;
    };
    roles: string[];
}

type UserId = User["id"];           // number
type UserName = User["name"];       // string
type UserAddress = User["address"]; // { street: string; city: string }
type UserRoles = User["roles"];     // string[]
type RoleType = User["roles"][number]; // string

// Multiple keys
type IdOrName = User["id" | "name"]; // number | string

// With keyof
type UserPropertyTypes = User[keyof User];
// number | string | { street: string; city: string } | string[]
```

## Conditional Types

Types that depend on conditions:

```typescript
// Basic conditional
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<123>;     // false

// With never for filtering
type NonNullable<T> = T extends null | undefined ? never : T;

type C = NonNullable<string | null>; // string

// Inferring types
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = () => string;
type FnReturn = ReturnType<Fn>; // string

// Extracting array element type
type Flatten<T> = T extends (infer E)[] ? E : T;

type Num = Flatten<number[]>;  // number
type Str = Flatten<string>;    // string
```

## Mapped Types

Transform existing types:

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

// Remove readonly
type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};

// Transform property types
type Stringify<T> = {
    [K in keyof T]: string;
};

interface User {
    id: number;
    name: string;
}

type StringifiedUser = Stringify<User>;
// { id: string; name: string }
```

### Key Remapping

```typescript
// Prefix keys
type Prefixed<T, P extends string> = {
    [K in keyof T as `${P}${string & K}`]: T[K];
};

interface User {
    name: string;
    age: number;
}

type PrefixedUser = Prefixed<User, "user_">;
// { user_name: string; user_age: number }

// Filter keys
type OnlyStrings<T> = {
    [K in keyof T as T[K] extends string ? K : never]: T[K];
};

interface Mixed {
    name: string;
    age: number;
    email: string;
}

type StringProps = OnlyStrings<Mixed>;
// { name: string; email: string }
```

## Template Literal Types

String manipulation at type level:

```typescript
// Basic template literal
type Greeting = `Hello, ${string}!`;

const greet: Greeting = "Hello, World!"; // OK
// const bad: Greeting = "Hi there!";    // Error

// With union types
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";

type ColorSize = `${Color}-${Size}`;
// "red-small" | "red-medium" | "red-large" | "green-small" | ...

// String manipulation utilities
type Uppercase<S extends string> = intrinsic;
type Lowercase<S extends string> = intrinsic;
type Capitalize<S extends string> = intrinsic;
type Uncapitalize<S extends string> = intrinsic;

type Upper = Uppercase<"hello">; // "HELLO"
type Lower = Lowercase<"HELLO">; // "hello"
type Cap = Capitalize<"hello">;  // "Hello"

// Create getter types
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

interface User {
    name: string;
    age: number;
}

type UserGetters = Getters<User>;
// { getName: () => string; getAge: () => number }
```

## Utility Types

Built-in type utilities:

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Partial - all optional
type PartialUser = Partial<User>;

// Required - all required
type RequiredUser = Required<PartialUser>;

// Readonly - all readonly
type ReadonlyUser = Readonly<User>;

// Pick - select properties
type UserCredentials = Pick<User, "email" | "password">;

// Omit - exclude properties
type PublicUser = Omit<User, "password">;

// Record - create object type
type UserRoles = Record<string, "admin" | "user">;

// Exclude - remove from union
type NotString = Exclude<string | number | boolean, string>;
// number | boolean

// Extract - keep from union
type OnlyString = Extract<string | number | boolean, string>;
// string

// NonNullable - remove null/undefined
type Defined = NonNullable<string | null | undefined>;
// string

// Parameters - function parameter types
function createUser(name: string, age: number): User {
    return { id: 1, name, age, email: "", password: "" };
}
type CreateUserParams = Parameters<typeof createUser>;
// [string, number]

// ReturnType - function return type
type CreateUserReturn = ReturnType<typeof createUser>;
// User

// InstanceType - class instance type
class MyClass {
    constructor(public value: string) {}
}
type MyInstance = InstanceType<typeof MyClass>;
// MyClass
```

## Advanced Patterns

### Deep Partial

```typescript
type DeepPartial<T> = T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

interface Config {
    server: {
        host: string;
        port: number;
    };
    database: {
        url: string;
        name: string;
    };
}

type PartialConfig = DeepPartial<Config>;
// All nested properties are optional
```

### Deep Readonly

```typescript
type DeepReadonly<T> = T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

const config: DeepReadonly<Config> = {
    server: { host: "localhost", port: 3000 },
    database: { url: "mongodb://...", name: "mydb" }
};

// config.server.host = "other"; // Error: readonly
```

### Path Types

```typescript
type PathKeys<T, Prefix extends string = ""> = T extends object
    ? {
          [K in keyof T]: K extends string
              ? `${Prefix}${K}` | PathKeys<T[K], `${Prefix}${K}.`>
              : never;
      }[keyof T]
    : never;

interface Data {
    user: {
        name: string;
        address: {
            city: string;
        };
    };
}

type DataPaths = PathKeys<Data>;
// "user" | "user.name" | "user.address" | "user.address.city"
```

## Practice Exercise

Create a type-safe form builder:

```typescript
// Form field types
type FieldType = "text" | "number" | "email" | "password" | "select";

interface FieldConfig<T extends FieldType> {
    type: T;
    label: string;
    required?: boolean;
    defaultValue?: T extends "number" ? number : string;
    options?: T extends "select" ? string[] : never;
}

// Form schema type
type FormSchema = Record<string, FieldConfig<FieldType>>;

// Extract form values type from schema
type FormValues<T extends FormSchema> = {
    [K in keyof T]: T[K]["type"] extends "number" ? number : string;
};

// Form builder class
class FormBuilder<T extends FormSchema> {
    private schema: T;
    private values: Partial<FormValues<T>> = {};

    constructor(schema: T) {
        this.schema = schema;
        this.initDefaults();
    }

    private initDefaults(): void {
        for (const key in this.schema) {
            const field = this.schema[key];
            if (field.defaultValue !== undefined) {
                (this.values as any)[key] = field.defaultValue;
            }
        }
    }

    setValue<K extends keyof T>(
        field: K,
        value: FormValues<T>[K]
    ): this {
        this.values[field] = value;
        return this;
    }

    getValue<K extends keyof T>(field: K): FormValues<T>[K] | undefined {
        return this.values[field];
    }

    validate(): { valid: boolean; errors: Partial<Record<keyof T, string>> } {
        const errors: Partial<Record<keyof T, string>> = {};

        for (const key in this.schema) {
            const field = this.schema[key];
            const value = this.values[key];

            if (field.required && (value === undefined || value === "")) {
                errors[key] = `${field.label} is required`;
            }
        }

        return {
            valid: Object.keys(errors).length === 0,
            errors
        };
    }

    getValues(): FormValues<T> {
        return this.values as FormValues<T>;
    }
}

// Usage
const loginSchema = {
    email: {
        type: "email" as const,
        label: "Email",
        required: true
    },
    password: {
        type: "password" as const,
        label: "Password",
        required: true
    },
    rememberMe: {
        type: "text" as const,
        label: "Remember Me",
        defaultValue: "no"
    }
} satisfies FormSchema;

const form = new FormBuilder(loginSchema);

form.setValue("email", "user@example.com")
    .setValue("password", "secret123");

const { valid, errors } = form.validate();
console.log(valid, errors);

const values = form.getValues();
// Type: { email: string; password: string; rememberMe: string }
```
