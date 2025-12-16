# Advanced Patterns

Learn best practices and advanced TypeScript patterns.

## Strict Type Checking

Enable all strict options:

```json
// tsconfig.json
{
    "compilerOptions": {
        "strict": true,
        // Individual options enabled by strict:
        "noImplicitAny": true,
        "noImplicitThis": true,
        "strictNullChecks": true,
        "strictFunctionTypes": true,
        "strictBindCallApply": true,
        "strictPropertyInitialization": true,
        "alwaysStrict": true,
        "useUnknownInCatchVariables": true
    }
}
```

## Type Guards

Custom type narrowing functions:

```typescript
// Type predicate
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

// With interfaces
interface Dog {
    bark(): void;
}

interface Cat {
    meow(): void;
}

function isDog(animal: Dog | Cat): animal is Dog {
    return "bark" in animal;
}

// Assertion function
function assertDefined<T>(
    value: T,
    message = "Value is undefined"
): asserts value is NonNullable<T> {
    if (value === undefined || value === null) {
        throw new Error(message);
    }
}

// Usage
function process(value: string | undefined) {
    assertDefined(value);
    // value is now string
    console.log(value.toUpperCase());
}
```

## Branded Types

Create distinct types from primitives:

```typescript
// Brand type
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

// Constructor functions
function createUserId(id: string): UserId {
    return id as UserId;
}

function createOrderId(id: string): OrderId {
    return id as OrderId;
}

// Type-safe usage
function getUser(id: UserId): User {
    // ...
}

function getOrder(id: OrderId): Order {
    // ...
}

const userId = createUserId("user-123");
const orderId = createOrderId("order-456");

getUser(userId);    // OK
// getUser(orderId); // Error: OrderId is not assignable to UserId
```

## Builder Pattern

Fluent API with type safety:

```typescript
class QueryBuilder<T> {
    private query: Partial<T> = {};
    private conditions: string[] = [];

    where<K extends keyof T>(key: K, value: T[K]): this {
        this.query[key] = value;
        this.conditions.push(`${String(key)} = ?`);
        return this;
    }

    select<K extends keyof T>(...keys: K[]): Pick<T, K>[] {
        // Implementation
        return [] as Pick<T, K>[];
    }

    build(): { query: Partial<T>; sql: string } {
        return {
            query: this.query,
            sql: `SELECT * WHERE ${this.conditions.join(" AND ")}`
        };
    }
}

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

const result = new QueryBuilder<User>()
    .where("name", "John")
    .where("age", 30)
    .build();
```

## Result Type Pattern

Explicit error handling:

```typescript
type Result<T, E = Error> =
    | { success: true; value: T }
    | { success: false; error: E };

function ok<T>(value: T): Result<T, never> {
    return { success: true, value };
}

function err<E>(error: E): Result<never, E> {
    return { success: false, error };
}

// Usage
function divide(a: number, b: number): Result<number, string> {
    if (b === 0) {
        return err("Cannot divide by zero");
    }
    return ok(a / b);
}

const result = divide(10, 2);

if (result.success) {
    console.log(result.value); // 5
} else {
    console.error(result.error);
}

// Chain results
function parseNumber(str: string): Result<number, string> {
    const num = Number(str);
    if (isNaN(num)) {
        return err(`Invalid number: ${str}`);
    }
    return ok(num);
}

function calculate(a: string, b: string): Result<number, string> {
    const numA = parseNumber(a);
    if (!numA.success) return numA;

    const numB = parseNumber(b);
    if (!numB.success) return numB;

    return divide(numA.value, numB.value);
}
```

## State Machine Pattern

Type-safe state transitions:

```typescript
type OrderState = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

type StateTransitions = {
    pending: "confirmed" | "cancelled";
    confirmed: "shipped" | "cancelled";
    shipped: "delivered";
    delivered: never;
    cancelled: never;
};

type ValidTransition<S extends OrderState> = StateTransitions[S];

interface Order<S extends OrderState = OrderState> {
    id: string;
    state: S;
    transition<N extends ValidTransition<S>>(
        newState: N
    ): Order<N>;
}

function createOrder(id: string): Order<"pending"> {
    return {
        id,
        state: "pending",
        transition(newState) {
            return {
                ...this,
                state: newState,
                transition: this.transition
            } as any;
        }
    };
}

const order = createOrder("123");
const confirmed = order.transition("confirmed");
const shipped = confirmed.transition("shipped");
// order.transition("delivered"); // Error: not valid from "pending"
```

## Dependency Injection

Type-safe DI container:

```typescript
type Constructor<T = unknown> = new (...args: any[]) => T;

class Container {
    private instances = new Map<Constructor, unknown>();
    private factories = new Map<Constructor, () => unknown>();

    register<T>(token: Constructor<T>, factory: () => T): void {
        this.factories.set(token, factory);
    }

    registerSingleton<T>(token: Constructor<T>, factory: () => T): void {
        this.register(token, () => {
            if (!this.instances.has(token)) {
                this.instances.set(token, factory());
            }
            return this.instances.get(token) as T;
        });
    }

    resolve<T>(token: Constructor<T>): T {
        const factory = this.factories.get(token);
        if (!factory) {
            throw new Error(`No provider for ${token.name}`);
        }
        return factory() as T;
    }
}

// Usage
class Logger {
    log(message: string) {
        console.log(message);
    }
}

class UserService {
    constructor(private logger: Logger) {}

    createUser(name: string) {
        this.logger.log(`Creating user: ${name}`);
    }
}

const container = new Container();
container.registerSingleton(Logger, () => new Logger());
container.register(
    UserService,
    () => new UserService(container.resolve(Logger))
);

const userService = container.resolve(UserService);
```

## Exhaustive Type Checking

Ensure all cases are handled:

```typescript
function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}

type Action =
    | { type: "ADD"; payload: number }
    | { type: "SUBTRACT"; payload: number }
    | { type: "RESET" };

function reducer(state: number, action: Action): number {
    switch (action.type) {
        case "ADD":
            return state + action.payload;
        case "SUBTRACT":
            return state - action.payload;
        case "RESET":
            return 0;
        default:
            return assertNever(action);
    }
}
```

## Discriminated Unions with Classes

```typescript
abstract class Result<T, E> {
    abstract isOk(): this is Ok<T, E>;
    abstract isErr(): this is Err<T, E>;

    abstract map<U>(fn: (value: T) => U): Result<U, E>;
    abstract mapErr<F>(fn: (error: E) => F): Result<T, F>;
    abstract unwrap(): T;
    abstract unwrapOr(defaultValue: T): T;
}

class Ok<T, E> extends Result<T, E> {
    constructor(public readonly value: T) {
        super();
    }

    isOk(): this is Ok<T, E> {
        return true;
    }

    isErr(): this is Err<T, E> {
        return false;
    }

    map<U>(fn: (value: T) => U): Result<U, E> {
        return new Ok(fn(this.value));
    }

    mapErr<F>(_fn: (error: E) => F): Result<T, F> {
        return new Ok(this.value);
    }

    unwrap(): T {
        return this.value;
    }

    unwrapOr(_defaultValue: T): T {
        return this.value;
    }
}

class Err<T, E> extends Result<T, E> {
    constructor(public readonly error: E) {
        super();
    }

    isOk(): this is Ok<T, E> {
        return false;
    }

    isErr(): this is Err<T, E> {
        return true;
    }

    map<U>(_fn: (value: T) => U): Result<U, E> {
        return new Err(this.error);
    }

    mapErr<F>(fn: (error: E) => F): Result<T, F> {
        return new Err(fn(this.error));
    }

    unwrap(): T {
        throw new Error(`Called unwrap on Err: ${this.error}`);
    }

    unwrapOr(defaultValue: T): T {
        return defaultValue;
    }
}
```

## Type-Safe Event Emitter

```typescript
type EventMap = Record<string, unknown>;

type EventCallback<T> = (data: T) => void;

class TypedEventEmitter<Events extends EventMap> {
    private listeners = new Map<keyof Events, Set<EventCallback<any>>>();

    on<K extends keyof Events>(
        event: K,
        callback: EventCallback<Events[K]>
    ): () => void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback);

        return () => this.off(event, callback);
    }

    off<K extends keyof Events>(
        event: K,
        callback: EventCallback<Events[K]>
    ): void {
        this.listeners.get(event)?.delete(callback);
    }

    emit<K extends keyof Events>(event: K, data: Events[K]): void {
        this.listeners.get(event)?.forEach(cb => cb(data));
    }
}

// Usage
interface AppEvents {
    userLogin: { userId: string; timestamp: Date };
    userLogout: { userId: string };
    error: { message: string; code: number };
}

const events = new TypedEventEmitter<AppEvents>();

events.on("userLogin", ({ userId, timestamp }) => {
    console.log(`${userId} logged in at ${timestamp}`);
});

events.emit("userLogin", {
    userId: "123",
    timestamp: new Date()
});
```

## Practice Exercise

Build a type-safe API with middleware:

```typescript
// Types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RouteContext<
    Params = Record<string, string>,
    Body = unknown,
    Query = Record<string, string>
> {
    params: Params;
    body: Body;
    query: Query;
    headers: Record<string, string>;
}

type RouteHandler<Ctx extends RouteContext, Response> = (
    ctx: Ctx
) => Promise<Response> | Response;

type Middleware<Ctx extends RouteContext> = (
    ctx: Ctx,
    next: () => Promise<void>
) => Promise<void>;

// Route builder
class Route<
    Params = Record<string, string>,
    Body = unknown,
    Query = Record<string, string>,
    Ctx extends RouteContext<Params, Body, Query> = RouteContext<Params, Body, Query>
> {
    private middlewares: Middleware<Ctx>[] = [];

    constructor(
        public method: HttpMethod,
        public path: string
    ) {}

    params<P extends Record<string, string>>(): Route<P, Body, Query> {
        return this as unknown as Route<P, Body, Query>;
    }

    body<B>(): Route<Params, B, Query> {
        return this as unknown as Route<Params, B, Query>;
    }

    query<Q extends Record<string, string>>(): Route<Params, Body, Q> {
        return this as unknown as Route<Params, Body, Q>;
    }

    use(middleware: Middleware<Ctx>): this {
        this.middlewares.push(middleware);
        return this;
    }

    handle<Response>(
        handler: RouteHandler<Ctx, Response>
    ): RegisteredRoute<Ctx, Response> {
        return {
            method: this.method,
            path: this.path,
            middlewares: this.middlewares,
            handler
        };
    }
}

interface RegisteredRoute<Ctx extends RouteContext, Response> {
    method: HttpMethod;
    path: string;
    middlewares: Middleware<Ctx>[];
    handler: RouteHandler<Ctx, Response>;
}

// Router
class Router {
    private routes: RegisteredRoute<any, any>[] = [];

    get(path: string) {
        return new Route("GET", path);
    }

    post(path: string) {
        return new Route("POST", path);
    }

    put(path: string) {
        return new Route("PUT", path);
    }

    delete(path: string) {
        return new Route("DELETE", path);
    }

    register<Ctx extends RouteContext, Response>(
        route: RegisteredRoute<Ctx, Response>
    ): void {
        this.routes.push(route);
    }
}

// Usage
interface User {
    id: string;
    name: string;
    email: string;
}

interface CreateUserBody {
    name: string;
    email: string;
}

const router = new Router();

// GET /users/:id
const getUserRoute = router
    .get("/users/:id")
    .params<{ id: string }>()
    .handle(async (ctx) => {
        const user: User = {
            id: ctx.params.id,
            name: "John",
            email: "john@example.com"
        };
        return user;
    });

// POST /users
const createUserRoute = router
    .post("/users")
    .body<CreateUserBody>()
    .use(async (ctx, next) => {
        console.log("Validating body...");
        await next();
    })
    .handle(async (ctx) => {
        const user: User = {
            id: "new-id",
            name: ctx.body.name,
            email: ctx.body.email
        };
        return user;
    });

// GET /users?page=1&limit=10
const listUsersRoute = router
    .get("/users")
    .query<{ page: string; limit: string }>()
    .handle(async (ctx) => {
        const page = parseInt(ctx.query.page);
        const limit = parseInt(ctx.query.limit);
        const users: User[] = [];
        return { users, page, limit, total: 0 };
    });

router.register(getUserRoute);
router.register(createUserRoute);
router.register(listUsersRoute);
```
