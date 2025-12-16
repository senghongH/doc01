# Strings

Strings are sequences of characters used to store and manipulate text. Python provides powerful tools for working with strings.

::: info What You'll Learn
- Create and format strings
- Access and slice string characters
- Use string methods for manipulation
- Format output with f-strings
- Work with regular expressions basics
:::

## Creating Strings

```python
# Single and double quotes
single = 'Hello, World!'
double = "Hello, World!"

# Multi-line strings
multi = """This is a
multi-line
string"""

multi2 = '''Also works
with single
quotes'''

# Raw strings (ignore escape sequences)
path = r"C:\Users\name\Documents"
regex = r"\d+\.\d+"

# Escape sequences
newline = "Line 1\nLine 2"
tab = "Column1\tColumn2"
quote = "He said \"Hello\""
backslash = "Path\\to\\file"
```

```
┌─────────────────────────────────────────────────────────────────┐
│                    Common Escape Sequences                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Sequence    Description         Example                        │
│   ────────    ───────────         ───────                        │
│   \n          Newline             "Line1\nLine2"                 │
│   \t          Tab                 "Col1\tCol2"                   │
│   \\          Backslash           "C:\\path"                     │
│   \'          Single quote        'It\'s'                        │
│   \"          Double quote        "Say \"Hi\""                   │
│   \r          Carriage return     "Text\rNew"                    │
│   \b          Backspace           "AB\bC" → "AC"                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## String Indexing and Slicing

```
┌─────────────────────────────────────────────────────────────────┐
│                    String Indexing                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   text = "Python"                                                │
│                                                                  │
│   Index:     0     1     2     3     4     5                    │
│              │     │     │     │     │     │                    │
│            ┌───┬───┬───┬───┬───┬───┐                           │
│            │ P │ y │ t │ h │ o │ n │                           │
│            └───┴───┴───┴───┴───┴───┘                           │
│              │     │     │     │     │     │                    │
│   Negative: -6    -5    -4    -3    -2    -1                    │
│                                                                  │
│   text[0]  → 'P'      text[-1] → 'n'                            │
│   text[1]  → 'y'      text[-2] → 'o'                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

```python
text = "Python Programming"

# Single character access
print(text[0])      # P
print(text[-1])     # g
print(text[7])      # P

# Slicing [start:end:step]
print(text[0:6])    # Python
print(text[:6])     # Python (start defaults to 0)
print(text[7:])     # Programming (end defaults to len)
print(text[::2])    # Pto rgamn (every 2nd char)
print(text[::-1])   # gnimmargorP nohtyP (reversed)

# Strings are immutable!
# text[0] = 'J'  # TypeError!
```

## String Methods

### Case Methods

```python
text = "Hello, World!"

print(text.upper())       # HELLO, WORLD!
print(text.lower())       # hello, world!
print(text.capitalize())  # Hello, world!
print(text.title())       # Hello, World!
print(text.swapcase())    # hELLO, wORLD!

# Case checking
print("HELLO".isupper())  # True
print("hello".islower())  # True
print("Title".istitle())  # True
```

### Search and Find

```python
text = "Hello, World! Hello, Python!"

# Find position (returns -1 if not found)
print(text.find("Hello"))      # 0
print(text.find("Python"))     # 21
print(text.find("Java"))       # -1
print(text.rfind("Hello"))     # 14 (from right)

# Index (raises ValueError if not found)
print(text.index("World"))     # 7
# print(text.index("Java"))    # ValueError!

# Count occurrences
print(text.count("Hello"))     # 2
print(text.count("o"))         # 4

# Check content
print(text.startswith("Hello"))  # True
print(text.endswith("!"))        # True
print("Python" in text)          # True
```

### Modification Methods

```python
text = "  Hello, World!  "

# Strip whitespace
print(text.strip())        # "Hello, World!"
print(text.lstrip())       # "Hello, World!  "
print(text.rstrip())       # "  Hello, World!"

# Strip specific characters
print("...Hello...".strip("."))  # "Hello"

# Replace
msg = "Hello, World!"
print(msg.replace("World", "Python"))  # Hello, Python!
print(msg.replace("l", "L", 1))        # HeLlo, World! (limit to 1)

# Split and join
csv = "apple,banana,cherry"
fruits = csv.split(",")        # ['apple', 'banana', 'cherry']
print("-".join(fruits))        # apple-banana-cherry

words = "Hello World Python"
print(words.split())           # ['Hello', 'World', 'Python']
print(words.split(" ", 1))     # ['Hello', 'World Python']

# Lines
multiline = "Line 1\nLine 2\nLine 3"
lines = multiline.splitlines()  # ['Line 1', 'Line 2', 'Line 3']
```

### Padding and Alignment

```python
text = "Python"

# Padding
print(text.center(20))      # "       Python       "
print(text.center(20, "-")) # "-------Python-------"
print(text.ljust(20))       # "Python              "
print(text.rjust(20))       # "              Python"
print(text.zfill(10))       # "0000Python"

# Number padding
num = "42"
print(num.zfill(5))         # "00042"
```

### Validation Methods

```python
# Check string content
print("Hello".isalpha())      # True (only letters)
print("123".isdigit())        # True (only digits)
print("Hello123".isalnum())   # True (letters or digits)
print("   ".isspace())        # True (only whitespace)
print("hello".islower())      # True
print("HELLO".isupper())      # True
print("Hello World".istitle())  # True

# Numeric strings
print("123".isnumeric())      # True
print("123.45".isnumeric())   # False (has decimal)
print("-123".isnumeric())     # False (has minus)

# Check if valid identifier
print("variable_name".isidentifier())  # True
print("2variable".isidentifier())      # False
```

### String Methods Reference

| Method | Description | Example |
|--------|-------------|---------|
| `upper()` | Convert to uppercase | `"hi".upper()` → `"HI"` |
| `lower()` | Convert to lowercase | `"HI".lower()` → `"hi"` |
| `strip()` | Remove whitespace | `" hi ".strip()` → `"hi"` |
| `split()` | Split into list | `"a,b".split(",")` → `['a','b']` |
| `join()` | Join iterable | `"-".join(['a','b'])` → `"a-b"` |
| `replace()` | Replace substring | `"hi".replace("i","o")` → `"ho"` |
| `find()` | Find position | `"hello".find("l")` → `2` |
| `count()` | Count occurrences | `"hello".count("l")` → `2` |
| `startswith()` | Check prefix | `"hi".startswith("h")` → `True` |
| `endswith()` | Check suffix | `"hi".endswith("i")` → `True` |

## String Formatting

### f-strings (Recommended)

```python
name = "Alice"
age = 25
price = 19.99

# Basic f-string
print(f"Hello, {name}!")           # Hello, Alice!
print(f"{name} is {age} years old") # Alice is 25 years old

# Expressions in f-strings
print(f"2 + 2 = {2 + 2}")          # 2 + 2 = 4
print(f"Next year: {age + 1}")     # Next year: 26

# Method calls
print(f"Name: {name.upper()}")     # Name: ALICE

# Format specifiers
print(f"Price: ${price:.2f}")      # Price: $19.99
print(f"Number: {42:05d}")         # Number: 00042
print(f"Binary: {10:b}")           # Binary: 1010
print(f"Hex: {255:x}")             # Hex: ff

# Alignment
print(f"{'left':<10}")             # "left      "
print(f"{'right':>10}")            # "     right"
print(f"{'center':^10}")           # "  center  "

# Thousand separators
print(f"{1000000:,}")              # 1,000,000
print(f"{1000000:_}")              # 1_000_000
```

### Format Specifiers

```
┌─────────────────────────────────────────────────────────────────┐
│                    Format Specifier Syntax                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   {value:[[fill]align][sign][#][0][width][,][.precision][type]} │
│                                                                  │
│   Examples:                                                      │
│   {x:10}      → width 10                                        │
│   {x:>10}     → right align, width 10                           │
│   {x:0>10}    → right align, fill with 0, width 10              │
│   {x:,.2f}    → comma separator, 2 decimal float                │
│   {x:+.2f}    → always show sign, 2 decimal float               │
│                                                                  │
│   Type codes:                                                    │
│   d = integer        s = string       b = binary                │
│   f = float          e = scientific   x = hex                   │
│   % = percentage     c = character                              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

```python
# Number formatting
num = 42
pi = 3.14159

print(f"{num:d}")         # 42 (integer)
print(f"{num:5d}")        # "   42" (width 5)
print(f"{num:05d}")       # "00042" (zero-padded)
print(f"{num:+d}")        # +42 (show sign)

print(f"{pi:f}")          # 3.141590
print(f"{pi:.2f}")        # 3.14 (2 decimals)
print(f"{pi:10.2f}")      # "      3.14" (width 10, 2 decimals)

print(f"{0.75:.0%}")      # 75% (percentage)
print(f"{0.75:.2%}")      # 75.00%

print(f"{255:x}")         # ff (hexadecimal)
print(f"{255:X}")         # FF (uppercase hex)
print(f"{255:b}")         # 11111111 (binary)
print(f"{255:o}")         # 377 (octal)
```

### Other Formatting Methods

```python
# .format() method
print("Hello, {}!".format("World"))
print("{0} and {1}".format("spam", "eggs"))
print("{name} is {age}".format(name="Alice", age=25))

# % operator (old style)
print("Hello, %s!" % "World")
print("%s is %d years old" % ("Alice", 25))
print("Pi is %.2f" % 3.14159)

# Template strings
from string import Template
t = Template("$name is $age years old")
print(t.substitute(name="Alice", age=25))
```

## String Operations

### Concatenation and Repetition

```python
# Concatenation
first = "Hello"
second = "World"
combined = first + " " + second  # "Hello World"

# Repetition
line = "-" * 20    # "--------------------"
pattern = "ab" * 3  # "ababab"

# Building strings efficiently
parts = ["Hello", "World", "Python"]
result = " ".join(parts)  # "Hello World Python"

# Don't do this (inefficient):
s = ""
for word in parts:
    s += word + " "  # Creates new string each time!
```

### String Testing

```python
text = "Hello, World!"

# Length
print(len(text))              # 13

# Membership
print("World" in text)        # True
print("Python" not in text)   # True

# Comparison
print("apple" < "banana")     # True (alphabetical)
print("Apple" < "apple")      # True (uppercase first)
print("10" < "9")             # True (string comparison!)
print(int("10") < int("9"))   # False (numeric comparison)
```

## Working with Characters

```python
# Character code
print(ord('A'))        # 65
print(ord('a'))        # 97
print(ord('0'))        # 48

# Code to character
print(chr(65))         # 'A'
print(chr(97))         # 'a'
print(chr(9829))       # '♥'

# ASCII table range
for i in range(65, 91):
    print(chr(i), end=" ")  # A B C ... Z

# Unicode characters
print('\u00e9')        # é
print('\U0001F600')    # 😀
print('\N{SNOWMAN}')   # ☃
```

## Regular Expressions Basics

```python
import re

text = "Contact: john@email.com or jane@email.com"

# Search for pattern
match = re.search(r'\w+@\w+\.\w+', text)
if match:
    print(match.group())  # john@email.com

# Find all matches
emails = re.findall(r'\w+@\w+\.\w+', text)
print(emails)  # ['john@email.com', 'jane@email.com']

# Replace pattern
cleaned = re.sub(r'\w+@\w+\.\w+', '[EMAIL]', text)
print(cleaned)  # Contact: [EMAIL] or [EMAIL]

# Split by pattern
parts = re.split(r'[,;]\s*', "apple, banana; cherry")
print(parts)  # ['apple', 'banana', 'cherry']

# Common patterns
patterns = {
    r'\d+': 'One or more digits',
    r'\w+': 'One or more word characters',
    r'\s+': 'One or more whitespace',
    r'^...': 'Start of string',
    r'...$': 'End of string',
    r'[a-z]+': 'One or more lowercase letters',
    r'[A-Z]+': 'One or more uppercase letters',
}
```

## Exercises

### Exercise 1: Text Analyzer

Create a function that analyzes text statistics.

::: details Solution
```python
def analyze_text(text):
    """Analyze text and return statistics"""
    words = text.split()
    sentences = text.count('.') + text.count('!') + text.count('?')

    # Clean words for analysis
    clean_words = [w.strip('.,!?;:').lower() for w in words]

    return {
        "character_count": len(text),
        "word_count": len(words),
        "sentence_count": max(sentences, 1),
        "average_word_length": round(
            sum(len(w) for w in clean_words) / len(clean_words), 2
        ) if clean_words else 0,
        "unique_words": len(set(clean_words)),
        "longest_word": max(clean_words, key=len) if clean_words else "",
        "most_common": max(set(clean_words), key=clean_words.count) if clean_words else ""
    }

# Test
text = """Python is an amazing programming language.
Python is easy to learn. Many developers love Python!"""

stats = analyze_text(text)
for key, value in stats.items():
    print(f"{key}: {value}")
```
:::

### Exercise 2: String Formatter

Create a function that formats strings in various ways.

::: details Solution
```python
def format_text(text, style):
    """Format text according to style"""
    styles = {
        "upper": text.upper(),
        "lower": text.lower(),
        "title": text.title(),
        "capitalize": text.capitalize(),
        "reverse": text[::-1],
        "snake": text.lower().replace(" ", "_"),
        "kebab": text.lower().replace(" ", "-"),
        "camel": text[0].lower() + text.title().replace(" ", "")[1:],
        "pascal": text.title().replace(" ", ""),
    }

    return styles.get(style, f"Unknown style: {style}")

# Test
text = "hello world python"
for style in ["upper", "lower", "title", "snake", "kebab", "camel", "pascal"]:
    print(f"{style}: {format_text(text, style)}")
```
:::

### Exercise 3: Password Validator

Create a function that validates password strength.

::: details Solution
```python
def validate_password(password):
    """Validate password and return feedback"""
    checks = {
        "length": len(password) >= 8,
        "uppercase": any(c.isupper() for c in password),
        "lowercase": any(c.islower() for c in password),
        "digit": any(c.isdigit() for c in password),
        "special": any(c in "!@#$%^&*()_+-=" for c in password),
    }

    passed = sum(checks.values())
    strength = (
        "Very Weak" if passed <= 1 else
        "Weak" if passed <= 2 else
        "Medium" if passed <= 3 else
        "Strong" if passed <= 4 else
        "Very Strong"
    )

    feedback = []
    if not checks["length"]:
        feedback.append("Use at least 8 characters")
    if not checks["uppercase"]:
        feedback.append("Add uppercase letters")
    if not checks["lowercase"]:
        feedback.append("Add lowercase letters")
    if not checks["digit"]:
        feedback.append("Add numbers")
    if not checks["special"]:
        feedback.append("Add special characters (!@#$%^&*)")

    return {
        "valid": all(checks.values()),
        "strength": strength,
        "score": f"{passed}/5",
        "feedback": feedback
    }

# Test
passwords = ["password", "Password1", "P@ssw0rd!", "abc", "MyS3cur3P@ss!"]
for pwd in passwords:
    result = validate_password(pwd)
    print(f"\n{pwd}:")
    print(f"  Strength: {result['strength']} ({result['score']})")
    if result['feedback']:
        print(f"  Feedback: {', '.join(result['feedback'])}")
```
:::

## Quick Reference

::: tip Strings Cheat Sheet
```python
# Creating strings
s = "Hello"
s = 'Hello'
s = """Multi
line"""
s = r"raw\string"

# Access and slice
s[0]          # First character
s[-1]         # Last character
s[1:4]        # Slice
s[::-1]       # Reverse

# Common methods
s.upper()     # HELLO
s.lower()     # hello
s.strip()     # Remove whitespace
s.split()     # Split to list
"-".join(lst) # Join list
s.replace(old, new)
s.find(sub)   # Find index
s.count(sub)  # Count occurrences
s.startswith(prefix)
s.endswith(suffix)

# Formatting (f-strings)
f"Hello, {name}"
f"{num:05d}"      # Zero-padded
f"{price:.2f}"    # 2 decimals
f"{text:>10}"     # Right align
f"{num:,}"        # Thousands separator

# Checking
s.isalpha()   # Only letters
s.isdigit()   # Only digits
s.isalnum()   # Letters or digits
s.isspace()   # Only whitespace
"sub" in s    # Contains
```
:::

## Summary

| Operation | Method/Syntax | Example |
|-----------|---------------|---------|
| Create | `"text"` or `'text'` | `s = "Hello"` |
| Index | `s[i]` | `s[0]` → first char |
| Slice | `s[start:end]` | `s[1:4]` |
| Length | `len(s)` | `len("Hi")` → 2 |
| Concatenate | `+` | `"a" + "b"` → `"ab"` |
| Repeat | `*` | `"ab" * 3` → `"ababab"` |
| Format | f-string | `f"{name}"` |
| Search | `in`, `find()` | `"a" in s` |
| Replace | `replace()` | `s.replace("a", "b")` |

## Next Steps

Continue to [File I/O](/guide/python/06-file-io) to learn how to read and write files in Python.
