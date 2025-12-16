# Modules

Learn how to organize TypeScript code with modules.

## ES Modules

TypeScript supports standard ES modules.

### Exporting

```typescript
// Named exports
export const PI = 3.14159;

export function add(a: number, b: number): number {
    return a + b;
}

export class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }
}

export interface User {
    id: number;
    name: string;
}

export type ID = string | number;

// Export list
const multiply = (a: number, b: number) => a * b;
const divide = (a: number, b: number) => a / b;

export { multiply, divide };

// Rename on export
export { multiply as mul, divide as div };
```

### Default Exports

```typescript
// Default export
export default class Logger {
    log(message: string): void {
        console.log(message);
    }
}

// Or with function
export default function createApp() {
    return { name: "MyApp" };
}

// Mixed exports
export default class User {}
export const createUser = () => new User();
export type UserRole = "admin" | "user";
```

### Importing

```typescript
// Named imports
import { add, Calculator, User } from "./math";

// Import with alias
import { add as sum } from "./math";

// Default import
import Logger from "./logger";

// Mixed import
import User, { createUser, UserRole } from "./user";

// Import all as namespace
import * as MathUtils from "./math";
MathUtils.add(1, 2);

// Side-effect import (runs module code)
import "./polyfills";

// Type-only import
import type { User, UserRole } from "./user";

// Inline type import
import { createUser, type User } from "./user";
```

## Re-exporting

Create barrel files to simplify imports:

```typescript
// utils/index.ts
export { add, subtract } from "./math";
export { formatDate, parseDate } from "./date";
export { default as Logger } from "./logger";

// Re-export all
export * from "./helpers";

// Re-export with rename
export { User as UserModel } from "./user";

// Re-export types
export type { User, UserRole } from "./user";
```

## Module Resolution

### Path Mapping

```json
// tsconfig.json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"],
            "@utils/*": ["src/utils/*"],
            "@components/*": ["src/components/*"]
        }
    }
}
```

```typescript
// Using path aliases
import { Button } from "@components/Button";
import { formatDate } from "@utils/date";
import { api } from "@/services/api";
```

## Namespaces

Group related code (older pattern, prefer modules):

```typescript
namespace Validation {
    export interface Validator {
        isValid(value: string): boolean;
    }

    export class EmailValidator implements Validator {
        isValid(value: string): boolean {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }
    }

    export class PhoneValidator implements Validator {
        isValid(value: string): boolean {
            return /^\d{10}$/.test(value);
        }
    }
}

const emailValidator = new Validation.EmailValidator();
console.log(emailValidator.isValid("test@example.com"));
```

### Nested Namespaces

```typescript
namespace App {
    export namespace Models {
        export interface User {
            id: number;
            name: string;
        }
    }

    export namespace Services {
        export class UserService {
            getUser(id: number): Models.User | undefined {
                return { id, name: "John" };
            }
        }
    }
}

const user: App.Models.User = { id: 1, name: "John" };
const service = new App.Services.UserService();
```

## Ambient Declarations

Describe external code:

```typescript
// globals.d.ts
declare const API_URL: string;
declare const DEBUG: boolean;

declare function fetchData(url: string): Promise<unknown>;

declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production";
        API_KEY: string;
    }
}
```

## Module Augmentation

Extend existing modules:

```typescript
// Extend Express Request
import "express";

declare module "express" {
    interface Request {
        user?: {
            id: string;
            role: string;
        };
    }
}

// Extend global types
declare global {
    interface Window {
        myApp: {
            version: string;
            init(): void;
        };
    }

    interface Array<T> {
        first(): T | undefined;
        last(): T | undefined;
    }
}

export {}; // Make this a module
```

## Dynamic Imports

Load modules at runtime:

```typescript
// Dynamic import
async function loadModule() {
    const module = await import("./heavy-module");
    module.doSomething();
}

// Conditional import
async function loadFeature(featureName: string) {
    switch (featureName) {
        case "charts":
            return import("./features/charts");
        case "maps":
            return import("./features/maps");
        default:
            throw new Error(`Unknown feature: ${featureName}`);
    }
}

// With type assertion
const { default: Component } = await import("./Component") as {
    default: typeof import("./Component").default;
};
```

## CommonJS Interop

Work with CommonJS modules:

```typescript
// tsconfig.json
{
    "compilerOptions": {
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true
    }
}

// Import CommonJS module
import express from "express";      // With esModuleInterop
import * as fs from "fs";           // Namespace import

// Export for CommonJS
export = function() {
    return "Hello";
};

// Import CommonJS with types
import type { Request, Response } from "express";
```

## Organizing Large Projects

### Feature-based Structure

```
src/
├── features/
│   ├── auth/
│   │   ├── index.ts        # Barrel file
│   │   ├── auth.service.ts
│   │   ├── auth.types.ts
│   │   └── auth.utils.ts
│   ├── users/
│   │   ├── index.ts
│   │   ├── user.service.ts
│   │   ├── user.model.ts
│   │   └── user.types.ts
│   └── products/
│       ├── index.ts
│       ├── product.service.ts
│       └── product.types.ts
├── shared/
│   ├── utils/
│   ├── types/
│   └── constants/
└── index.ts
```

### Barrel Files

```typescript
// features/auth/index.ts
export { AuthService } from "./auth.service";
export { login, logout, register } from "./auth.utils";
export type { LoginCredentials, AuthToken } from "./auth.types";

// features/index.ts
export * from "./auth";
export * from "./users";
export * from "./products";

// Usage
import { AuthService, UserService, ProductService } from "@/features";
```

## Practice Exercise

Create a modular API client:

```typescript
// types/index.ts
export interface ApiConfig {
    baseUrl: string;
    timeout?: number;
    headers?: Record<string, string>;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: unknown;
}

// client/http.ts
import type { ApiConfig, ApiResponse, ApiError } from "../types";

export class HttpClient {
    private config: Required<ApiConfig>;

    constructor(config: ApiConfig) {
        this.config = {
            timeout: 5000,
            headers: {},
            ...config
        };
    }

    async request<T>(
        method: string,
        path: string,
        body?: unknown
    ): Promise<ApiResponse<T>> {
        const response = await fetch(`${this.config.baseUrl}${path}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...this.config.headers
            },
            body: body ? JSON.stringify(body) : undefined
        });

        const data = await response.json();

        if (!response.ok) {
            throw {
                code: "API_ERROR",
                message: data.message || "Request failed",
                details: data
            } as ApiError;
        }

        return {
            data,
            status: response.status
        };
    }

    get<T>(path: string): Promise<ApiResponse<T>> {
        return this.request<T>("GET", path);
    }

    post<T, U>(path: string, body: U): Promise<ApiResponse<T>> {
        return this.request<T>("POST", path, body);
    }

    put<T, U>(path: string, body: U): Promise<ApiResponse<T>> {
        return this.request<T>("PUT", path, body);
    }

    delete<T>(path: string): Promise<ApiResponse<T>> {
        return this.request<T>("DELETE", path);
    }
}

// services/user.service.ts
import { HttpClient } from "../client/http";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface CreateUserDto {
    name: string;
    email: string;
}

export class UserService {
    constructor(private http: HttpClient) {}

    async getUsers(): Promise<User[]> {
        const response = await this.http.get<User[]>("/users");
        return response.data;
    }

    async getUser(id: number): Promise<User> {
        const response = await this.http.get<User>(`/users/${id}`);
        return response.data;
    }

    async createUser(data: CreateUserDto): Promise<User> {
        const response = await this.http.post<User, CreateUserDto>(
            "/users",
            data
        );
        return response.data;
    }

    async updateUser(id: number, data: Partial<CreateUserDto>): Promise<User> {
        const response = await this.http.put<User, Partial<CreateUserDto>>(
            `/users/${id}`,
            data
        );
        return response.data;
    }

    async deleteUser(id: number): Promise<void> {
        await this.http.delete(`/users/${id}`);
    }
}

// index.ts - Main export
export { HttpClient } from "./client/http";
export { UserService } from "./services/user.service";
export type * from "./types";

// Usage
import { HttpClient, UserService } from "./api";

const http = new HttpClient({ baseUrl: "https://api.example.com" });
const userService = new UserService(http);

const users = await userService.getUsers();
```
