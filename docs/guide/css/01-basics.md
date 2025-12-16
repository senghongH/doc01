# CSS Basics

Learn the fundamentals of CSS including selectors, properties, and values.

## CSS Selectors

Selectors are patterns used to select the HTML elements you want to style.

### Element Selector

Selects all elements of a given type:

```css
p {
    color: blue;
}

h1 {
    font-size: 32px;
}
```

### Class Selector

Selects elements with a specific class attribute (prefix with `.`):

```html
<p class="highlight">This is highlighted</p>
<p class="highlight important">This has two classes</p>
```

```css
.highlight {
    background-color: yellow;
}

.important {
    font-weight: bold;
}
```

### ID Selector

Selects a unique element with a specific ID (prefix with `#`):

```html
<div id="header">Site Header</div>
```

```css
#header {
    background-color: #333;
    color: white;
}
```

::: tip
IDs should be unique on a page. Use classes for reusable styles.
:::

### Universal Selector

Selects all elements:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

## Combining Selectors

### Grouping Selector

Apply the same styles to multiple selectors:

```css
h1, h2, h3 {
    font-family: Georgia, serif;
    color: #333;
}
```

### Descendant Selector

Select elements inside other elements:

```css
/* All paragraphs inside article */
article p {
    line-height: 1.6;
}

/* Links inside navigation */
nav a {
    text-decoration: none;
}
```

### Child Selector

Select direct children only (use `>`):

```css
/* Only direct paragraph children of article */
article > p {
    margin-bottom: 1em;
}
```

### Adjacent Sibling Selector

Select element immediately after another (use `+`):

```css
/* Paragraph immediately after h2 */
h2 + p {
    font-size: 1.2em;
}
```

## Attribute Selectors

Select elements based on attributes:

```css
/* Elements with title attribute */
[title] {
    cursor: help;
}

/* Exact match */
[type="text"] {
    border: 1px solid #ccc;
}

/* Contains value */
[class*="btn"] {
    cursor: pointer;
}

/* Starts with */
[href^="https"] {
    color: green;
}

/* Ends with */
[src$=".png"] {
    border: 1px solid #ddd;
}
```

## Pseudo-classes

Style elements based on their state:

```css
/* Unvisited link */
a:link {
    color: blue;
}

/* Visited link */
a:visited {
    color: purple;
}

/* Mouse over */
a:hover {
    color: red;
    text-decoration: underline;
}

/* Being clicked */
a:active {
    color: orange;
}

/* Focused input */
input:focus {
    outline: 2px solid blue;
}
```

### Structural Pseudo-classes

```css
/* First child */
li:first-child {
    font-weight: bold;
}

/* Last child */
li:last-child {
    border-bottom: none;
}

/* Nth child */
tr:nth-child(even) {
    background-color: #f2f2f2;
}

/* Nth child with formula */
li:nth-child(3n) {
    color: red;
}
```

## Pseudo-elements

Style specific parts of an element (use `::`):

```css
/* First line of paragraph */
p::first-line {
    font-weight: bold;
}

/* First letter */
p::first-letter {
    font-size: 2em;
    float: left;
}

/* Before element content */
.quote::before {
    content: '"';
}

/* After element content */
.quote::after {
    content: '"';
}

/* Selected text */
::selection {
    background-color: yellow;
}
```

## CSS Properties and Values

### Common Properties

| Property | Description | Example Values |
|----------|-------------|----------------|
| `color` | Text color | `red`, `#ff0000`, `rgb(255,0,0)` |
| `background-color` | Background color | `blue`, `#0000ff` |
| `font-size` | Text size | `16px`, `1.5em`, `1rem` |
| `width` | Element width | `100px`, `50%`, `auto` |
| `height` | Element height | `200px`, `100vh` |
| `margin` | Outside spacing | `10px`, `1em auto` |
| `padding` | Inside spacing | `15px`, `10px 20px` |
| `border` | Element border | `1px solid black` |

### Value Types

```css
.example {
    /* Keywords */
    display: block;

    /* Length units */
    width: 100px;          /* pixels */
    font-size: 1.5em;      /* relative to parent */
    padding: 1rem;         /* relative to root */

    /* Percentages */
    width: 50%;

    /* Colors */
    color: red;                    /* keyword */
    color: #ff0000;                /* hex */
    color: rgb(255, 0, 0);         /* RGB */
    color: rgba(255, 0, 0, 0.5);   /* RGBA with opacity */
    color: hsl(0, 100%, 50%);      /* HSL */

    /* URLs */
    background-image: url('image.jpg');
}
```

## Specificity

Specificity determines which CSS rule applies when multiple rules target the same element.

### Specificity Hierarchy

| Selector Type | Specificity Value |
|---------------|-------------------|
| Inline styles | 1000 |
| ID selector | 100 |
| Class, attribute, pseudo-class | 10 |
| Element, pseudo-element | 1 |

### Examples

```css
/* Specificity: 1 */
p { color: blue; }

/* Specificity: 10 */
.text { color: green; }

/* Specificity: 11 */
p.text { color: red; }

/* Specificity: 100 */
#main { color: purple; }

/* Specificity: 101 */
#main p { color: orange; }

/* Specificity: 111 */
#main p.text { color: pink; }
```

::: tip
Avoid using `!important` as it breaks the natural cascade. Instead, write more specific selectors.
:::

## Inheritance

Some CSS properties are inherited from parent to child elements:

```css
body {
    font-family: Arial, sans-serif;  /* Inherited */
    color: #333;                      /* Inherited */
}

/* Child elements automatically get these styles */
```

### Inherited Properties

- `color`
- `font-family`, `font-size`, `font-weight`
- `line-height`
- `text-align`
- `visibility`

### Non-Inherited Properties

- `background`
- `border`
- `margin`, `padding`
- `width`, `height`
- `display`, `position`

### Forcing Inheritance

```css
.child {
    border: inherit;  /* Force inheritance */
}
```

## Practice Exercise

Create a simple styled card:

```html
<div class="card">
    <h2 class="card-title">Card Title</h2>
    <p class="card-content">This is the card content.</p>
    <a href="#" class="card-link">Read More</a>
</div>
```

```css
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    max-width: 300px;
}

.card-title {
    color: #333;
    margin-bottom: 10px;
}

.card-content {
    color: #666;
    line-height: 1.5;
}

.card-link {
    color: #007bff;
    text-decoration: none;
}

.card-link:hover {
    text-decoration: underline;
}
```
