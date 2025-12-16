# Declaration Files

Learn how to create and use TypeScript declaration files.

## What Are Declaration Files?

Declaration files (`.d.ts`) describe the shape of JavaScript code for TypeScript.

```typescript
// math.d.ts
declare function add(a: number, b: number): number;
declare function subtract(a: number, b: number): number;

declare const PI: number;

declare class Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}
```

## Creating Declaration Files

### For a Module

```typescript
// mylib.d.ts
declare module "mylib" {
    export function doSomething(value: string): void;
    export const version: string;

    export interface Options {
        debug?: boolean;
        timeout?: number;
    }

    export class Client {
        constructor(options?: Options);
        connect(): Promise<void>;
        disconnect(): void;
    }

    export default Client;
}

// Usage
import Client, { doSomething, Options } from "mylib";
```

### For Global Variables

```typescript
// globals.d.ts
declare const API_URL: string;
declare const DEBUG: boolean;

declare function log(message: string): void;

// Extending Window
declare global {
    interface Window {
        myApp: {
            version: string;
            init(): void;
        };
    }
}

export {}; // Make this a module
```

### For Existing JavaScript

```typescript
// lodash.d.ts (simplified)
declare module "lodash" {
    export function chunk<T>(array: T[], size: number): T[][];
    export function compact<T>(array: T[]): T[];
    export function uniq<T>(array: T[]): T[];
    export function debounce<T extends (...args: any[]) => any>(
        func: T,
        wait?: number
    ): T;
}
```

## Declaration Merging

Combine multiple declarations:

```typescript
// Interface merging
interface User {
    name: string;
}

interface User {
    age: number;
}

// User now has both name and age
const user: User = { name: "John", age: 30 };

// Namespace merging
namespace Animals {
    export class Dog {}
}

namespace Animals {
    export class Cat {}
}

// Animals has both Dog and Cat
const dog = new Animals.Dog();
const cat = new Animals.Cat();

// Function + Namespace merging
function buildLabel(name: string): string {
    return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
    export let prefix = "Hello, ";
    export let suffix = "!";
}

console.log(buildLabel("World")); // "Hello, World!"
```

## Ambient Declarations

Describe external code:

```typescript
// Ambient variable
declare const jQuery: (selector: string) => any;

// Ambient function
declare function require(module: string): any;

// Ambient class
declare class Greeter {
    constructor(greeting: string);
    greet(): string;
}

// Ambient namespace
declare namespace Express {
    interface Request {
        body: any;
        params: Record<string, string>;
        query: Record<string, string>;
    }

    interface Response {
        send(body: any): Response;
        json(body: any): Response;
        status(code: number): Response;
    }
}
```

## Triple-Slash Directives

Reference other declaration files:

```typescript
/// <reference path="./globals.d.ts" />
/// <reference types="node" />
/// <reference lib="es2020" />

// Now you can use types from those files
```

## Module Augmentation

Extend existing modules:

```typescript
// Extend Express
import { Request, Response } from "express";

declare module "express" {
    interface Request {
        user?: {
            id: string;
            email: string;
            role: "admin" | "user";
        };
        startTime?: number;
    }
}

// Now TypeScript knows about request.user
app.use((req: Request, res: Response, next) => {
    req.user = { id: "123", email: "user@test.com", role: "user" };
    next();
});
```

### Extending Built-in Types

```typescript
// Extend Array prototype
declare global {
    interface Array<T> {
        first(): T | undefined;
        last(): T | undefined;
        isEmpty(): boolean;
    }
}

Array.prototype.first = function () {
    return this[0];
};

Array.prototype.last = function () {
    return this[this.length - 1];
};

Array.prototype.isEmpty = function () {
    return this.length === 0;
};

// Usage
const arr = [1, 2, 3];
console.log(arr.first()); // 1
console.log(arr.last());  // 3

export {};
```

## Publishing Type Declarations

### Including in Package

```json
// package.json
{
    "name": "my-library",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "files": ["dist"]
}
```

### tsconfig for Library

```json
{
    "compilerOptions": {
        "declaration": true,
        "declarationDir": "dist",
        "declarationMap": true,
        "emitDeclarationOnly": false,
        "outDir": "dist"
    },
    "include": ["src"]
}
```

## DefinitelyTyped

Community-maintained type definitions:

```bash
# Install types for a package
npm install --save-dev @types/lodash
npm install --save-dev @types/express
npm install --save-dev @types/node
```

### Creating @types Package

```typescript
// index.d.ts for @types/my-package
export interface Options {
    debug?: boolean;
}

export function init(options?: Options): void;
export function process(data: string): string;
export function cleanup(): void;

export as namespace MyPackage;
```

## Wildcard Module Declarations

Handle non-TypeScript imports:

```typescript
// images.d.ts
declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: string;
    export default value;
}

declare module "*.css" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.json" {
    const value: any;
    export default value;
}

// Usage
import logo from "./logo.png";
import styles from "./styles.css";
```

## Shorthand Ambient Modules

Quick type for any module:

```typescript
// All imports from "my-untyped-lib" will be 'any'
declare module "my-untyped-lib";

// Or with basic structure
declare module "my-other-lib" {
    export function doThing(): void;
    export default function(): string;
}
```

## Practice Exercise

Create declaration files for a JavaScript library:

```typescript
// api-client.d.ts

/**
 * Configuration options for the API client
 */
export interface ApiClientConfig {
    /** Base URL for API requests */
    baseUrl: string;
    /** Request timeout in milliseconds */
    timeout?: number;
    /** Default headers for all requests */
    headers?: Record<string, string>;
    /** Retry configuration */
    retry?: {
        /** Number of retry attempts */
        attempts: number;
        /** Delay between retries in ms */
        delay: number;
    };
}

/**
 * HTTP request options
 */
export interface RequestOptions {
    /** HTTP method */
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    /** Request headers */
    headers?: Record<string, string>;
    /** Request body */
    body?: unknown;
    /** Query parameters */
    params?: Record<string, string | number | boolean>;
    /** Abort signal for cancellation */
    signal?: AbortSignal;
}

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
    /** Response data */
    data: T;
    /** HTTP status code */
    status: number;
    /** Response headers */
    headers: Record<string, string>;
}

/**
 * API error
 */
export interface ApiError extends Error {
    /** Error code */
    code: string;
    /** HTTP status code */
    status?: number;
    /** Response data */
    response?: unknown;
}

/**
 * Request interceptor function
 */
export type RequestInterceptor = (
    config: RequestOptions
) => RequestOptions | Promise<RequestOptions>;

/**
 * Response interceptor function
 */
export type ResponseInterceptor<T = unknown> = (
    response: ApiResponse<T>
) => ApiResponse<T> | Promise<ApiResponse<T>>;

/**
 * Error interceptor function
 */
export type ErrorInterceptor = (
    error: ApiError
) => never | Promise<never> | ApiResponse<unknown>;

/**
 * API Client class for making HTTP requests
 */
export declare class ApiClient {
    /**
     * Creates a new API client instance
     * @param config - Client configuration
     */
    constructor(config: ApiClientConfig);

    /**
     * Make a GET request
     * @param path - Request path
     * @param options - Request options
     */
    get<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>>;

    /**
     * Make a POST request
     * @param path - Request path
     * @param body - Request body
     * @param options - Request options
     */
    post<T, U = unknown>(
        path: string,
        body?: U,
        options?: RequestOptions
    ): Promise<ApiResponse<T>>;

    /**
     * Make a PUT request
     * @param path - Request path
     * @param body - Request body
     * @param options - Request options
     */
    put<T, U = unknown>(
        path: string,
        body?: U,
        options?: RequestOptions
    ): Promise<ApiResponse<T>>;

    /**
     * Make a DELETE request
     * @param path - Request path
     * @param options - Request options
     */
    delete<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>>;

    /**
     * Add a request interceptor
     * @param interceptor - Interceptor function
     * @returns Function to remove the interceptor
     */
    addRequestInterceptor(interceptor: RequestInterceptor): () => void;

    /**
     * Add a response interceptor
     * @param interceptor - Interceptor function
     * @returns Function to remove the interceptor
     */
    addResponseInterceptor<T>(interceptor: ResponseInterceptor<T>): () => void;

    /**
     * Add an error interceptor
     * @param interceptor - Interceptor function
     * @returns Function to remove the interceptor
     */
    addErrorInterceptor(interceptor: ErrorInterceptor): () => void;

    /**
     * Set default headers for all requests
     * @param headers - Headers to set
     */
    setHeaders(headers: Record<string, string>): void;

    /**
     * Set authorization header
     * @param token - Auth token
     * @param type - Auth type (default: "Bearer")
     */
    setAuthToken(token: string, type?: string): void;
}

/**
 * Create a new API client instance
 * @param config - Client configuration
 */
export declare function createClient(config: ApiClientConfig): ApiClient;

export default ApiClient;
```
