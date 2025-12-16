# TypeScript Tutorial

::: info Official Documentation
This tutorial is based on the official TypeScript documentation. For the most up-to-date information, visit: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
:::

Welcome to the comprehensive TypeScript tutorial! Learn how to write type-safe JavaScript at scale.

## What is TypeScript?

TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing and class-based object-oriented programming to the language.

```typescript
// TypeScript adds types to JavaScript
function greet(name: string): string {
    return `Hello, ${name}!`;
}

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

## Tutorial Structure

### Beginner Level
- [Basics](/guide/typescript/01-basics) - Types, Variables, and Type Annotations
- [Functions](/guide/typescript/02-functions) - Function Types and Parameters
- [Objects & Interfaces](/guide/typescript/03-interfaces) - Defining Object Shapes

### Intermediate Level
- [Classes](/guide/typescript/04-classes) - Object-Oriented Programming
- [Generics](/guide/typescript/05-generics) - Reusable Type-Safe Code
- [Type Manipulation](/guide/typescript/06-type-manipulation) - Advanced Type Operations

### Advanced Level
- [Modules](/guide/typescript/07-modules) - Code Organization and Imports
- [Decorators](/guide/typescript/08-decorators) - Metaprogramming Features
- [Declaration Files](/guide/typescript/09-declarations) - Type Definitions
- [Advanced Patterns](/guide/typescript/10-advanced) - Best Practices and Patterns

## Prerequisites

- Solid understanding of JavaScript
- Familiarity with ES6+ features
- Node.js installed on your machine
- A code editor (VS Code recommended for best TypeScript support)

## Getting Started

### Installing TypeScript

```bash
# Install globally
npm install -g typescript

# Or install locally in a project
npm install --save-dev typescript
```

### Your First TypeScript File

1. Create a file called `hello.ts`:

```typescript
function greet(name: string): string {
    return `Hello, ${name}!`;
}

console.log(greet("World"));
```

2. Compile it to JavaScript:

```bash
tsc hello.ts
```

3. Run the output:

```bash
node hello.js
```

### Setting Up a Project

```bash
# Initialize a new project
mkdir my-ts-project
cd my-ts-project
npm init -y

# Install TypeScript
npm install --save-dev typescript

# Create tsconfig.json
npx tsc --init
```

::: tip
VS Code provides excellent TypeScript support out of the box, including IntelliSense, error checking, and refactoring tools.
:::

## Why TypeScript?

| Benefit | Description |
|---------|-------------|
| Type Safety | Catch errors at compile time, not runtime |
| Better IDE Support | Autocomplete, refactoring, and navigation |
| Self-Documenting | Types serve as inline documentation |
| Maintainability | Easier to refactor and scale large codebases |
| Modern Features | Access to latest ECMAScript features |

## TypeScript vs JavaScript

```javascript
// JavaScript - No type checking
function add(a, b) {
    return a + b;
}

add("1", 2); // Returns "12" - string concatenation!
```

```typescript
// TypeScript - Type checking
function add(a: number, b: number): number {
    return a + b;
}

add("1", 2); // Error: Argument of type 'string' is not assignable
```

## Basic Configuration (tsconfig.json)

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true,
        "outDir": "./dist",
        "rootDir": "./src"
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
}
```

Let's begin your TypeScript journey!
