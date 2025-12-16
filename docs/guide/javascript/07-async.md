# Async Programming

JavaScript is single-threaded but handles asynchronous operations through an event loop. This allows non-blocking operations like network requests, file I/O, and timers.

## Synchronous vs Asynchronous

### Synchronous Code

```js
console.log("First");
console.log("Second");
console.log("Third");
// Output: First, Second, Third (in order)
```

### Asynchronous Code

```js
console.log("First");

setTimeout(() => {
    console.log("Second");
}, 1000);

console.log("Third");
// Output: First, Third, Second
```

## Callbacks

The traditional way to handle async operations:

```js
function fetchData(callback) {
    setTimeout(() => {
        const data = { id: 1, name: "Product" };
        callback(data);
    }, 1000);
}

fetchData((data) => {
    console.log("Received:", data);
});
```

### Callback Hell

Nested callbacks become hard to manage:

```js
getUser(userId, (user) => {
    getOrders(user.id, (orders) => {
        getOrderDetails(orders[0].id, (details) => {
            getProduct(details.productId, (product) => {
                console.log(product);
                // This is callback hell!
            });
        });
    });
});
```

### Error Handling with Callbacks

```js
function fetchData(callback) {
    setTimeout(() => {
        const error = Math.random() > 0.5 ? new Error("Failed") : null;
        const data = { id: 1, name: "Product" };

        callback(error, data);
    }, 1000);
}

fetchData((error, data) => {
    if (error) {
        console.error("Error:", error.message);
        return;
    }
    console.log("Data:", data);
});
```

## Promises

Promises represent the eventual completion or failure of an async operation.

### Creating Promises

```js
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true;

        if (success) {
            resolve({ id: 1, name: "Product" });
        } else {
            reject(new Error("Failed to fetch"));
        }
    }, 1000);
});
```

### Using Promises

```js
promise
    .then((data) => {
        console.log("Success:", data);
        return data.name;
    })
    .then((name) => {
        console.log("Name:", name);
    })
    .catch((error) => {
        console.error("Error:", error.message);
    })
    .finally(() => {
        console.log("Done (success or failure)");
    });
```

### Promise States

1. **Pending**: Initial state, neither fulfilled nor rejected
2. **Fulfilled**: Operation completed successfully
3. **Rejected**: Operation failed

```js
const pending = new Promise(() => {});
const fulfilled = Promise.resolve("Success");
const rejected = Promise.reject(new Error("Failed"));
```

### Chaining Promises

```js
function getUser(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id: userId, name: "John" }), 100);
    });
}

function getOrders(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve([{ id: 1 }, { id: 2 }]), 100);
    });
}

function getOrderDetails(orderId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ orderId, total: 99.99 }), 100);
    });
}

// Chain instead of nest
getUser(1)
    .then(user => {
        console.log("User:", user);
        return getOrders(user.id);
    })
    .then(orders => {
        console.log("Orders:", orders);
        return getOrderDetails(orders[0].id);
    })
    .then(details => {
        console.log("Details:", details);
    })
    .catch(error => {
        console.error("Error:", error);
    });
```

### Promise Static Methods

#### Promise.all()

Wait for all promises to resolve:

```js
const promise1 = fetch("/api/users");
const promise2 = fetch("/api/products");
const promise3 = fetch("/api/orders");

Promise.all([promise1, promise2, promise3])
    .then(([users, products, orders]) => {
        console.log("All data loaded");
    })
    .catch(error => {
        console.log("One failed, all fail");
    });
```

#### Promise.allSettled()

Wait for all to complete (regardless of success/failure):

```js
Promise.allSettled([promise1, promise2, promise3])
    .then(results => {
        results.forEach(result => {
            if (result.status === "fulfilled") {
                console.log("Success:", result.value);
            } else {
                console.log("Failed:", result.reason);
            }
        });
    });
```

#### Promise.race()

Return first settled promise:

```js
const slow = new Promise(resolve => setTimeout(() => resolve("slow"), 2000));
const fast = new Promise(resolve => setTimeout(() => resolve("fast"), 100));

Promise.race([slow, fast])
    .then(result => {
        console.log(result); // "fast"
    });
```

#### Promise.any()

Return first fulfilled promise:

```js
const promises = [
    Promise.reject("Error 1"),
    Promise.resolve("Success"),
    Promise.reject("Error 2")
];

Promise.any(promises)
    .then(result => {
        console.log(result); // "Success"
    })
    .catch(errors => {
        console.log("All failed");
    });
```

## Async/Await

Syntactic sugar over Promises for cleaner async code.

### Basic Usage

```js
async function fetchUser() {
    const response = await fetch("/api/user");
    const user = await response.json();
    return user;
}

// Using the function
fetchUser().then(user => console.log(user));
```

### Error Handling

```js
async function fetchData() {
    try {
        const response = await fetch("/api/data");

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch failed:", error);
        throw error; // Re-throw if caller needs to handle
    }
}
```

### Sequential vs Parallel

```js
// Sequential - one after another
async function sequential() {
    const user = await getUser(1);      // Wait
    const orders = await getOrders(1);  // Then wait
    const products = await getProducts(); // Then wait
    return { user, orders, products };
}

// Parallel - all at once
async function parallel() {
    const [user, orders, products] = await Promise.all([
        getUser(1),
        getOrders(1),
        getProducts()
    ]);
    return { user, orders, products };
}
```

### Async Loops

```js
// Sequential processing
async function processSequentially(items) {
    for (const item of items) {
        await processItem(item);
    }
}

// Parallel processing
async function processInParallel(items) {
    await Promise.all(items.map(item => processItem(item)));
}

// Batched parallel processing
async function processBatched(items, batchSize = 3) {
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        await Promise.all(batch.map(item => processItem(item)));
    }
}
```

### Top-Level Await

In ES modules, you can use await at the top level:

```js
// In an ES module (.mjs or type="module")
const response = await fetch("/api/config");
const config = await response.json();

export { config };
```

## Fetch API

Modern API for making HTTP requests:

### GET Request

```js
async function getUsers() {
    const response = await fetch("/api/users");
    const users = await response.json();
    return users;
}
```

### POST Request

```js
async function createUser(userData) {
    const response = await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error("Failed to create user");
    }

    return response.json();
}
```

### Other Methods

```js
// PUT
await fetch("/api/users/1", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData)
});

// DELETE
await fetch("/api/users/1", {
    method: "DELETE"
});

// With query parameters
const params = new URLSearchParams({ page: 1, limit: 10 });
await fetch(`/api/users?${params}`);
```

### Handling Response

```js
async function handleResponse(url) {
    const response = await fetch(url);

    // Check status
    console.log(response.status);     // 200
    console.log(response.ok);         // true (200-299)
    console.log(response.statusText); // "OK"

    // Response headers
    console.log(response.headers.get("Content-Type"));

    // Parse body (can only be read once)
    const json = await response.json();
    // or
    const text = await response.text();
    // or
    const blob = await response.blob();
}
```

### Fetch with Timeout

```js
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === "AbortError") {
            throw new Error("Request timed out");
        }
        throw error;
    }
}
```

## Timers

### setTimeout

Execute once after delay:

```js
const timeoutId = setTimeout(() => {
    console.log("Executed after 2 seconds");
}, 2000);

// Cancel before execution
clearTimeout(timeoutId);
```

### setInterval

Execute repeatedly:

```js
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log(`Count: ${count}`);

    if (count >= 5) {
        clearInterval(intervalId);
    }
}, 1000);
```

### Promisified Timer

```js
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function example() {
    console.log("Start");
    await delay(2000);
    console.log("After 2 seconds");
}
```

## Event Loop

Understanding how JavaScript handles async operations:

```js
console.log("1. Synchronous");

setTimeout(() => {
    console.log("4. Timeout (macrotask)");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Promise (microtask)");
});

console.log("2. Synchronous");

// Output order: 1, 2, 3, 4
// Microtasks (Promises) execute before macrotasks (setTimeout)
```

## Error Handling Patterns

### Async Error Wrapper

```js
function asyncHandler(fn) {
    return function(...args) {
        return fn(...args).catch(error => {
            console.error("Async error:", error);
        });
    };
}

const safeGetUser = asyncHandler(async (id) => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
});
```

### Retry Pattern

```js
async function fetchWithRetry(url, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url);
            if (response.ok) return response;
        } catch (error) {
            console.log(`Attempt ${i + 1} failed`);
        }

        if (i < retries - 1) {
            await new Promise(r => setTimeout(r, delay));
        }
    }
    throw new Error("All retry attempts failed");
}
```

## Exercises

### Exercise 1: Sequential API Calls
Fetch user, then their posts, then comments on the first post.

::: details Solution
```js
async function getUserPostComments(userId) {
    try {
        // Get user
        const userRes = await fetch(`/api/users/${userId}`);
        const user = await userRes.json();
        console.log("User:", user.name);

        // Get user's posts
        const postsRes = await fetch(`/api/users/${userId}/posts`);
        const posts = await postsRes.json();
        console.log("Posts:", posts.length);

        // Get comments on first post
        if (posts.length > 0) {
            const commentsRes = await fetch(`/api/posts/${posts[0].id}/comments`);
            const comments = await commentsRes.json();
            console.log("Comments:", comments.length);
            return { user, posts, comments };
        }

        return { user, posts, comments: [] };
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
```
:::

### Exercise 2: Parallel with Timeout
Fetch multiple URLs in parallel with a timeout.

::: details Solution
```js
async function fetchAllWithTimeout(urls, timeout = 5000) {
    const fetchWithTimeout = async (url) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            return { url, data: await response.json(), error: null };
        } catch (error) {
            clearTimeout(timeoutId);
            return { url, data: null, error: error.message };
        }
    };

    return Promise.all(urls.map(fetchWithTimeout));
}

// Usage
const results = await fetchAllWithTimeout([
    "/api/users",
    "/api/products",
    "/api/orders"
], 3000);

results.forEach(({ url, data, error }) => {
    if (error) {
        console.log(`${url} failed: ${error}`);
    } else {
        console.log(`${url} succeeded:`, data);
    }
});
```
:::

### Exercise 3: Debounce Function
Create a debounced async function.

::: details Solution
```js
function debounceAsync(fn, delay) {
    let timeoutId;

    return function(...args) {
        return new Promise((resolve, reject) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(async () => {
                try {
                    const result = await fn.apply(this, args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }, delay);
        });
    };
}

// Usage
const debouncedSearch = debounceAsync(async (query) => {
    const response = await fetch(`/api/search?q=${query}`);
    return response.json();
}, 300);

// In search input handler
input.addEventListener("input", async (e) => {
    const results = await debouncedSearch(e.target.value);
    displayResults(results);
});
```
:::

## Summary

- Callbacks were the original async pattern but lead to callback hell
- Promises provide cleaner async handling with `.then()` and `.catch()`
- `async/await` makes async code look synchronous
- Use `Promise.all()` for parallel operations
- The Fetch API is the modern way to make HTTP requests
- Understanding the event loop helps debug async issues
- Always handle errors in async code

## Next Steps

Continue to [ES6+ Features](/guide/javascript/08-es6) to learn about modern JavaScript syntax and features.
