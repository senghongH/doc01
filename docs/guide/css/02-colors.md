# Colors & Backgrounds

Learn how to work with colors and backgrounds in CSS.

## Color Values

CSS supports multiple ways to specify colors.

### Named Colors

CSS has 147 predefined color names:

```css
.examples {
    color: red;
    color: blue;
    color: green;
    color: coral;
    color: darkslategray;
    color: rebeccapurple;
}
```

### Hexadecimal Colors

Six-digit hex codes represent RGB values:

```css
.hex-colors {
    color: #ff0000;  /* Red */
    color: #00ff00;  /* Green */
    color: #0000ff;  /* Blue */
    color: #ffffff;  /* White */
    color: #000000;  /* Black */
    color: #808080;  /* Gray */
}
```

### Shorthand Hex

Three-digit hex for repeated values:

```css
.shorthand {
    color: #f00;    /* Same as #ff0000 */
    color: #0f0;    /* Same as #00ff00 */
    color: #00f;    /* Same as #0000ff */
    color: #fff;    /* Same as #ffffff */
    color: #000;    /* Same as #000000 */
}
```

### RGB and RGBA

RGB values from 0-255:

```css
.rgb-colors {
    color: rgb(255, 0, 0);      /* Red */
    color: rgb(0, 255, 0);      /* Green */
    color: rgb(0, 0, 255);      /* Blue */
    color: rgb(128, 128, 128);  /* Gray */
}

/* RGBA adds alpha (opacity) 0-1 */
.rgba-colors {
    color: rgba(255, 0, 0, 1);     /* Solid red */
    color: rgba(255, 0, 0, 0.5);   /* 50% transparent red */
    color: rgba(0, 0, 0, 0.3);     /* 30% transparent black */
}
```

### HSL and HSLA

Hue (0-360), Saturation (0-100%), Lightness (0-100%):

```css
.hsl-colors {
    color: hsl(0, 100%, 50%);     /* Red */
    color: hsl(120, 100%, 50%);   /* Green */
    color: hsl(240, 100%, 50%);   /* Blue */
    color: hsl(0, 0%, 50%);       /* Gray */
}

/* HSLA with alpha */
.hsla-colors {
    color: hsla(0, 100%, 50%, 0.5);  /* 50% transparent red */
}
```

::: tip
HSL is often easier to work with for creating color variations. Adjust lightness for shades and saturation for vibrancy.
:::

## Color Properties

### Text Color

```css
.text-styling {
    color: #333;              /* Main text */
}

a {
    color: #007bff;           /* Links */
}

a:hover {
    color: #0056b3;           /* Darker on hover */
}
```

### Background Color

```css
.backgrounds {
    background-color: #f8f9fa;   /* Light gray */
}

.highlight {
    background-color: yellow;
}

.transparent-bg {
    background-color: rgba(0, 0, 0, 0.5);
}
```

### Border Color

```css
.border-example {
    border: 2px solid #ddd;
    border-color: #333;

    /* Individual sides */
    border-top-color: red;
    border-right-color: green;
    border-bottom-color: blue;
    border-left-color: orange;
}
```

## Background Properties

### Background Image

```css
.bg-image {
    background-image: url('path/to/image.jpg');
}
```

### Background Repeat

```css
.repeat-options {
    background-repeat: repeat;      /* Default - tiles both ways */
    background-repeat: repeat-x;    /* Tiles horizontally */
    background-repeat: repeat-y;    /* Tiles vertically */
    background-repeat: no-repeat;   /* No tiling */
    background-repeat: space;       /* Even spacing */
    background-repeat: round;       /* Resize to fit */
}
```

### Background Position

```css
.position-options {
    background-position: top left;
    background-position: center center;
    background-position: bottom right;
    background-position: 50% 50%;
    background-position: 20px 40px;
}
```

### Background Size

```css
.size-options {
    background-size: auto;        /* Original size */
    background-size: cover;       /* Cover entire element */
    background-size: contain;     /* Fit within element */
    background-size: 100px 200px; /* Specific dimensions */
    background-size: 50% auto;    /* Percentage */
}
```

### Background Attachment

```css
.attachment-options {
    background-attachment: scroll;  /* Scrolls with content */
    background-attachment: fixed;   /* Fixed to viewport */
    background-attachment: local;   /* Scrolls with element */
}
```

### Background Shorthand

```css
.shorthand {
    /* image position/size repeat attachment color */
    background: url('bg.jpg') center/cover no-repeat fixed #f0f0f0;
}

/* Common patterns */
.hero {
    background: url('hero.jpg') center/cover no-repeat;
}

.pattern {
    background: url('pattern.png') repeat #fff;
}
```

## Multiple Backgrounds

Stack multiple backgrounds (first listed is on top):

```css
.multi-bg {
    background:
        url('overlay.png') center/cover no-repeat,
        url('pattern.png') repeat,
        linear-gradient(to bottom, #333, #666);
}
```

## Gradients

### Linear Gradient

```css
.linear-examples {
    /* Top to bottom (default) */
    background: linear-gradient(#ff0000, #0000ff);

    /* With direction */
    background: linear-gradient(to right, #ff0000, #0000ff);
    background: linear-gradient(to bottom right, #ff0000, #0000ff);

    /* With angle */
    background: linear-gradient(45deg, #ff0000, #0000ff);

    /* Multiple color stops */
    background: linear-gradient(to right, red, orange, yellow, green, blue);

    /* With positions */
    background: linear-gradient(to right, red 0%, blue 50%, green 100%);
}
```

### Radial Gradient

```css
.radial-examples {
    /* Default: ellipse at center */
    background: radial-gradient(#ff0000, #0000ff);

    /* Circle */
    background: radial-gradient(circle, #ff0000, #0000ff);

    /* Position */
    background: radial-gradient(circle at top left, #ff0000, #0000ff);

    /* Size keywords */
    background: radial-gradient(circle closest-side, red, blue);
    background: radial-gradient(circle farthest-corner, red, blue);
}
```

### Conic Gradient

```css
.conic-examples {
    background: conic-gradient(red, yellow, green, blue, red);

    /* Pie chart effect */
    background: conic-gradient(
        red 0deg 90deg,
        blue 90deg 180deg,
        green 180deg 270deg,
        yellow 270deg 360deg
    );
}
```

## Opacity

### Element Opacity

```css
.opacity-examples {
    opacity: 1;     /* Fully visible */
    opacity: 0.5;   /* 50% transparent */
    opacity: 0;     /* Invisible */
}
```

::: tip
`opacity` affects the entire element including children. Use `rgba()` or `hsla()` for background-only transparency.
:::

### Comparison

```css
/* Entire element transparent */
.full-opacity {
    background-color: red;
    opacity: 0.5;
    /* Text is also 50% transparent */
}

/* Only background transparent */
.bg-only {
    background-color: rgba(255, 0, 0, 0.5);
    /* Text remains solid */
}
```

## Color Schemes

### Creating a Palette

```css
:root {
    /* Primary colors */
    --primary: #007bff;
    --primary-dark: #0056b3;
    --primary-light: #66b3ff;

    /* Secondary colors */
    --secondary: #6c757d;
    --secondary-dark: #545b62;

    /* Semantic colors */
    --success: #28a745;
    --warning: #ffc107;
    --danger: #dc3545;
    --info: #17a2b8;

    /* Neutrals */
    --white: #ffffff;
    --gray-100: #f8f9fa;
    --gray-200: #e9ecef;
    --gray-300: #dee2e6;
    --gray-800: #343a40;
    --black: #000000;
}

/* Usage */
.button-primary {
    background-color: var(--primary);
    color: var(--white);
}

.button-primary:hover {
    background-color: var(--primary-dark);
}
```

## Practice Exercise

Create a gradient button with hover effects:

```css
.gradient-button {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px 24px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.gradient-button:hover {
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}
```
