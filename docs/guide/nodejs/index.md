# Node.js Tutorial

Welcome to the Node.js tutorial! Learn how to build powerful server-side applications with JavaScript.

## What is Node.js?

Node.js is a **JavaScript runtime** built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server-side, outside of a web browser.

```
┌─────────────────────────────────────────────────────────────┐
│                    Traditional Web Development               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Browser                         Server                    │
│   ┌─────────────┐                ┌─────────────┐           │
│   │ JavaScript  │                │ PHP/Python/ │           │
│   │ (Frontend)  │  ──────────►   │ Ruby/Java   │           │
│   └─────────────┘                └─────────────┘           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                    With Node.js                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Browser                         Server                    │
│   ┌─────────────┐                ┌─────────────┐           │
│   │ JavaScript  │                │ JavaScript  │           │
│   │ (Frontend)  │  ──────────►   │ (Node.js)   │           │
│   └─────────────┘                └─────────────┘           │
│                                                             │
│   Same language everywhere! 🎉                              │
└─────────────────────────────────────────────────────────────┘
```

## Why Learn Node.js?

| Feature | Description |
|---------|-------------|
| **JavaScript Everywhere** | Use the same language for frontend and backend |
| **Non-blocking I/O** | Handle thousands of concurrent connections efficiently |
| **NPM Ecosystem** | Access to millions of open-source packages |
| **Fast Performance** | Powered by V8 engine, same as Chrome |
| **Large Community** | Extensive resources, tutorials, and support |
| **Industry Adoption** | Used by Netflix, PayPal, LinkedIn, Walmart |

## What You'll Learn

### Beginner
- [Getting Started](/guide/nodejs/01-introduction) - Install Node.js and write your first program
- [Modules](/guide/nodejs/02-modules) - CommonJS and ES Modules
- [File System](/guide/nodejs/03-file-system) - Read, write, and manage files

### Intermediate
- [Async Programming](/guide/nodejs/04-async) - Callbacks, Promises, async/await
- [Events](/guide/nodejs/05-events) - Event-driven architecture
- [Streams](/guide/nodejs/06-streams) - Handle large data efficiently

### Advanced
- [HTTP Module](/guide/nodejs/07-http) - Build web servers from scratch
- [NPM & Packages](/guide/nodejs/08-npm) - Package management
- [Debugging](/guide/nodejs/09-debugging) - Debug like a pro
- [Advanced Topics](/guide/nodejs/10-advanced) - Performance, security, clustering

## Prerequisites

Before starting this tutorial, you should have:

- ✅ Basic understanding of JavaScript
- ✅ Familiarity with command line/terminal
- ✅ A code editor (VS Code recommended)

::: tip New to JavaScript?
Check out our [JavaScript Tutorial](/guide/javascript/) first!
:::

## Quick Start

```javascript
// hello.js - Your first Node.js program
console.log('Hello, Node.js!')

// Run it with: node hello.js
```

```bash
# Check if Node.js is installed
node --version

# Run your first program
node hello.js
# Output: Hello, Node.js!
```

## Node.js vs Browser JavaScript

| Feature | Browser | Node.js |
|---------|---------|---------|
| DOM Access | ✅ Yes | ❌ No |
| `window` object | ✅ Yes | ❌ No |
| `document` object | ✅ Yes | ❌ No |
| File System | ❌ No | ✅ Yes |
| `process` object | ❌ No | ✅ Yes |
| `require`/`import` | Limited | ✅ Full support |
| Network access | Limited | ✅ Full access |

## Let's Begin!

Ready to start? Head over to the [Getting Started](/guide/nodejs/01-introduction) guide!

---

[Get Started →](/guide/nodejs/01-introduction)
