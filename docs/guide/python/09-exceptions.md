# Exception Handling

Exceptions are errors that occur during program execution. Python provides a robust system for handling these errors gracefully, preventing program crashes and providing meaningful feedback.

::: info What You'll Learn
- Understand what exceptions are
- Handle exceptions with try/except
- Use finally and else clauses
- Raise custom exceptions
- Create exception hierarchies
- Best practices for error handling
:::

## What are Exceptions?

```
┌─────────────────────────────────────────────────────────────────┐
│                    Exception Flow                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Normal Execution          With Exception                       │
│   ─────────────────         ──────────────                       │
│                                                                  │
│   def divide(a, b):         def divide(a, b):                   │
│       result = a / b            try:                            │
│       return result                 result = a / b              │
│                                     return result               │
│   divide(10, 0)                 except ZeroDivisionError:       │
│        ↓                            return "Cannot divide by 0" │
│   💥 CRASH!                                                      │
│   ZeroDivisionError         divide(10, 0)                       │
│                                  ↓                               │
│                             "Cannot divide by 0"                │
│                             ✓ Program continues                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Common Built-in Exceptions

| Exception | Description | Example |
|-----------|-------------|---------|
| `ValueError` | Invalid value | `int("abc")` |
| `TypeError` | Wrong type | `"2" + 2` |
| `IndexError` | Index out of range | `list[10]` |
| `KeyError` | Key not in dict | `dict["missing"]` |
| `FileNotFoundError` | File doesn't exist | `open("none.txt")` |
| `ZeroDivisionError` | Division by zero | `1 / 0` |
| `AttributeError` | Missing attribute | `"str".missing()` |
| `ImportError` | Import fails | `import nonexistent` |
| `NameError` | Variable not defined | `print(undefined)` |
| `StopIteration` | Iterator exhausted | `next(empty_iter)` |

```python
# Examples of common exceptions
int("hello")           # ValueError
"2" + 2                # TypeError
[1, 2, 3][10]          # IndexError
{"a": 1}["b"]          # KeyError
1 / 0                  # ZeroDivisionError
open("nonexistent.txt")  # FileNotFoundError
```

## Basic Exception Handling

### try/except

```python
# Basic try/except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catch multiple specific exceptions
try:
    value = int(input("Enter a number: "))
    result = 10 / value
except ValueError:
    print("Please enter a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catch multiple exceptions in one handler
try:
    # Some risky code
    pass
except (ValueError, TypeError) as e:
    print(f"Error: {e}")

# Catch any exception (use sparingly!)
try:
    # Some code
    pass
except Exception as e:
    print(f"An error occurred: {e}")
```

### Accessing Exception Information

```python
try:
    x = 1 / 0
except ZeroDivisionError as e:
    print(f"Error type: {type(e).__name__}")
    print(f"Error message: {e}")
    print(f"Error args: {e.args}")

# Output:
# Error type: ZeroDivisionError
# Error message: division by zero
# Error args: ('division by zero',)

# Getting full traceback
import traceback

try:
    x = 1 / 0
except ZeroDivisionError:
    traceback.print_exc()
    # Or get as string:
    tb_str = traceback.format_exc()
```

### else and finally

```python
def read_file(filename):
    try:
        file = open(filename, "r")
    except FileNotFoundError:
        print(f"File '{filename}' not found")
        return None
    else:
        # Runs only if no exception occurred
        content = file.read()
        print("File read successfully!")
        return content
    finally:
        # Always runs, even if exception occurred
        print("Cleanup: closing resources")
        try:
            file.close()
        except:
            pass

# The flow:
# try → except (if error) → finally
# try → else (if no error) → finally
```

```
┌─────────────────────────────────────────────────────────────────┐
│                try/except/else/finally Flow                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   try:                                                           │
│       risky_operation()                                          │
│           │                                                      │
│           ├── Exception? ──► except:                             │
│           │                      handle_error()                  │
│           │                          │                           │
│           └── No Exception? ──► else:                            │
│                                     success_code()               │
│                                         │                        │
│                                         ▼                        │
│                                     finally:                     │
│                                         cleanup()                │
│                                         │                        │
│                                         ▼                        │
│                                     Continue...                  │
│                                                                  │
│   Note: finally ALWAYS runs (even with return or break)         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### finally Guarantees

```python
def demo_finally():
    try:
        print("In try")
        return "from try"
    finally:
        print("Finally runs!")  # This ALWAYS runs!

result = demo_finally()
# Output:
# In try
# Finally runs!
# result = "from try"

# finally runs even with exceptions
def demo_finally_exception():
    try:
        raise ValueError("error")
    finally:
        print("Finally still runs!")
```

## Raising Exceptions

### raise Statement

```python
# Raise built-in exception
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b

# Raise with custom message
def validate_age(age):
    if age < 0:
        raise ValueError(f"Age cannot be negative: {age}")
    if age > 150:
        raise ValueError(f"Age seems unrealistic: {age}")
    return age

# Re-raise current exception
try:
    value = int("invalid")
except ValueError:
    print("Logging error...")
    raise  # Re-raises the caught exception
```

### Exception Chaining

```python
# Chain exceptions to show cause
def fetch_data(url):
    try:
        # Simulate network error
        raise ConnectionError("Network unavailable")
    except ConnectionError as e:
        raise RuntimeError("Failed to fetch data") from e

try:
    fetch_data("http://example.com")
except RuntimeError as e:
    print(f"Error: {e}")
    print(f"Caused by: {e.__cause__}")

# Suppress original exception
try:
    raise ValueError("original")
except ValueError:
    raise TypeError("new") from None
```

## Custom Exceptions

### Creating Custom Exceptions

```python
# Simple custom exception
class CustomError(Exception):
    """Base exception for our application."""
    pass

# With custom attributes
class ValidationError(Exception):
    """Raised when validation fails."""

    def __init__(self, message, field=None, value=None):
        self.message = message
        self.field = field
        self.value = value
        super().__init__(self.message)

    def __str__(self):
        if self.field:
            return f"{self.field}: {self.message} (got: {self.value})"
        return self.message


# Using custom exception
def validate_email(email):
    if "@" not in email:
        raise ValidationError(
            "Invalid email format",
            field="email",
            value=email
        )
    return email

try:
    validate_email("invalid-email")
except ValidationError as e:
    print(e)  # email: Invalid email format (got: invalid-email)
```

### Exception Hierarchy

```python
# Create exception hierarchy
class AppError(Exception):
    """Base exception for the application."""
    pass

class DatabaseError(AppError):
    """Database-related errors."""
    pass

class ConnectionError(DatabaseError):
    """Database connection errors."""
    pass

class QueryError(DatabaseError):
    """Query execution errors."""
    pass

class ValidationError(AppError):
    """Data validation errors."""
    pass

class AuthenticationError(AppError):
    """Authentication failures."""
    pass


# Catching at different levels
try:
    raise QueryError("Invalid SQL syntax")
except ConnectionError:
    print("Connection issue")
except DatabaseError:
    print("Database issue")  # This catches QueryError
except AppError:
    print("Application error")
```

```
┌─────────────────────────────────────────────────────────────────┐
│                Exception Hierarchy Example                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│                       Exception                                  │
│                           │                                      │
│                       AppError                                   │
│                      /    |    \                                │
│                     /     |     \                               │
│          DatabaseError  ValidationError  AuthenticationError    │
│            /      \                                             │
│           /        \                                            │
│   ConnectionError  QueryError                                    │
│                                                                  │
│   except DatabaseError:  # Catches ConnectionError & QueryError │
│   except AppError:       # Catches all custom exceptions        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Context Managers and Exceptions

### Using with Statement

```python
# with statement handles cleanup automatically
with open("file.txt", "r") as f:
    content = f.read()
# File is closed even if exception occurs

# Multiple context managers
with open("input.txt") as infile, open("output.txt", "w") as outfile:
    outfile.write(infile.read())

# Custom context manager
class ManagedResource:
    def __enter__(self):
        print("Acquiring resource")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Releasing resource")
        if exc_type is not None:
            print(f"Exception occurred: {exc_val}")
        return False  # Don't suppress exceptions

with ManagedResource() as resource:
    print("Using resource")
    # raise ValueError("test")  # Would be handled by __exit__
```

### contextlib Module

```python
from contextlib import contextmanager

@contextmanager
def managed_file(filename, mode):
    """Context manager for file handling."""
    try:
        f = open(filename, mode)
        yield f
    finally:
        f.close()

with managed_file("test.txt", "w") as f:
    f.write("Hello!")

# Suppress specific exceptions
from contextlib import suppress

with suppress(FileNotFoundError):
    os.remove("nonexistent.txt")
# No error raised, continues normally
```

## Best Practices

### Do's and Don'ts

```python
# ❌ DON'T: Catch all exceptions blindly
try:
    do_something()
except:
    pass  # Silently ignoring ALL errors

# ✓ DO: Catch specific exceptions
try:
    do_something()
except ValueError as e:
    logger.error(f"Invalid value: {e}")
    raise

# ❌ DON'T: Use exceptions for flow control
try:
    value = my_dict[key]
except KeyError:
    value = default

# ✓ DO: Use EAFP (Easier to Ask for Forgiveness)
value = my_dict.get(key, default)

# ❌ DON'T: Catch and re-raise without context
try:
    process_data()
except Exception:
    raise Exception("Failed")  # Lost original error

# ✓ DO: Chain exceptions
try:
    process_data()
except Exception as e:
    raise ProcessingError("Failed to process") from e
```

### EAFP vs LBYL

```python
# LBYL: Look Before You Leap
# Check conditions before acting
def get_value_lbyl(dictionary, key):
    if key in dictionary:
        return dictionary[key]
    return None

# EAFP: Easier to Ask for Forgiveness than Permission
# Try the action, handle failure
def get_value_eafp(dictionary, key):
    try:
        return dictionary[key]
    except KeyError:
        return None

# Python generally prefers EAFP
# It's often faster and handles race conditions better
```

### Logging Exceptions

```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def risky_operation():
    try:
        result = 1 / 0
    except ZeroDivisionError:
        logger.exception("Division failed!")  # Logs full traceback
        raise

# Or with more control
try:
    risky_operation()
except Exception as e:
    logger.error(f"Operation failed: {e}", exc_info=True)
```

## Practical Patterns

### Retry Pattern

```python
import time
from functools import wraps

def retry(max_attempts=3, delay=1, exceptions=(Exception,)):
    """Decorator to retry function on failure."""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            last_exception = None
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        print(f"Attempt {attempt + 1} failed, retrying...")
                        time.sleep(delay)
            raise last_exception
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5, exceptions=(ConnectionError,))
def fetch_data(url):
    # Simulate unreliable connection
    import random
    if random.random() < 0.7:
        raise ConnectionError("Network error")
    return "data"
```

### Validation Pattern

```python
class Validator:
    """Collect multiple validation errors."""

    def __init__(self):
        self.errors = []

    def validate_required(self, value, field):
        if not value:
            self.errors.append(f"{field} is required")

    def validate_length(self, value, field, min_len=None, max_len=None):
        if min_len and len(value) < min_len:
            self.errors.append(f"{field} must be at least {min_len} characters")
        if max_len and len(value) > max_len:
            self.errors.append(f"{field} must be at most {max_len} characters")

    def validate_email(self, value, field):
        if "@" not in value:
            self.errors.append(f"{field} is not a valid email")

    def raise_if_errors(self):
        if self.errors:
            raise ValidationError("; ".join(self.errors))


def register_user(username, email, password):
    v = Validator()
    v.validate_required(username, "Username")
    v.validate_length(username, "Username", min_len=3, max_len=20)
    v.validate_required(email, "Email")
    v.validate_email(email, "Email")
    v.validate_required(password, "Password")
    v.validate_length(password, "Password", min_len=8)
    v.raise_if_errors()

    return {"username": username, "email": email}
```

## Exercises

### Exercise 1: Safe Calculator

Create a calculator that handles all errors gracefully.

::: details Solution
```python
class CalculatorError(Exception):
    """Base calculator exception."""
    pass

class DivisionByZeroError(CalculatorError):
    """Raised when dividing by zero."""
    pass

class InvalidOperationError(CalculatorError):
    """Raised for unknown operations."""
    pass

class Calculator:
    def calculate(self, a, b, operation):
        """Perform calculation with error handling."""
        try:
            a = float(a)
            b = float(b)
        except ValueError as e:
            raise CalculatorError(f"Invalid number: {e}")

        operations = {
            '+': lambda x, y: x + y,
            '-': lambda x, y: x - y,
            '*': lambda x, y: x * y,
            '/': self._divide,
            '**': lambda x, y: x ** y,
        }

        if operation not in operations:
            raise InvalidOperationError(f"Unknown operation: {operation}")

        try:
            return operations[operation](a, b)
        except OverflowError:
            raise CalculatorError("Result too large")

    def _divide(self, a, b):
        if b == 0:
            raise DivisionByZeroError("Cannot divide by zero")
        return a / b


def main():
    calc = Calculator()
    while True:
        try:
            expr = input("Enter expression (e.g., '10 + 5'): ").strip()
            if expr.lower() == 'quit':
                break

            parts = expr.split()
            if len(parts) != 3:
                print("Format: number operator number")
                continue

            a, op, b = parts
            result = calc.calculate(a, b, op)
            print(f"Result: {result}")

        except CalculatorError as e:
            print(f"Error: {e}")
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break

if __name__ == "__main__":
    main()
```
:::

### Exercise 2: File Processor with Error Handling

Create a file processor that handles various error scenarios.

::: details Solution
```python
import json
from pathlib import Path

class FileProcessorError(Exception):
    """Base exception for file processor."""
    pass

class FileReadError(FileProcessorError):
    """Error reading file."""
    pass

class FileWriteError(FileProcessorError):
    """Error writing file."""
    pass

class ParseError(FileProcessorError):
    """Error parsing file content."""
    pass

class FileProcessor:
    def read_json(self, filepath):
        """Read and parse JSON file."""
        try:
            with open(filepath, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            raise FileReadError(f"File not found: {filepath}")
        except PermissionError:
            raise FileReadError(f"Permission denied: {filepath}")
        except json.JSONDecodeError as e:
            raise ParseError(f"Invalid JSON in {filepath}: {e}")

    def write_json(self, filepath, data):
        """Write data to JSON file."""
        try:
            # Create directory if needed
            Path(filepath).parent.mkdir(parents=True, exist_ok=True)
            with open(filepath, 'w') as f:
                json.dump(data, f, indent=2)
        except PermissionError:
            raise FileWriteError(f"Permission denied: {filepath}")
        except TypeError as e:
            raise FileWriteError(f"Data not serializable: {e}")

    def process_files(self, input_files, output_file):
        """Process multiple files, collecting errors."""
        results = []
        errors = []

        for filepath in input_files:
            try:
                data = self.read_json(filepath)
                results.append({"file": filepath, "data": data})
            except FileProcessorError as e:
                errors.append({"file": filepath, "error": str(e)})

        if results:
            try:
                self.write_json(output_file, {
                    "processed": len(results),
                    "results": results,
                    "errors": errors
                })
            except FileWriteError as e:
                errors.append({"file": output_file, "error": str(e)})

        return {"success": len(results), "failed": len(errors), "errors": errors}


# Test
processor = FileProcessor()
result = processor.process_files(
    ["file1.json", "file2.json", "nonexistent.json"],
    "output.json"
)
print(result)
```
:::

## Quick Reference

::: tip Exception Handling Cheat Sheet
```python
# Basic try/except
try:
    risky_code()
except SpecificError:
    handle_error()

# Multiple exceptions
except (TypeError, ValueError) as e:
    handle_error(e)

# All exceptions (use sparingly)
except Exception as e:
    handle_error(e)

# else (no exception)
try:
    code()
except Error:
    handle()
else:
    on_success()

# finally (always runs)
finally:
    cleanup()

# Raise exception
raise ValueError("message")

# Re-raise
except Error:
    raise

# Chain exceptions
raise NewError() from original_error

# Custom exception
class MyError(Exception):
    pass

# Context manager
with resource as r:
    use(r)  # cleanup automatic
```
:::

## Summary

| Concept | Description | Example |
|---------|-------------|---------|
| try/except | Handle errors | `try: ... except: ...` |
| else | Run if no error | `else: success()` |
| finally | Always run | `finally: cleanup()` |
| raise | Throw exception | `raise ValueError()` |
| Custom | Own exceptions | `class MyError(Exception)` |
| Chaining | Link exceptions | `raise X from Y` |
| Context | Auto cleanup | `with open() as f:` |

## Next Steps

Continue to [Advanced Topics](/guide/python/10-advanced) to learn about decorators, generators, and more advanced Python features.
