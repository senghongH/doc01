# DOM Manipulation

The Document Object Model (DOM) is a programming interface for web documents. It represents the page structure as a tree of objects that you can modify with JavaScript.

## What is the DOM?

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <div id="container">
        <h1>Hello World</h1>
        <p class="intro">Welcome to my page</p>
    </div>
</body>
</html>
```

The browser converts this HTML into a tree structure where each element becomes a node that JavaScript can access and modify.

## Selecting Elements

### getElementById()

Select a single element by its ID:

```js
const container = document.getElementById("container");
console.log(container);
```

### getElementsByClassName()

Returns a live HTMLCollection:

```js
const items = document.getElementsByClassName("intro");
console.log(items[0]);
console.log(items.length);
```

### getElementsByTagName()

Select elements by tag name:

```js
const paragraphs = document.getElementsByTagName("p");
console.log(paragraphs);
```

### querySelector()

Select the first matching element using CSS selectors:

```js
// By ID
const container = document.querySelector("#container");

// By class
const intro = document.querySelector(".intro");

// By tag
const heading = document.querySelector("h1");

// Complex selectors
const firstListItem = document.querySelector("ul > li:first-child");
const link = document.querySelector("a[href='https://example.com']");
```

### querySelectorAll()

Select all matching elements (returns a NodeList):

```js
const allParagraphs = document.querySelectorAll("p");
const menuItems = document.querySelectorAll(".menu-item");

// Iterate over results
allParagraphs.forEach(p => {
    console.log(p.textContent);
});
```

::: tip querySelector vs getElementById
`querySelector` is more flexible but slightly slower. For simple ID lookups, `getElementById` is faster.
:::

## Modifying Content

### textContent

Get or set text content:

```js
const heading = document.querySelector("h1");

// Get text
console.log(heading.textContent);

// Set text
heading.textContent = "New Heading";
```

### innerHTML

Get or set HTML content:

```js
const container = document.querySelector("#container");

// Get HTML
console.log(container.innerHTML);

// Set HTML
container.innerHTML = "<h2>New Content</h2><p>Hello!</p>";
```

::: warning Security Warning
Avoid using `innerHTML` with user-provided content to prevent XSS attacks. Use `textContent` instead, or sanitize the input.
:::

### innerText

Similar to textContent but respects CSS styling:

```js
const element = document.querySelector(".content");

// innerText considers visibility
console.log(element.innerText);
```

## Modifying Attributes

### getAttribute() and setAttribute()

```js
const link = document.querySelector("a");

// Get attribute
const href = link.getAttribute("href");
console.log(href);

// Set attribute
link.setAttribute("href", "https://newsite.com");
link.setAttribute("target", "_blank");
```

### Direct Property Access

```js
const image = document.querySelector("img");

// Get properties
console.log(image.src);
console.log(image.alt);

// Set properties
image.src = "new-image.jpg";
image.alt = "New description";
```

### data-* Attributes

```html
<div id="user" data-user-id="123" data-role="admin"></div>
```

```js
const user = document.querySelector("#user");

// Access via dataset
console.log(user.dataset.userId); // "123"
console.log(user.dataset.role);   // "admin"

// Modify
user.dataset.status = "active";
```

## Modifying Styles

### Inline Styles

```js
const box = document.querySelector(".box");

// Set individual styles
box.style.backgroundColor = "blue";
box.style.width = "200px";
box.style.padding = "20px";
box.style.borderRadius = "10px";

// Set multiple styles
Object.assign(box.style, {
    backgroundColor: "blue",
    width: "200px",
    padding: "20px"
});
```

### CSS Classes

```js
const element = document.querySelector(".element");

// Add class
element.classList.add("active");

// Remove class
element.classList.remove("inactive");

// Toggle class
element.classList.toggle("visible");

// Check if class exists
if (element.classList.contains("active")) {
    console.log("Element is active");
}

// Replace class
element.classList.replace("old-class", "new-class");

// Add multiple classes
element.classList.add("class1", "class2", "class3");
```

### Getting Computed Styles

```js
const element = document.querySelector(".box");
const styles = getComputedStyle(element);

console.log(styles.width);
console.log(styles.backgroundColor);
console.log(styles.getPropertyValue("font-size"));
```

## Creating and Removing Elements

### Creating Elements

```js
// Create element
const newDiv = document.createElement("div");
newDiv.textContent = "Hello, I'm new!";
newDiv.className = "new-element";
newDiv.id = "new-div";

// Add to DOM
document.body.appendChild(newDiv);
```

### Inserting Elements

```js
const container = document.querySelector("#container");
const newElement = document.createElement("p");
newElement.textContent = "New paragraph";

// Append as last child
container.appendChild(newElement);

// Insert at beginning
container.insertBefore(newElement, container.firstChild);

// Modern methods
container.append(newElement);     // Can append multiple, strings too
container.prepend(newElement);    // Add at beginning
container.before(newElement);     // Add before container
container.after(newElement);      // Add after container

// Insert at specific position
const referenceElement = container.querySelector(".reference");
referenceElement.insertAdjacentElement("beforebegin", newElement); // Before
referenceElement.insertAdjacentElement("afterbegin", newElement);  // First child
referenceElement.insertAdjacentElement("beforeend", newElement);   // Last child
referenceElement.insertAdjacentElement("afterend", newElement);    // After

// Insert HTML
container.insertAdjacentHTML("beforeend", "<p>New HTML</p>");
```

### Removing Elements

```js
const element = document.querySelector(".to-remove");

// Modern method
element.remove();

// Legacy method (using parent)
element.parentNode.removeChild(element);

// Remove all children
const container = document.querySelector("#container");
container.innerHTML = "";

// Or using loop
while (container.firstChild) {
    container.removeChild(container.firstChild);
}
```

### Cloning Elements

```js
const original = document.querySelector(".template");

// Shallow clone
const shallowClone = original.cloneNode(false);

// Deep clone (includes children)
const deepClone = original.cloneNode(true);

document.body.appendChild(deepClone);
```

## Event Handling

### Adding Event Listeners

```js
const button = document.querySelector("#myButton");

// Add event listener
button.addEventListener("click", function(event) {
    console.log("Button clicked!");
    console.log("Event:", event);
});

// Arrow function
button.addEventListener("click", (event) => {
    console.log("Clicked with arrow function");
});

// Named function
function handleClick(event) {
    console.log("Handled by named function");
}

button.addEventListener("click", handleClick);
```

### Removing Event Listeners

```js
function handleClick(event) {
    console.log("Clicked!");
}

button.addEventListener("click", handleClick);

// Later, remove it
button.removeEventListener("click", handleClick);
```

### Common Events

```js
// Mouse events
element.addEventListener("click", handler);
element.addEventListener("dblclick", handler);
element.addEventListener("mouseenter", handler);
element.addEventListener("mouseleave", handler);
element.addEventListener("mousemove", handler);

// Keyboard events
document.addEventListener("keydown", handler);
document.addEventListener("keyup", handler);
document.addEventListener("keypress", handler);

// Form events
input.addEventListener("input", handler);
input.addEventListener("change", handler);
input.addEventListener("focus", handler);
input.addEventListener("blur", handler);
form.addEventListener("submit", handler);

// Window events
window.addEventListener("load", handler);
window.addEventListener("resize", handler);
window.addEventListener("scroll", handler);
```

### Event Object

```js
button.addEventListener("click", (event) => {
    // Event properties
    console.log(event.type);        // "click"
    console.log(event.target);      // Element that triggered event
    console.log(event.currentTarget); // Element listener is attached to
    console.log(event.clientX);     // Mouse X position
    console.log(event.clientY);     // Mouse Y position

    // Prevent default behavior
    event.preventDefault();

    // Stop propagation
    event.stopPropagation();
});

document.addEventListener("keydown", (event) => {
    console.log(event.key);         // "Enter", "a", etc.
    console.log(event.code);        // "Enter", "KeyA", etc.
    console.log(event.ctrlKey);     // true if Ctrl pressed
    console.log(event.shiftKey);    // true if Shift pressed
});
```

### Event Delegation

Handle events on dynamically created elements:

```js
// Instead of adding listeners to each item
const list = document.querySelector("#item-list");

list.addEventListener("click", (event) => {
    // Check if clicked element is a list item
    if (event.target.matches("li")) {
        console.log("Clicked:", event.target.textContent);
    }

    // Or for nested elements
    const item = event.target.closest("li");
    if (item) {
        console.log("Clicked item:", item.textContent);
    }
});
```

## Traversing the DOM

### Parent, Children, Siblings

```js
const element = document.querySelector(".current");

// Parent
console.log(element.parentNode);
console.log(element.parentElement);

// Children
console.log(element.childNodes);     // All nodes (including text)
console.log(element.children);       // Only element nodes
console.log(element.firstChild);     // First node
console.log(element.firstElementChild); // First element
console.log(element.lastChild);
console.log(element.lastElementChild);

// Siblings
console.log(element.nextSibling);    // Next node
console.log(element.nextElementSibling); // Next element
console.log(element.previousSibling);
console.log(element.previousElementSibling);
```

### Closest Ancestor

```js
const button = document.querySelector("button");

// Find closest matching ancestor
const form = button.closest("form");
const container = button.closest(".container");
```

## Document Properties

```js
// Document info
console.log(document.title);
console.log(document.URL);
console.log(document.domain);

// Special elements
console.log(document.documentElement); // <html>
console.log(document.head);
console.log(document.body);

// All forms, images, links
console.log(document.forms);
console.log(document.images);
console.log(document.links);
```

## Practical Examples

### Toggle Menu

```js
const menuButton = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");

menuButton.addEventListener("click", () => {
    menu.classList.toggle("open");
    menuButton.setAttribute(
        "aria-expanded",
        menu.classList.contains("open")
    );
});
```

### Form Handling

```js
const form = document.querySelector("#signup-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    console.log(data);

    // Or access individual fields
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;
});
```

### Dynamic List

```js
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const addButton = document.querySelector("#add-todo");

addButton.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete">Delete</button>
    `;

    list.appendChild(li);
    input.value = "";
});

// Event delegation for delete buttons
list.addEventListener("click", (event) => {
    if (event.target.matches(".delete")) {
        event.target.closest("li").remove();
    }
});
```

## Exercises

### Exercise 1: Tab Component
Create a tab switching component.

::: details Solution
```html
<div class="tabs">
    <button class="tab-btn active" data-tab="tab1">Tab 1</button>
    <button class="tab-btn" data-tab="tab2">Tab 2</button>
    <button class="tab-btn" data-tab="tab3">Tab 3</button>
</div>
<div class="tab-content">
    <div id="tab1" class="tab-pane active">Content 1</div>
    <div id="tab2" class="tab-pane">Content 2</div>
    <div id="tab3" class="tab-pane">Content 3</div>
</div>
```

```js
const tabContainer = document.querySelector(".tabs");

tabContainer.addEventListener("click", (event) => {
    const button = event.target.closest(".tab-btn");
    if (!button) return;

    // Update buttons
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    button.classList.add("active");

    // Update content
    document.querySelectorAll(".tab-pane").forEach(pane => {
        pane.classList.remove("active");
    });
    document.getElementById(button.dataset.tab).classList.add("active");
});
```
:::

### Exercise 2: Modal Dialog
Create a modal that opens and closes.

::: details Solution
```js
function createModal(content) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
        <div class="modal">
            <button class="modal-close">&times;</button>
            <div class="modal-content">${content}</div>
        </div>
    `;

    // Close on overlay click
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            overlay.remove();
        }
    });

    // Close on button click
    overlay.querySelector(".modal-close").addEventListener("click", () => {
        overlay.remove();
    });

    // Close on Escape key
    const handleEscape = (event) => {
        if (event.key === "Escape") {
            overlay.remove();
            document.removeEventListener("keydown", handleEscape);
        }
    };
    document.addEventListener("keydown", handleEscape);

    document.body.appendChild(overlay);
}

// Usage
document.querySelector("#open-modal").addEventListener("click", () => {
    createModal("<h2>Hello!</h2><p>This is a modal dialog.</p>");
});
```
:::

## Summary

- `querySelector` and `querySelectorAll` select elements with CSS selectors
- `textContent` for text, `innerHTML` for HTML content
- `classList` provides methods to manage CSS classes
- `addEventListener` handles events with flexibility
- Event delegation handles dynamic elements efficiently
- DOM traversal methods navigate between elements
- Create elements with `createElement`, remove with `remove()`

## Next Steps

Continue to [Async Programming](/guide/javascript/07-async) to learn about handling asynchronous operations.
