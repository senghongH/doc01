# CSS Tutorial

Welcome to the comprehensive CSS tutorial! Learn how to style and design beautiful web pages.

## What is CSS?

CSS (Cascading Style Sheets) is the language used to style and layout web pages. It controls how HTML elements are displayed on screen.

```css
/* Basic CSS Example */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
}

h1 {
    color: #333;
    text-align: center;
}

.button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
}
```

## Tutorial Structure

### Beginner Level
- [Basics](/guide/css/01-basics) - Selectors, Properties, and Values
- [Colors & Backgrounds](/guide/css/02-colors) - Working with Colors and Backgrounds
- [Typography](/guide/css/03-typography) - Fonts and Text Styling

### Intermediate Level
- [Box Model](/guide/css/04-box-model) - Margins, Padding, and Borders
- [Layout](/guide/css/05-layout) - Display, Position, and Float
- [Flexbox](/guide/css/06-flexbox) - Flexible Box Layout

### Advanced Level
- [Grid](/guide/css/07-grid) - CSS Grid Layout
- [Responsive Design](/guide/css/08-responsive) - Media Queries and Mobile-First
- [Animations](/guide/css/09-animations) - Transitions and Animations
- [Advanced Techniques](/guide/css/10-advanced) - Variables, Functions, and Best Practices

## Prerequisites

- Basic understanding of HTML
- A text editor (VS Code recommended)
- A web browser with developer tools

## Getting Started

### Adding CSS to HTML

There are three ways to add CSS to your HTML:

#### 1. Inline CSS

```html
<p style="color: blue; font-size: 16px;">Styled text</p>
```

#### 2. Internal CSS (in `<head>`)

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        p {
            color: blue;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <p>Styled text</p>
</body>
</html>
```

#### 3. External CSS (Recommended)

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <p>Styled text</p>
</body>
</html>
```

```css
/* styles.css */
p {
    color: blue;
    font-size: 16px;
}
```

::: tip
External CSS files are the recommended approach for larger projects as they keep your code organized and reusable.
:::

## CSS Syntax

CSS rules consist of selectors and declarations:

```css
selector {
    property: value;
    property: value;
}
```

| Component | Description |
|-----------|-------------|
| Selector | Targets HTML elements to style |
| Property | The aspect you want to change (color, size, etc.) |
| Value | The setting for that property |
| Declaration | A property-value pair |

## The Cascade

CSS stands for **Cascading** Style Sheets. The cascade determines which styles apply when multiple rules target the same element:

1. **Specificity** - More specific selectors win
2. **Source Order** - Later rules override earlier ones
3. **Importance** - `!important` overrides normal rules

```css
/* Lower specificity */
p { color: blue; }

/* Higher specificity - this wins */
p.intro { color: red; }
```

Let's begin your CSS journey!
