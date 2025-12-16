# Data Structures

Python provides powerful built-in data structures for storing and organizing collections of data. This lesson covers lists, tuples, dictionaries, and sets.

::: info What You'll Learn
- Create and manipulate lists
- Understand tuples and their use cases
- Work with dictionaries (key-value pairs)
- Use sets for unique collections
- Choose the right data structure for your needs
:::

## Overview of Data Structures

```
┌─────────────────────────────────────────────────────────────────┐
│                 Python Data Structures                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   LIST []              TUPLE ()             DICT {}              │
│   ────────             ────────             ────────             │
│   Ordered              Ordered              Key-Value            │
│   Mutable              Immutable            Mutable              │
│   Duplicates OK        Duplicates OK        Unique keys          │
│                                                                  │
│   [1, 2, 3]            (1, 2, 3)            {"a": 1, "b": 2}     │
│                                                                  │
│   SET {}                                                         │
│   ────────                                                       │
│   Unordered                                                      │
│   Mutable                                                        │
│   No duplicates                                                  │
│                                                                  │
│   {1, 2, 3}                                                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

| Feature | List | Tuple | Dict | Set |
|---------|------|-------|------|-----|
| Syntax | `[]` | `()` | `{k:v}` | `{}` |
| Ordered | Yes | Yes | Yes (3.7+) | No |
| Mutable | Yes | No | Yes | Yes |
| Duplicates | Yes | Yes | Keys: No | No |
| Indexable | Yes | Yes | By key | No |

## Lists

Lists are ordered, mutable collections that can contain any type of data.

### Creating Lists

```python
# Empty list
empty = []
empty = list()

# List with values
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", 3.14, True, None]

# Nested lists
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# List from other iterables
chars = list("hello")      # ['h', 'e', 'l', 'l', 'o']
nums = list(range(5))      # [0, 1, 2, 3, 4]
```

### Accessing Elements

```
┌─────────────────────────────────────────────────────────────────┐
│                    List Indexing                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   fruits = ["apple", "banana", "cherry", "date", "elderberry"]  │
│                                                                  │
│   Positive index:   0        1         2        3         4     │
│                     ↓        ↓         ↓        ↓         ↓     │
│                  [apple] [banana] [cherry]  [date] [elderberry] │
│                     ↑        ↑         ↑        ↑         ↑     │
│   Negative index:  -5       -4        -3       -2        -1     │
│                                                                  │
│   fruits[0]  → "apple"      (first element)                     │
│   fruits[-1] → "elderberry" (last element)                      │
│   fruits[2]  → "cherry"     (third element)                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

```python
fruits = ["apple", "banana", "cherry", "date"]

# Accessing by index
print(fruits[0])    # apple
print(fruits[-1])   # date
print(fruits[-2])   # cherry

# Slicing [start:end:step]
print(fruits[1:3])    # ['banana', 'cherry']
print(fruits[:2])     # ['apple', 'banana']
print(fruits[2:])     # ['cherry', 'date']
print(fruits[::2])    # ['apple', 'cherry']
print(fruits[::-1])   # ['date', 'cherry', 'banana', 'apple']

# Nested list access
matrix = [[1, 2], [3, 4], [5, 6]]
print(matrix[0])      # [1, 2]
print(matrix[0][1])   # 2
print(matrix[1][0])   # 3
```

### Modifying Lists

```python
fruits = ["apple", "banana", "cherry"]

# Change element
fruits[1] = "blueberry"
print(fruits)  # ['apple', 'blueberry', 'cherry']

# Add elements
fruits.append("date")           # Add to end
fruits.insert(1, "apricot")     # Insert at position
fruits.extend(["fig", "grape"]) # Add multiple

# Remove elements
fruits.remove("apple")   # Remove by value
popped = fruits.pop()    # Remove and return last
popped = fruits.pop(0)   # Remove and return at index
del fruits[0]            # Delete by index
fruits.clear()           # Remove all

# Replace slice
nums = [1, 2, 3, 4, 5]
nums[1:4] = [20, 30]     # [1, 20, 30, 5]
```

### List Methods

| Method | Description | Example |
|--------|-------------|---------|
| `append(x)` | Add item to end | `list.append(4)` |
| `extend(iter)` | Add all items from iterable | `list.extend([4,5])` |
| `insert(i, x)` | Insert at position | `list.insert(0, 'a')` |
| `remove(x)` | Remove first occurrence | `list.remove('a')` |
| `pop([i])` | Remove and return item | `list.pop()` |
| `clear()` | Remove all items | `list.clear()` |
| `index(x)` | Find index of item | `list.index('a')` |
| `count(x)` | Count occurrences | `list.count('a')` |
| `sort()` | Sort in place | `list.sort()` |
| `reverse()` | Reverse in place | `list.reverse()` |
| `copy()` | Shallow copy | `list.copy()` |

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Sorting
numbers.sort()              # [1, 1, 2, 3, 4, 5, 6, 9]
numbers.sort(reverse=True)  # [9, 6, 5, 4, 3, 2, 1, 1]

# Custom sort
words = ["banana", "pie", "apple", "cherry"]
words.sort(key=len)         # ['pie', 'apple', 'banana', 'cherry']

# Count and index
numbers = [1, 2, 2, 3, 2, 4]
print(numbers.count(2))     # 3
print(numbers.index(2))     # 1 (first occurrence)
```

### List Comprehensions

```python
# Basic comprehension
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# With condition
evens = [x for x in range(20) if x % 2 == 0]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# With transformation
words = ["hello", "world", "python"]
upper = [w.upper() for w in words]
# ['HELLO', 'WORLD', 'PYTHON']

# Nested comprehension
matrix = [[i*j for j in range(1, 4)] for i in range(1, 4)]
# [[1, 2, 3], [2, 4, 6], [3, 6, 9]]

# Flatten nested list
nested = [[1, 2], [3, 4], [5, 6]]
flat = [item for sublist in nested for item in sublist]
# [1, 2, 3, 4, 5, 6]
```

## Tuples

Tuples are ordered, immutable collections. Once created, they cannot be modified.

### Creating Tuples

```python
# Empty tuple
empty = ()
empty = tuple()

# Tuple with values
point = (3, 4)
rgb = (255, 128, 0)
single = (42,)  # Note the comma for single-element tuple!

# Tuple packing
coordinates = 10, 20, 30  # Parentheses optional

# From other iterables
chars = tuple("hello")  # ('h', 'e', 'l', 'l', 'o')
```

### Working with Tuples

```python
# Accessing (same as lists)
point = (10, 20, 30)
print(point[0])    # 10
print(point[-1])   # 30
print(point[1:])   # (20, 30)

# Tuple unpacking
x, y, z = point
print(x, y, z)     # 10 20 30

# Extended unpacking
first, *rest = (1, 2, 3, 4, 5)
print(first)       # 1
print(rest)        # [2, 3, 4, 5]

# Swap variables
a, b = 10, 20
a, b = b, a        # a=20, b=10

# Tuples are immutable!
point = (10, 20)
# point[0] = 15    # TypeError!
```

### Why Use Tuples?

```
┌─────────────────────────────────────────────────────────────────┐
│                    Tuples vs Lists                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Use TUPLES when:                Use LISTS when:                │
│   ─────────────────              ──────────────────              │
│   • Data shouldn't change        • Data needs to change         │
│   • Dictionary keys              • Dynamic collection           │
│   • Function return values       • Need append/remove           │
│   • Heterogeneous data           • Homogeneous collection       │
│   • Performance matters          • Order manipulation           │
│                                                                  │
│   Examples:                      Examples:                       │
│   • Coordinates (x, y)           • Shopping cart items          │
│   • RGB colors (r, g, b)         • User list                    │
│   • Database records             • Task queue                   │
│   • Function arguments           • Search results               │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

```python
# Tuples as dictionary keys (lists cannot be!)
locations = {
    (40.7128, -74.0060): "New York",
    (34.0522, -118.2437): "Los Angeles",
    (51.5074, -0.1278): "London"
}

# Named tuples for clarity
from collections import namedtuple

Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x, p.y)    # 10 20
print(p[0], p[1])  # 10 20 (still indexable)
```

## Dictionaries

Dictionaries store key-value pairs, providing fast lookup by key.

### Creating Dictionaries

```python
# Empty dictionary
empty = {}
empty = dict()

# Dictionary with values
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

# From list of tuples
items = dict([("a", 1), ("b", 2), ("c", 3)])

# Using dict()
person = dict(name="Alice", age=25, city="NYC")

# Dictionary comprehension
squares = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

### Accessing Values

```python
person = {"name": "Alice", "age": 25, "city": "NYC"}

# Access by key
print(person["name"])     # Alice
# print(person["email"])  # KeyError!

# Safe access with get()
print(person.get("name"))         # Alice
print(person.get("email"))        # None
print(person.get("email", "N/A")) # N/A (default)

# Check if key exists
if "name" in person:
    print("Name exists!")

# Get all keys, values, items
print(person.keys())    # dict_keys(['name', 'age', 'city'])
print(person.values())  # dict_values(['Alice', 25, 'NYC'])
print(person.items())   # dict_items([('name', 'Alice'), ...])
```

### Modifying Dictionaries

```python
person = {"name": "Alice", "age": 25}

# Add or update
person["email"] = "alice@email.com"  # Add new key
person["age"] = 26                   # Update existing

# Update multiple
person.update({"city": "NYC", "age": 27})

# Remove items
del person["email"]              # Delete key
age = person.pop("age")          # Remove and return
last = person.popitem()          # Remove last item (3.7+)
person.clear()                   # Remove all

# Set default
person.setdefault("country", "USA")  # Add if not exists
```

### Dictionary Methods

| Method | Description | Example |
|--------|-------------|---------|
| `get(key, default)` | Get value safely | `d.get('x', 0)` |
| `keys()` | Get all keys | `d.keys()` |
| `values()` | Get all values | `d.values()` |
| `items()` | Get key-value pairs | `d.items()` |
| `pop(key)` | Remove and return | `d.pop('x')` |
| `update(dict)` | Merge dictionaries | `d.update(d2)` |
| `setdefault(k,v)` | Set if not exists | `d.setdefault('x',0)` |
| `copy()` | Shallow copy | `d.copy()` |
| `clear()` | Remove all | `d.clear()` |

### Iterating Dictionaries

```python
person = {"name": "Alice", "age": 25, "city": "NYC"}

# Iterate keys
for key in person:
    print(key)

# Iterate values
for value in person.values():
    print(value)

# Iterate key-value pairs
for key, value in person.items():
    print(f"{key}: {value}")
```

### Nested Dictionaries

```python
users = {
    "alice": {
        "name": "Alice Smith",
        "age": 25,
        "contacts": {
            "email": "alice@email.com",
            "phone": "555-1234"
        }
    },
    "bob": {
        "name": "Bob Jones",
        "age": 30,
        "contacts": {
            "email": "bob@email.com",
            "phone": "555-5678"
        }
    }
}

# Access nested values
print(users["alice"]["name"])                    # Alice Smith
print(users["alice"]["contacts"]["email"])       # alice@email.com

# Safe nested access
email = users.get("alice", {}).get("contacts", {}).get("email", "N/A")
```

### Dictionary Comprehensions

```python
# Basic comprehension
squares = {x: x**2 for x in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# With condition
even_squares = {x: x**2 for x in range(10) if x % 2 == 0}
# {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# Transform keys and values
words = ["hello", "world", "python"]
lengths = {w: len(w) for w in words}
# {'hello': 5, 'world': 5, 'python': 6}

# Invert dictionary
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
# {1: 'a', 2: 'b', 3: 'c'}
```

## Sets

Sets are unordered collections of unique elements.

### Creating Sets

```python
# Empty set (NOT {} which creates empty dict!)
empty = set()

# Set with values
numbers = {1, 2, 3, 4, 5}
fruits = {"apple", "banana", "cherry"}

# From other iterables
chars = set("hello")  # {'h', 'e', 'l', 'o'}
nums = set([1, 2, 2, 3, 3, 3])  # {1, 2, 3}

# Set comprehension
squares = {x**2 for x in range(10)}
```

### Set Operations

```
┌─────────────────────────────────────────────────────────────────┐
│                    Set Operations                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   A = {1, 2, 3, 4}                                              │
│   B = {3, 4, 5, 6}                                              │
│                                                                  │
│   UNION (A | B)           INTERSECTION (A & B)                  │
│   ┌─────┬─────┬─────┐     ┌─────┬─────┬─────┐                  │
│   │  A  │ A&B │  B  │     │     │ A&B │     │                  │
│   │ 1,2 │ 3,4 │ 5,6 │     │     │ 3,4 │     │                  │
│   └─────┴─────┴─────┘     └─────┴─────┴─────┘                  │
│   Result: {1,2,3,4,5,6}   Result: {3,4}                        │
│                                                                  │
│   DIFFERENCE (A - B)      SYMMETRIC DIFF (A ^ B)                │
│   ┌─────┬─────┬─────┐     ┌─────┬─────┬─────┐                  │
│   │  A  │     │     │     │  A  │     │  B  │                  │
│   │ 1,2 │     │     │     │ 1,2 │     │ 5,6 │                  │
│   └─────┴─────┴─────┘     └─────┴─────┴─────┘                  │
│   Result: {1,2}           Result: {1,2,5,6}                     │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

```python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

# Union - all elements from both
print(A | B)              # {1, 2, 3, 4, 5, 6}
print(A.union(B))

# Intersection - elements in both
print(A & B)              # {3, 4}
print(A.intersection(B))

# Difference - elements in A but not B
print(A - B)              # {1, 2}
print(A.difference(B))

# Symmetric difference - elements in either but not both
print(A ^ B)              # {1, 2, 5, 6}
print(A.symmetric_difference(B))

# Subset and superset
print({1, 2}.issubset({1, 2, 3}))      # True
print({1, 2, 3}.issuperset({1, 2}))    # True
print({1, 2}.isdisjoint({3, 4}))       # True (no common elements)
```

### Modifying Sets

```python
numbers = {1, 2, 3}

# Add elements
numbers.add(4)            # {1, 2, 3, 4}
numbers.update([5, 6])    # {1, 2, 3, 4, 5, 6}

# Remove elements
numbers.remove(6)         # Raises KeyError if not found
numbers.discard(10)       # No error if not found
popped = numbers.pop()    # Remove and return arbitrary element
numbers.clear()           # Remove all
```

### Practical Set Usage

```python
# Remove duplicates from list
items = [1, 2, 2, 3, 3, 3, 4]
unique = list(set(items))  # [1, 2, 3, 4]

# Check membership (fast!)
valid_users = {"alice", "bob", "charlie"}
if "alice" in valid_users:
    print("Valid user")

# Find common elements
list1 = [1, 2, 3, 4, 5]
list2 = [4, 5, 6, 7, 8]
common = set(list1) & set(list2)  # {4, 5}

# Find unique words in text
text = "the quick brown fox jumps over the lazy dog"
unique_words = set(text.split())
print(len(unique_words))  # 8
```

## Choosing the Right Data Structure

```
┌─────────────────────────────────────────────────────────────────┐
│               Choosing a Data Structure                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Need ordered sequence?                                         │
│   ├── Yes: Need to modify?                                       │
│   │   ├── Yes → LIST                                            │
│   │   └── No  → TUPLE                                           │
│   │                                                              │
│   └── No: Need key-value pairs?                                  │
│       ├── Yes → DICTIONARY                                       │
│       └── No: Need unique elements?                              │
│           ├── Yes → SET                                          │
│           └── No  → Consider LIST                                │
│                                                                  │
│   Performance:                                                   │
│   ┌────────────────┬──────────┬──────────┬──────────┬─────────┐ │
│   │ Operation      │ List     │ Dict     │ Set      │ Tuple   │ │
│   ├────────────────┼──────────┼──────────┼──────────┼─────────┤ │
│   │ Access by idx  │ O(1)     │ N/A      │ N/A      │ O(1)    │ │
│   │ Access by key  │ N/A      │ O(1)     │ N/A      │ N/A     │ │
│   │ Search         │ O(n)     │ O(1)     │ O(1)     │ O(n)    │ │
│   │ Insert/Delete  │ O(n)     │ O(1)     │ O(1)     │ N/A     │ │
│   │ Append         │ O(1)     │ O(1)     │ O(1)     │ N/A     │ │
│   └────────────────┴──────────┴──────────┴──────────┴─────────┘ │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Exercises

### Exercise 1: Student Grades

Create a program to manage student grades using dictionaries.

::: details Solution
```python
def grade_manager():
    students = {}

    def add_student(name, grades=None):
        students[name] = grades or []
        return f"Added {name}"

    def add_grade(name, grade):
        if name not in students:
            return f"{name} not found"
        students[name].append(grade)
        return f"Added grade {grade} for {name}"

    def get_average(name):
        if name not in students:
            return f"{name} not found"
        grades = students[name]
        if not grades:
            return f"No grades for {name}"
        return sum(grades) / len(grades)

    def get_class_average():
        all_grades = [g for grades in students.values() for g in grades]
        if not all_grades:
            return 0
        return sum(all_grades) / len(all_grades)

    return add_student, add_grade, get_average, get_class_average

# Test
add_student, add_grade, get_average, get_class_average = grade_manager()
add_student("Alice", [85, 90, 92])
add_student("Bob", [78, 82, 88])
add_grade("Alice", 95)

print(f"Alice's average: {get_average('Alice'):.2f}")  # 90.50
print(f"Class average: {get_class_average():.2f}")    # 85.71
```
:::

### Exercise 2: Word Frequency

Count word frequency in a text using dictionaries.

::: details Solution
```python
def word_frequency(text):
    """Count frequency of each word in text"""
    # Clean and split text
    words = text.lower().split()

    # Remove punctuation
    import string
    words = [w.strip(string.punctuation) for w in words]

    # Count frequencies
    freq = {}
    for word in words:
        freq[word] = freq.get(word, 0) + 1

    # Sort by frequency
    sorted_freq = sorted(freq.items(), key=lambda x: x[1], reverse=True)

    return dict(sorted_freq)

# Test
text = """Python is amazing. Python is powerful.
          Python is the best programming language.
          I love Python programming."""

freq = word_frequency(text)
for word, count in list(freq.items())[:5]:
    print(f"{word}: {count}")
```
:::

### Exercise 3: Set Operations

Find unique and common elements between lists.

::: details Solution
```python
def analyze_lists(list1, list2):
    """Analyze two lists using set operations"""
    set1 = set(list1)
    set2 = set(list2)

    return {
        "unique_to_first": set1 - set2,
        "unique_to_second": set2 - set1,
        "common": set1 & set2,
        "all_unique": set1 | set2,
        "in_one_only": set1 ^ set2
    }

# Test
programming = ["Python", "Java", "JavaScript", "C++", "Go"]
data_science = ["Python", "R", "Julia", "SQL", "Java"]

result = analyze_lists(programming, data_science)
for key, value in result.items():
    print(f"{key}: {value}")
```
:::

## Quick Reference

::: tip Data Structures Cheat Sheet
```python
# LIST - ordered, mutable
lst = [1, 2, 3]
lst.append(4)          # Add to end
lst.insert(0, 0)       # Insert at index
lst.pop()              # Remove last
lst[0]                 # Access by index
lst[1:3]               # Slice

# TUPLE - ordered, immutable
tpl = (1, 2, 3)
x, y, z = tpl          # Unpacking
tpl[0]                 # Access by index

# DICTIONARY - key-value pairs
dct = {"a": 1, "b": 2}
dct["c"] = 3           # Add/update
dct.get("x", 0)        # Safe access
del dct["a"]           # Delete key
for k, v in dct.items(): pass

# SET - unique elements
st = {1, 2, 3}
st.add(4)              # Add element
st.remove(1)           # Remove element
st1 | st2              # Union
st1 & st2              # Intersection
st1 - st2              # Difference
```
:::

## Summary

| Structure | Ordered | Mutable | Duplicates | Use Case |
|-----------|---------|---------|------------|----------|
| List | Yes | Yes | Yes | General collection |
| Tuple | Yes | No | Yes | Fixed data, dict keys |
| Dict | Yes* | Yes | No (keys) | Key-value lookup |
| Set | No | Yes | No | Unique items, membership |

*Python 3.7+ maintains insertion order

## Next Steps

Continue to [Strings](/guide/python/05-strings) to learn about string manipulation in Python.
