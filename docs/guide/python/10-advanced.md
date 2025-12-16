# Advanced Topics

This lesson covers advanced Python features including decorators, generators, iterators, context managers, and more. These concepts will help you write more elegant and efficient Python code.

::: info What You'll Learn
- Create and use decorators
- Understand generators and iterators
- Work with context managers
- Use type hints effectively
- Apply functional programming concepts
- Understand metaclasses basics
:::

## Decorators

Decorators modify or enhance functions without changing their source code.

```
┌─────────────────────────────────────────────────────────────────┐
│                    How Decorators Work                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   @decorator           Equivalent to:                            │
│   def func():          func = decorator(func)                   │
│       pass                                                       │
│                                                                  │
│   ┌──────────┐     ┌──────────────┐     ┌──────────────┐       │
│   │   func   │ ──► │  decorator   │ ──► │  new func    │       │
│   │ (input)  │     │ (transforms) │     │  (output)    │       │
│   └──────────┘     └──────────────┘     └──────────────┘       │
│                                                                  │
│   The decorator wraps the original function with extra          │
│   functionality (before/after the function runs)                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Basic Decorator

```python
def my_decorator(func):
    """A simple decorator."""
    def wrapper(*args, **kwargs):
        print("Before function call")
        result = func(*args, **kwargs)
        print("After function call")
        return result
    return wrapper

@my_decorator
def say_hello(name):
    print(f"Hello, {name}!")

say_hello("Alice")
# Output:
# Before function call
# Hello, Alice!
# After function call
```

### Preserving Function Metadata

```python
from functools import wraps

def my_decorator(func):
    @wraps(func)  # Preserves original function's metadata
    def wrapper(*args, **kwargs):
        """Wrapper docstring."""
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    """Greet someone."""
    return f"Hello, {name}!"

print(greet.__name__)  # greet (not 'wrapper')
print(greet.__doc__)   # Greet someone.
```

### Decorator with Arguments

```python
from functools import wraps

def repeat(times):
    """Decorator that repeats function execution."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(times=3)
def greet(name):
    print(f"Hello, {name}!")

greet("World")
# Output:
# Hello, World!
# Hello, World!
# Hello, World!
```

### Common Decorator Patterns

```python
from functools import wraps
import time

# Timing decorator
def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

# Logging decorator
def logger(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with {args}, {kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

# Caching decorator (memoization)
def memoize(func):
    cache = {}
    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Retry decorator
def retry(max_attempts=3, exceptions=(Exception,)):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"Attempt {attempt + 1} failed: {e}")
        return wrapper
    return decorator
```

### Class Decorators

```python
from functools import wraps

# Decorator as a class
class CountCalls:
    """Count how many times a function is called."""

    def __init__(self, func):
        wraps(func)(self)
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"Call {self.count} of {self.func.__name__}")
        return self.func(*args, **kwargs)

@CountCalls
def say_hello():
    print("Hello!")

say_hello()  # Call 1 of say_hello
say_hello()  # Call 2 of say_hello
print(say_hello.count)  # 2

# Decorator for classes
def singleton(cls):
    """Make a class a singleton."""
    instances = {}
    @wraps(cls)
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Database:
    def __init__(self):
        print("Creating database connection")

db1 = Database()  # Creating database connection
db2 = Database()  # No output (returns existing instance)
print(db1 is db2)  # True
```

## Generators

Generators produce values one at a time, saving memory for large sequences.

```
┌─────────────────────────────────────────────────────────────────┐
│                Generator vs Regular Function                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Regular Function              Generator Function               │
│   ────────────────              ──────────────────               │
│   def get_numbers():            def get_numbers():               │
│       result = []                   for i in range(1000000):    │
│       for i in range(1000000):          yield i                 │
│           result.append(i)                                       │
│       return result             # Memory: O(1)                   │
│   # Memory: O(n)                # Values produced on demand      │
│   # All values in memory                                         │
│                                                                  │
│   ┌──────┐ return ┌─────────────┐                               │
│   │ func │ ─────► │ [0,1,2,...] │   Full list in memory         │
│   └──────┘        └─────────────┘                               │
│                                                                  │
│   ┌───────┐ yield  ┌───┐                                        │
│   │ gen   │ ─────► │ 0 │ ─► │ 1 │ ─► │ 2 │ ─► ...              │
│   └───────┘        └───┘                                        │
│              One value at a time                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Creating Generators

```python
# Generator function
def count_up_to(n):
    """Generate numbers from 1 to n."""
    i = 1
    while i <= n:
        yield i
        i += 1

# Using the generator
gen = count_up_to(5)
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3

for num in count_up_to(5):
    print(num)  # 1, 2, 3, 4, 5

# Generator expression
squares = (x**2 for x in range(10))
print(list(squares))  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
```

### Generator Methods

```python
def echo_generator():
    """Generator that receives and echoes values."""
    while True:
        received = yield
        print(f"Received: {received}")

gen = echo_generator()
next(gen)  # Prime the generator
gen.send("Hello")  # Received: Hello
gen.send("World")  # Received: World

# Generator with return value
def accumulator():
    total = 0
    while True:
        value = yield total
        if value is None:
            return total
        total += value

gen = accumulator()
next(gen)           # 0
gen.send(10)        # 10
gen.send(20)        # 30
try:
    gen.send(None)
except StopIteration as e:
    print(f"Final: {e.value}")  # Final: 30
```

### yield from

```python
def flatten(nested_list):
    """Flatten a nested list."""
    for item in nested_list:
        if isinstance(item, list):
            yield from flatten(item)  # Delegate to nested generator
        else:
            yield item

nested = [1, [2, 3, [4, 5]], 6, [7, 8]]
print(list(flatten(nested)))  # [1, 2, 3, 4, 5, 6, 7, 8]

# Chain generators
def chain(*generators):
    for gen in generators:
        yield from gen

gen1 = (x for x in range(3))
gen2 = (x for x in range(3, 6))
print(list(chain(gen1, gen2)))  # [0, 1, 2, 3, 4, 5]
```

### Practical Generator Examples

```python
# Read large file line by line
def read_large_file(file_path):
    """Memory-efficient file reading."""
    with open(file_path, 'r') as f:
        for line in f:
            yield line.strip()

# Infinite sequence
def fibonacci():
    """Generate infinite Fibonacci sequence."""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Take first n items
from itertools import islice
fib = fibonacci()
first_10 = list(islice(fib, 10))
print(first_10)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Pipeline of generators
def integers():
    i = 1
    while True:
        yield i
        i += 1

def squares(nums):
    for n in nums:
        yield n ** 2

def take(n, iterable):
    for i, item in enumerate(iterable):
        if i >= n:
            return
        yield item

pipeline = take(5, squares(integers()))
print(list(pipeline))  # [1, 4, 9, 16, 25]
```

## Iterators

Iterators are objects that implement `__iter__` and `__next__` methods.

```python
# Custom iterator
class Countdown:
    """Iterator that counts down from n to 0."""

    def __init__(self, start):
        self.start = start

    def __iter__(self):
        self.current = self.start
        return self

    def __next__(self):
        if self.current < 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value


for num in Countdown(5):
    print(num)  # 5, 4, 3, 2, 1, 0

# Iterable vs Iterator
# Iterable: has __iter__ (returns iterator)
# Iterator: has __iter__ and __next__

class Range:
    """Custom range that's iterable but not an iterator."""

    def __init__(self, start, end):
        self.start = start
        self.end = end

    def __iter__(self):
        return RangeIterator(self.start, self.end)


class RangeIterator:
    def __init__(self, start, end):
        self.current = start
        self.end = end

    def __iter__(self):
        return self

    def __next__(self):
        if self.current >= self.end:
            raise StopIteration
        value = self.current
        self.current += 1
        return value
```

## Context Managers

### Creating Context Managers

```python
# Class-based context manager
class Timer:
    """Context manager for timing code blocks."""

    def __enter__(self):
        import time
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end = time.perf_counter()
        self.elapsed = self.end - self.start
        print(f"Elapsed time: {self.elapsed:.4f} seconds")
        return False  # Don't suppress exceptions


with Timer() as t:
    sum(range(1000000))
# Output: Elapsed time: 0.0234 seconds

# Function-based context manager
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.perf_counter()
    yield
    end = time.perf_counter()
    print(f"Elapsed: {end - start:.4f} seconds")

with timer():
    sum(range(1000000))
```

### Advanced Context Managers

```python
from contextlib import contextmanager, ExitStack

# Context manager with cleanup
@contextmanager
def managed_resource(name):
    print(f"Acquiring {name}")
    try:
        yield name
    finally:
        print(f"Releasing {name}")

# Nested context managers
with managed_resource("A") as a, managed_resource("B") as b:
    print(f"Using {a} and {b}")

# Dynamic context manager stacking
@contextmanager
def open_files(filenames):
    """Open multiple files dynamically."""
    with ExitStack() as stack:
        files = [stack.enter_context(open(f)) for f in filenames]
        yield files
```

## Type Hints

```python
from typing import (
    List, Dict, Set, Tuple, Optional, Union,
    Callable, Any, TypeVar, Generic
)

# Basic type hints
def greet(name: str) -> str:
    return f"Hello, {name}!"

# Collection types
def process_items(items: List[int]) -> Dict[str, int]:
    return {"sum": sum(items), "count": len(items)}

# Optional (can be None)
def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)

# Union types
def process(value: Union[int, str]) -> str:
    return str(value)

# Python 3.10+ syntax
def process(value: int | str) -> str:
    return str(value)

# Callable type
def apply(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)

# Generic types
T = TypeVar('T')

def first(items: List[T]) -> Optional[T]:
    return items[0] if items else None

# Generic class
class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: List[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

stack: Stack[int] = Stack()
stack.push(1)
stack.push(2)
```

## Functional Programming

### map, filter, reduce

```python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# map - apply function to each element
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# filter - keep elements that pass test
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4]

# reduce - accumulate to single value
total = reduce(lambda acc, x: acc + x, numbers, 0)
print(total)  # 15

# Prefer comprehensions for simple cases
squared = [x**2 for x in numbers]
evens = [x for x in numbers if x % 2 == 0]
```

### partial and other functools

```python
from functools import partial, lru_cache, singledispatch

# partial - fix some arguments
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)
print(square(5))  # 25
print(cube(5))    # 125

# lru_cache - memoization
@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(100))  # Fast!

# singledispatch - function overloading
@singledispatch
def process(arg):
    print(f"Default: {arg}")

@process.register(int)
def _(arg):
    print(f"Integer: {arg}")

@process.register(list)
def _(arg):
    print(f"List with {len(arg)} items")

process("hello")  # Default: hello
process(42)       # Integer: 42
process([1,2,3])  # List with 3 items
```

## Metaclasses

Metaclasses are classes of classes - they define how classes behave.

```python
# Simple metaclass
class Meta(type):
    """A simple metaclass."""

    def __new__(mcs, name, bases, namespace):
        print(f"Creating class: {name}")
        return super().__new__(mcs, name, bases, namespace)


class MyClass(metaclass=Meta):
    pass
# Output: Creating class: MyClass

# Practical metaclass: Singleton
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]


class Database(metaclass=SingletonMeta):
    def __init__(self):
        print("Initializing database")


db1 = Database()  # Initializing database
db2 = Database()  # No output
print(db1 is db2)  # True

# Metaclass for validation
class ValidatedMeta(type):
    def __new__(mcs, name, bases, namespace):
        # Ensure all methods have docstrings
        for key, value in namespace.items():
            if callable(value) and not key.startswith('_'):
                if not value.__doc__:
                    raise TypeError(f"Method {key} must have a docstring")
        return super().__new__(mcs, name, bases, namespace)
```

## Exercises

### Exercise 1: Create a Caching Decorator

Create a decorator that caches results with a time-based expiration.

::: details Solution
```python
from functools import wraps
import time

def timed_cache(seconds=60):
    """Cache results for specified duration."""
    def decorator(func):
        cache = {}

        @wraps(func)
        def wrapper(*args, **kwargs):
            key = (args, tuple(sorted(kwargs.items())))
            now = time.time()

            if key in cache:
                result, timestamp = cache[key]
                if now - timestamp < seconds:
                    print(f"Cache hit for {func.__name__}")
                    return result

            print(f"Cache miss for {func.__name__}")
            result = func(*args, **kwargs)
            cache[key] = (result, now)
            return result

        wrapper.cache_clear = lambda: cache.clear()
        return wrapper
    return decorator

@timed_cache(seconds=5)
def expensive_computation(n):
    """Simulate expensive computation."""
    time.sleep(1)
    return n ** 2

print(expensive_computation(5))  # Cache miss, takes 1 second
print(expensive_computation(5))  # Cache hit, instant
time.sleep(6)
print(expensive_computation(5))  # Cache miss (expired)
```
:::

### Exercise 2: Create a Pipeline Generator

Create a data processing pipeline using generators.

::: details Solution
```python
def read_data(filename):
    """Read lines from file."""
    with open(filename, 'r') as f:
        for line in f:
            yield line.strip()

def filter_lines(lines, predicate):
    """Filter lines based on predicate."""
    for line in lines:
        if predicate(line):
            yield line

def transform_lines(lines, transformer):
    """Transform each line."""
    for line in lines:
        yield transformer(line)

def batch_lines(lines, batch_size):
    """Group lines into batches."""
    batch = []
    for line in lines:
        batch.append(line)
        if len(batch) == batch_size:
            yield batch
            batch = []
    if batch:
        yield batch

class Pipeline:
    """Composable data pipeline."""

    def __init__(self, source):
        self.source = source

    def filter(self, predicate):
        self.source = filter_lines(self.source, predicate)
        return self

    def map(self, transformer):
        self.source = transform_lines(self.source, transformer)
        return self

    def batch(self, size):
        self.source = batch_lines(self.source, size)
        return self

    def __iter__(self):
        return iter(self.source)


# Usage example
def sample_data():
    data = ["1,Alice,25", "2,Bob,30", "3,Charlie,35", "4,David,40"]
    for line in data:
        yield line

result = (Pipeline(sample_data())
    .filter(lambda x: int(x.split(',')[2]) > 28)
    .map(lambda x: x.upper())
    .batch(2))

for batch in result:
    print(batch)
```
:::

### Exercise 3: Create a Validated Class

Create a class with automatic attribute validation using descriptors.

::: details Solution
```python
class Validator:
    """Base descriptor for validation."""

    def __set_name__(self, owner, name):
        self.name = name
        self.private_name = f'_{name}'

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return getattr(obj, self.private_name, None)

    def __set__(self, obj, value):
        self.validate(value)
        setattr(obj, self.private_name, value)

    def validate(self, value):
        pass  # Override in subclasses


class String(Validator):
    def __init__(self, min_length=0, max_length=None):
        self.min_length = min_length
        self.max_length = max_length

    def validate(self, value):
        if not isinstance(value, str):
            raise TypeError(f"{self.name} must be a string")
        if len(value) < self.min_length:
            raise ValueError(f"{self.name} must be at least {self.min_length} chars")
        if self.max_length and len(value) > self.max_length:
            raise ValueError(f"{self.name} must be at most {self.max_length} chars")


class Number(Validator):
    def __init__(self, min_value=None, max_value=None):
        self.min_value = min_value
        self.max_value = max_value

    def validate(self, value):
        if not isinstance(value, (int, float)):
            raise TypeError(f"{self.name} must be a number")
        if self.min_value is not None and value < self.min_value:
            raise ValueError(f"{self.name} must be >= {self.min_value}")
        if self.max_value is not None and value > self.max_value:
            raise ValueError(f"{self.name} must be <= {self.max_value}")


class Person:
    name = String(min_length=1, max_length=50)
    age = Number(min_value=0, max_value=150)
    email = String(min_length=5)

    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email


# Test
try:
    person = Person("Alice", 25, "alice@email.com")
    print(f"{person.name}, {person.age}")

    person.age = -5  # Raises ValueError
except ValueError as e:
    print(f"Validation error: {e}")
```
:::

## Quick Reference

::: tip Advanced Python Cheat Sheet
```python
# Decorator
def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

# Decorator with args
def decorator(arg):
    def inner(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            return func(*args, **kwargs)
        return wrapper
    return inner

# Generator
def generator():
    yield value
    yield from other_generator()

# Generator expression
gen = (x**2 for x in range(10))

# Context manager
@contextmanager
def context():
    # setup
    yield resource
    # cleanup

# Type hints
def func(x: int) -> str:
    return str(x)

# functools
from functools import lru_cache, partial
```
:::

## Summary

| Concept | Description | Use Case |
|---------|-------------|----------|
| Decorators | Modify functions | Logging, timing, caching |
| Generators | Lazy iteration | Memory-efficient processing |
| Iterators | Custom iteration | Custom sequences |
| Context Managers | Resource management | File handling, connections |
| Type Hints | Static typing | Documentation, IDE support |
| Metaclasses | Class factories | Frameworks, validation |

## Congratulations!

You've completed the Python tutorial! You now have a solid foundation in Python programming, from basics to advanced topics. Keep practicing and building projects to reinforce your learning.

### Next Steps
- Build projects to practice
- Explore Python frameworks (Django, Flask, FastAPI)
- Learn about testing with pytest
- Explore data science libraries (NumPy, Pandas)
- Contribute to open source projects

### Resources
- [Python Official Documentation](https://docs.python.org/3/)
- [Real Python Tutorials](https://realpython.com/)
- [Python Package Index (PyPI)](https://pypi.org/)
