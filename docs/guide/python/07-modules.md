# Modules and Packages

Modules help organize code into reusable components. Packages group related modules together. This lesson covers how to create, import, and use modules effectively.

::: info What You'll Learn
- Import and use modules
- Create your own modules
- Understand packages and `__init__.py`
- Use the Python Standard Library
- Install and manage third-party packages
:::

## What are Modules?

```
┌─────────────────────────────────────────────────────────────────┐
│                    Module Organization                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   MODULE: A single .py file containing Python code              │
│                                                                  │
│   math.py ─────────┐                                            │
│   ├── Variables    │                                            │
│   ├── Functions    │ → import math                              │
│   ├── Classes      │                                            │
│   └── Constants    │                                            │
│   ─────────────────┘                                            │
│                                                                  │
│   PACKAGE: A directory containing modules                        │
│                                                                  │
│   mypackage/                                                     │
│   ├── __init__.py      ← Makes it a package                     │
│   ├── module1.py       ← from mypackage import module1          │
│   ├── module2.py       ← from mypackage import module2          │
│   └── subpackage/                                                │
│       ├── __init__.py                                            │
│       └── module3.py   ← from mypackage.subpackage import module3│
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Importing Modules

### Basic Import

```python
# Import entire module
import math
print(math.pi)          # 3.141592653589793
print(math.sqrt(16))    # 4.0

# Import with alias
import numpy as np
import pandas as pd

# Import specific items
from math import pi, sqrt
print(pi)               # 3.141592653589793
print(sqrt(16))         # 4.0

# Import all (not recommended)
from math import *
print(sin(0))           # Works but pollutes namespace
```

### Import Variations

```python
# Multiple imports on one line
import os, sys, json

# Import with alias
from datetime import datetime as dt
now = dt.now()

# Import from package
from collections import Counter, defaultdict
from typing import List, Dict, Optional

# Relative imports (inside packages)
from . import sibling_module
from .. import parent_module
from .subpackage import module
```

### Import Best Practices

```
┌─────────────────────────────────────────────────────────────────┐
│                    Import Organization                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   # 1. Standard library imports                                  │
│   import os                                                      │
│   import sys                                                     │
│   from datetime import datetime                                  │
│                                                                  │
│   # 2. Third-party imports                                       │
│   import numpy as np                                             │
│   import pandas as pd                                            │
│   from flask import Flask                                        │
│                                                                  │
│   # 3. Local/project imports                                     │
│   from myproject import utils                                    │
│   from myproject.models import User                              │
│                                                                  │
│   # Separate groups with blank lines                             │
│   # Alphabetize within groups                                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Creating Modules

### Simple Module

```python
# mymodule.py
"""
My custom module.
This docstring describes what the module does.
"""

# Constants
VERSION = "1.0.0"
PI = 3.14159

# Functions
def greet(name):
    """Return a greeting message."""
    return f"Hello, {name}!"

def add(a, b):
    """Add two numbers."""
    return a + b

# Classes
class Calculator:
    """Simple calculator class."""

    def add(self, a, b):
        return a + b

    def subtract(self, a, b):
        return a - b

# Private (by convention)
_internal_value = 42

def _helper_function():
    """Internal helper (not exported with *)."""
    pass
```

### Using Your Module

```python
# In another file
import mymodule

print(mymodule.VERSION)           # 1.0.0
print(mymodule.greet("Alice"))    # Hello, Alice!

calc = mymodule.Calculator()
print(calc.add(3, 5))             # 8

# Or import specific items
from mymodule import greet, Calculator
print(greet("Bob"))
```

### Module `__name__`

```python
# mymodule.py
def main():
    print("Running as main program")

# This block runs only when file is executed directly
if __name__ == "__main__":
    main()
    # Won't run when imported!

# When imported:
# __name__ == "mymodule"

# When run directly:
# __name__ == "__main__"
```

## Packages

### Package Structure

```
mypackage/
├── __init__.py          # Package initialization
├── core.py              # Core functionality
├── utils.py             # Utility functions
├── models/              # Subpackage
│   ├── __init__.py
│   ├── user.py
│   └── product.py
└── tests/               # Test subpackage
    ├── __init__.py
    └── test_core.py
```

### `__init__.py`

```python
# mypackage/__init__.py
"""
MyPackage - A sample Python package.
"""

# Package metadata
__version__ = "1.0.0"
__author__ = "Your Name"

# Import commonly used items for easy access
from .core import main_function
from .utils import helper_function

# Define what gets exported with "from mypackage import *"
__all__ = ["main_function", "helper_function", "core", "utils"]

# Package initialization code
print("MyPackage loaded!")
```

```python
# Using the package
import mypackage
print(mypackage.__version__)
mypackage.main_function()

from mypackage import helper_function
from mypackage.models.user import User
```

### Relative Imports

```python
# Inside mypackage/models/user.py
from ..core import main_function      # Parent package
from ..utils import helper            # Sibling in parent
from . import product                 # Same directory
from .product import Product          # Specific class

# Relative imports only work inside packages!
```

## Python Standard Library

### Commonly Used Modules

| Module | Description | Example |
|--------|-------------|---------|
| `os` | OS interaction | `os.getcwd()`, `os.listdir()` |
| `sys` | System-specific | `sys.path`, `sys.argv` |
| `datetime` | Date and time | `datetime.now()` |
| `json` | JSON handling | `json.dumps()`, `json.loads()` |
| `re` | Regular expressions | `re.match()`, `re.search()` |
| `math` | Mathematics | `math.sqrt()`, `math.pi` |
| `random` | Random numbers | `random.randint()`, `random.choice()` |
| `collections` | Data structures | `Counter`, `defaultdict` |
| `itertools` | Iteration tools | `chain()`, `combinations()` |
| `functools` | Function tools | `reduce()`, `lru_cache` |
| `pathlib` | Path handling | `Path()` |
| `typing` | Type hints | `List`, `Dict`, `Optional` |

### os Module

```python
import os

# Working directory
print(os.getcwd())              # Current directory
os.chdir("/path/to/dir")        # Change directory

# Environment variables
print(os.environ.get("HOME"))
os.environ["MY_VAR"] = "value"

# File operations
os.mkdir("new_dir")             # Create directory
os.makedirs("a/b/c")            # Create nested dirs
os.remove("file.txt")           # Delete file
os.rmdir("empty_dir")           # Delete empty dir

# Path operations
print(os.path.join("a", "b", "c"))    # a/b/c
print(os.path.exists("file.txt"))
print(os.path.isfile("file.txt"))
print(os.path.isdir("folder"))

# List directory
for item in os.listdir("."):
    print(item)

# Walk directory tree
for root, dirs, files in os.walk("."):
    for file in files:
        print(os.path.join(root, file))
```

### datetime Module

```python
from datetime import datetime, date, time, timedelta

# Current date/time
now = datetime.now()
today = date.today()

print(now)                    # 2024-01-15 10:30:45.123456
print(today)                  # 2024-01-15

# Create specific date/time
dt = datetime(2024, 1, 15, 10, 30, 0)
d = date(2024, 1, 15)
t = time(10, 30, 0)

# Formatting
print(now.strftime("%Y-%m-%d %H:%M:%S"))  # 2024-01-15 10:30:45
print(now.strftime("%B %d, %Y"))          # January 15, 2024

# Parsing
dt = datetime.strptime("2024-01-15", "%Y-%m-%d")

# Arithmetic
tomorrow = today + timedelta(days=1)
next_week = today + timedelta(weeks=1)
duration = datetime(2024, 12, 31) - datetime(2024, 1, 1)
print(duration.days)  # 365

# Components
print(now.year, now.month, now.day)
print(now.hour, now.minute, now.second)
```

### collections Module

```python
from collections import Counter, defaultdict, namedtuple, deque

# Counter - count elements
words = ["apple", "banana", "apple", "cherry", "apple"]
counter = Counter(words)
print(counter)                    # Counter({'apple': 3, ...})
print(counter.most_common(2))     # [('apple', 3), ('banana', 1)]

# defaultdict - dict with default values
dd = defaultdict(list)
dd["fruits"].append("apple")      # No KeyError!
dd["fruits"].append("banana")
print(dd)                         # {'fruits': ['apple', 'banana']}

# namedtuple - tuple with named fields
Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
print(p.x, p.y)                   # 10 20
print(p[0], p[1])                 # 10 20

# deque - double-ended queue
dq = deque([1, 2, 3])
dq.append(4)                      # Add right
dq.appendleft(0)                  # Add left
dq.pop()                          # Remove right
dq.popleft()                      # Remove left
```

### itertools Module

```python
from itertools import chain, combinations, permutations, cycle, count

# chain - combine iterables
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list(chain(list1, list2))  # [1, 2, 3, 4, 5, 6]

# combinations
items = ["a", "b", "c"]
combos = list(combinations(items, 2))
# [('a', 'b'), ('a', 'c'), ('b', 'c')]

# permutations
perms = list(permutations(items, 2))
# [('a', 'b'), ('a', 'c'), ('b', 'a'), ('b', 'c'), ('c', 'a'), ('c', 'b')]

# count - infinite counter
for i in count(10, 2):  # Start at 10, step 2
    if i > 20:
        break
    print(i)  # 10, 12, 14, 16, 18, 20

# cycle - infinite cycle
colors = cycle(["red", "green", "blue"])
for _ in range(6):
    print(next(colors))  # red, green, blue, red, green, blue
```

## Third-Party Packages

### pip - Package Installer

```bash
# Install package
pip install package_name
pip install numpy pandas matplotlib

# Install specific version
pip install requests==2.28.0
pip install "requests>=2.25.0,<3.0.0"

# Install from requirements file
pip install -r requirements.txt

# Upgrade package
pip install --upgrade package_name

# Uninstall
pip uninstall package_name

# List installed
pip list
pip freeze

# Show package info
pip show requests
```

### requirements.txt

```
# requirements.txt
numpy==1.24.0
pandas>=2.0.0
requests>=2.25.0,<3.0.0
flask~=2.0.0
pytest
```

```bash
# Create requirements.txt
pip freeze > requirements.txt

# Install all requirements
pip install -r requirements.txt
```

### Virtual Environments

```bash
# Create virtual environment
python -m venv myenv

# Activate (Unix/Mac)
source myenv/bin/activate

# Activate (Windows)
myenv\Scripts\activate

# Deactivate
deactivate

# Install packages in virtual env
pip install requests

# Best practice: one venv per project
```

```
┌─────────────────────────────────────────────────────────────────┐
│                 Why Virtual Environments?                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Without venv:                  With venv:                      │
│   ─────────────                  ──────────                      │
│                                                                  │
│   Project A needs                Project A (venv_a)              │
│   Django 3.0      ┐             └── Django 3.0 ✓                │
│                   │ CONFLICT!                                    │
│   Project B needs │             Project B (venv_b)               │
│   Django 4.0      ┘             └── Django 4.0 ✓                │
│                                                                  │
│   Virtual environments isolate project dependencies!             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Module Search Path

```python
import sys

# Where Python looks for modules
for path in sys.path:
    print(path)

# Order:
# 1. Current directory
# 2. PYTHONPATH environment variable
# 3. Standard library
# 4. site-packages (third-party)

# Add custom path
sys.path.append("/my/custom/modules")

# Or use PYTHONPATH environment variable
# export PYTHONPATH=/my/custom/modules:$PYTHONPATH
```

## Exercises

### Exercise 1: Create a Utility Module

Create a utility module with common functions.

::: details Solution
```python
# utils.py
"""
Utility functions for common operations.
"""

import re
from datetime import datetime

__version__ = "1.0.0"
__all__ = ["slugify", "truncate", "format_date", "validate_email"]

def slugify(text):
    """Convert text to URL-friendly slug."""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text

def truncate(text, length=100, suffix="..."):
    """Truncate text to specified length."""
    if len(text) <= length:
        return text
    return text[:length - len(suffix)].rsplit(' ', 1)[0] + suffix

def format_date(dt=None, fmt="%Y-%m-%d"):
    """Format datetime object or current time."""
    if dt is None:
        dt = datetime.now()
    return dt.strftime(fmt)

def validate_email(email):
    """Validate email format."""
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(pattern, email))

if __name__ == "__main__":
    # Test when run directly
    print(slugify("Hello World! Test"))  # hello-world-test
    print(truncate("This is a long text", 10))  # This is...
    print(format_date())  # 2024-01-15
    print(validate_email("test@example.com"))  # True
```
:::

### Exercise 2: Create a Package

Create a simple math package.

::: details Solution
```python
# mathtools/__init__.py
"""Math tools package."""
from .basic import add, subtract, multiply, divide
from .advanced import power, sqrt, factorial

__version__ = "1.0.0"
__all__ = ["add", "subtract", "multiply", "divide",
           "power", "sqrt", "factorial"]

# mathtools/basic.py
"""Basic math operations."""

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# mathtools/advanced.py
"""Advanced math operations."""
import math as _math

def power(base, exp):
    return base ** exp

def sqrt(n):
    if n < 0:
        raise ValueError("Cannot calculate sqrt of negative number")
    return _math.sqrt(n)

def factorial(n):
    if n < 0:
        raise ValueError("Factorial not defined for negative numbers")
    if n == 0 or n == 1:
        return 1
    return n * factorial(n - 1)

# Usage
# from mathtools import add, power
# print(add(3, 5))
# print(power(2, 10))
```
:::

### Exercise 3: Config Manager Module

Create a configuration management module.

::: details Solution
```python
# config.py
"""Configuration management module."""

import json
import os
from pathlib import Path
from typing import Any, Dict, Optional

class Config:
    """Configuration manager with file and environment support."""

    def __init__(self, config_file: Optional[str] = None):
        self._config: Dict[str, Any] = {}
        if config_file:
            self.load_file(config_file)

    def load_file(self, filepath: str) -> None:
        """Load configuration from JSON file."""
        path = Path(filepath)
        if path.exists():
            with open(path) as f:
                self._config.update(json.load(f))

    def load_env(self, prefix: str = "") -> None:
        """Load configuration from environment variables."""
        for key, value in os.environ.items():
            if prefix and not key.startswith(prefix):
                continue
            config_key = key[len(prefix):].lower() if prefix else key.lower()
            self._config[config_key] = value

    def get(self, key: str, default: Any = None) -> Any:
        """Get configuration value with dot notation support."""
        keys = key.split(".")
        value = self._config
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default
        return value

    def set(self, key: str, value: Any) -> None:
        """Set configuration value."""
        keys = key.split(".")
        config = self._config
        for k in keys[:-1]:
            config = config.setdefault(k, {})
        config[keys[-1]] = value

    def all(self) -> Dict[str, Any]:
        """Return all configuration."""
        return self._config.copy()

# Global instance
_config = Config()

def get(key: str, default: Any = None) -> Any:
    return _config.get(key, default)

def set(key: str, value: Any) -> None:
    _config.set(key, value)

def load_file(filepath: str) -> None:
    _config.load_file(filepath)

def load_env(prefix: str = "") -> None:
    _config.load_env(prefix)

if __name__ == "__main__":
    # Test
    set("database.host", "localhost")
    set("database.port", 5432)
    print(get("database.host"))
    print(get("database.port"))
```
:::

## Quick Reference

::: tip Modules Cheat Sheet
```python
# Import styles
import module
import module as alias
from module import func
from module import func as alias
from module import *  # Avoid!

# Package structure
mypackage/
├── __init__.py
├── module.py
└── subpackage/
    └── __init__.py

# __init__.py
__version__ = "1.0.0"
__all__ = ["func1", "func2"]
from .module import func1, func2

# Module check
if __name__ == "__main__":
    main()

# pip commands
pip install package
pip install -r requirements.txt
pip freeze > requirements.txt
pip uninstall package
pip list

# Virtual environment
python -m venv env
source env/bin/activate  # Unix
env\Scripts\activate     # Windows
deactivate
```
:::

## Summary

| Concept | Description | Example |
|---------|-------------|---------|
| Module | Single .py file | `import math` |
| Package | Directory with `__init__.py` | `from pkg import mod` |
| Import | Load module | `import os` |
| From import | Import specific | `from os import path` |
| Alias | Rename import | `import numpy as np` |
| `__name__` | Module name | `if __name__ == "__main__"` |
| pip | Package installer | `pip install requests` |
| venv | Virtual environment | `python -m venv env` |

## Next Steps

Continue to [OOP](/guide/python/08-oop) to learn about object-oriented programming in Python.
