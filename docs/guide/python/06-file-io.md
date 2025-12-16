# File I/O

File Input/Output (I/O) allows your programs to read from and write to files. This is essential for data persistence, configuration, and working with external data.

::: info What You'll Learn
- Open and close files properly
- Read text and binary files
- Write and append to files
- Work with file paths
- Handle CSV and JSON files
- Use context managers for safety
:::

## Opening Files

```
┌─────────────────────────────────────────────────────────────────┐
│                    File Opening Modes                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Mode    Description              Creates?   Truncates?         │
│   ────    ───────────              ────────   ──────────         │
│   'r'     Read only (default)      No         No                 │
│   'w'     Write only               Yes        Yes                │
│   'a'     Append only              Yes        No                 │
│   'x'     Exclusive create         Yes        N/A                │
│   'r+'    Read and write           No         No                 │
│   'w+'    Write and read           Yes        Yes                │
│   'a+'    Append and read          Yes        No                 │
│                                                                  │
│   Add 'b' for binary mode: 'rb', 'wb', 'ab'                     │
│   Add 't' for text mode (default): 'rt', 'wt'                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Basic File Operations

```python
# Open and close manually (not recommended)
file = open("example.txt", "r")
content = file.read()
file.close()

# Using context manager (recommended!)
with open("example.txt", "r") as file:
    content = file.read()
# File automatically closed here

# Why use context managers?
# 1. Automatic cleanup (close)
# 2. Exception safe
# 3. Cleaner code
```

## Reading Files

### Read Entire File

```python
# Read entire file as string
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# Read with size limit
with open("example.txt", "r") as file:
    chunk = file.read(100)  # Read first 100 characters
```

### Read Lines

```python
# Read all lines as list
with open("example.txt", "r") as file:
    lines = file.readlines()
    for line in lines:
        print(line.strip())  # strip() removes \n

# Read single line
with open("example.txt", "r") as file:
    first_line = file.readline()
    second_line = file.readline()

# Iterate lines (memory efficient)
with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())
```

### Reading Examples

```python
# Read and process lines
with open("data.txt", "r") as file:
    for line_num, line in enumerate(file, 1):
        print(f"Line {line_num}: {line.strip()}")

# Read into list comprehension
with open("numbers.txt", "r") as file:
    numbers = [int(line.strip()) for line in file]
    print(f"Sum: {sum(numbers)}")

# Read specific lines
def read_lines(filename, start, end):
    with open(filename, "r") as file:
        lines = file.readlines()
        return lines[start-1:end]

# Check if file exists before reading
from pathlib import Path

if Path("example.txt").exists():
    with open("example.txt", "r") as file:
        content = file.read()
else:
    print("File not found!")
```

## Writing Files

### Write Text

```python
# Write (overwrites existing content!)
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("Second line\n")

# Write multiple lines
lines = ["Line 1", "Line 2", "Line 3"]
with open("output.txt", "w") as file:
    for line in lines:
        file.write(line + "\n")

# Using writelines()
with open("output.txt", "w") as file:
    file.writelines([line + "\n" for line in lines])
```

### Append to File

```python
# Append (adds to end of file)
with open("log.txt", "a") as file:
    file.write("New log entry\n")

# Append with timestamp
from datetime import datetime

def log_message(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open("log.txt", "a") as file:
        file.write(f"[{timestamp}] {message}\n")

log_message("Application started")
log_message("User logged in")
```

### Writing with Print

```python
# Use print() to write to file
with open("output.txt", "w") as file:
    print("Hello, World!", file=file)
    print("Number:", 42, file=file)
    print("List:", [1, 2, 3], file=file)
```

## File Paths

### Using pathlib (Recommended)

```python
from pathlib import Path

# Create path object
path = Path("folder/subfolder/file.txt")

# Path operations
print(path.name)        # file.txt
print(path.stem)        # file
print(path.suffix)      # .txt
print(path.parent)      # folder/subfolder
print(path.parts)       # ('folder', 'subfolder', 'file.txt')

# Check path
print(path.exists())    # True/False
print(path.is_file())   # True/False
print(path.is_dir())    # True/False

# Create directories
Path("new_folder").mkdir(exist_ok=True)
Path("a/b/c").mkdir(parents=True, exist_ok=True)

# Join paths
base = Path("folder")
full = base / "subfolder" / "file.txt"

# Get current directory
cwd = Path.cwd()
home = Path.home()

# List files
for file in Path(".").iterdir():
    print(file)

# Find files with pattern
for py_file in Path(".").glob("*.py"):
    print(py_file)

for all_py in Path(".").rglob("*.py"):  # Recursive
    print(all_py)
```

### Using os.path (Traditional)

```python
import os

# Join paths
path = os.path.join("folder", "subfolder", "file.txt")

# Path operations
print(os.path.basename(path))   # file.txt
print(os.path.dirname(path))    # folder/subfolder
print(os.path.splitext(path))   # ('folder/subfolder/file', '.txt')

# Check path
print(os.path.exists(path))
print(os.path.isfile(path))
print(os.path.isdir(path))

# Get size
print(os.path.getsize("file.txt"))

# Current directory
print(os.getcwd())
```

## Working with Directories

```python
from pathlib import Path
import os
import shutil

# Create directory
Path("new_dir").mkdir(exist_ok=True)

# Create nested directories
Path("a/b/c").mkdir(parents=True, exist_ok=True)

# List directory contents
for item in Path(".").iterdir():
    if item.is_file():
        print(f"File: {item}")
    elif item.is_dir():
        print(f"Dir: {item}")

# Copy file
shutil.copy("source.txt", "dest.txt")

# Move/rename file
shutil.move("old.txt", "new.txt")
# or
Path("old.txt").rename("new.txt")

# Delete file
Path("file.txt").unlink()
# or
os.remove("file.txt")

# Delete directory
Path("empty_dir").rmdir()           # Only empty dirs
shutil.rmtree("dir_with_content")   # Including contents
```

## Binary Files

```python
# Read binary file
with open("image.png", "rb") as file:
    data = file.read()
    print(f"File size: {len(data)} bytes")

# Write binary file
with open("output.bin", "wb") as file:
    file.write(b'\x00\x01\x02\x03')

# Copy binary file
with open("source.png", "rb") as src:
    with open("copy.png", "wb") as dst:
        dst.write(src.read())

# Read in chunks (for large files)
def copy_file(src_path, dst_path, chunk_size=8192):
    with open(src_path, "rb") as src:
        with open(dst_path, "wb") as dst:
            while True:
                chunk = src.read(chunk_size)
                if not chunk:
                    break
                dst.write(chunk)
```

## CSV Files

```python
import csv

# Write CSV
data = [
    ["Name", "Age", "City"],
    ["Alice", 25, "New York"],
    ["Bob", 30, "Los Angeles"],
    ["Charlie", 35, "Chicago"]
]

with open("data.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)

# Read CSV
with open("data.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)

# CSV with dictionaries
with open("data.csv", "w", newline="") as file:
    fieldnames = ["name", "age", "city"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)

    writer.writeheader()
    writer.writerow({"name": "Alice", "age": 25, "city": "NYC"})
    writer.writerow({"name": "Bob", "age": 30, "city": "LA"})

# Read as dictionaries
with open("data.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['name']} is {row['age']} years old")
```

## JSON Files

```python
import json

# Write JSON
data = {
    "name": "Alice",
    "age": 25,
    "hobbies": ["reading", "coding", "gaming"],
    "address": {
        "city": "New York",
        "zip": "10001"
    }
}

with open("data.json", "w") as file:
    json.dump(data, file, indent=2)

# Read JSON
with open("data.json", "r") as file:
    data = json.load(file)
    print(data["name"])
    print(data["hobbies"])

# JSON string conversion
json_string = json.dumps(data, indent=2)
data = json.loads(json_string)

# Handle special types
from datetime import datetime

class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

data = {"timestamp": datetime.now()}
json_string = json.dumps(data, cls=DateEncoder)
```

## File Encoding

```python
# Specify encoding (important for non-ASCII)
with open("unicode.txt", "w", encoding="utf-8") as file:
    file.write("Hello, 世界! 🌍")

with open("unicode.txt", "r", encoding="utf-8") as file:
    content = file.read()

# Handle encoding errors
with open("file.txt", "r", encoding="utf-8", errors="ignore") as file:
    content = file.read()

# Common encodings
# utf-8      - Universal (recommended)
# ascii      - Basic English only
# latin-1    - Western European
# cp1252     - Windows Western European
```

## Error Handling

```python
from pathlib import Path

# Safe file reading
def read_file_safe(filename):
    try:
        with open(filename, "r") as file:
            return file.read()
    except FileNotFoundError:
        print(f"Error: {filename} not found")
        return None
    except PermissionError:
        print(f"Error: No permission to read {filename}")
        return None
    except IOError as e:
        print(f"Error reading file: {e}")
        return None

# Check before opening
def read_if_exists(filename):
    path = Path(filename)
    if not path.exists():
        return None
    if not path.is_file():
        return None
    return path.read_text()

# Using pathlib methods
path = Path("example.txt")
if path.exists():
    content = path.read_text()
    # path.write_text("new content")
```

## Temporary Files

```python
import tempfile

# Create temporary file
with tempfile.NamedTemporaryFile(mode='w', delete=False) as tmp:
    tmp.write("Temporary data")
    print(f"Temp file: {tmp.name}")

# Create temporary directory
with tempfile.TemporaryDirectory() as tmpdir:
    print(f"Temp dir: {tmpdir}")
    # Directory and contents deleted after block

# Get temp directory path
print(tempfile.gettempdir())
```

## Exercises

### Exercise 1: Log File Analyzer

Create a function that analyzes log files.

::: details Solution
```python
from datetime import datetime
from pathlib import Path
from collections import Counter

def analyze_log(filename):
    """Analyze a log file and return statistics"""
    if not Path(filename).exists():
        return {"error": "File not found"}

    stats = {
        "total_lines": 0,
        "error_count": 0,
        "warning_count": 0,
        "info_count": 0,
        "errors": [],
        "hourly_distribution": Counter()
    }

    with open(filename, "r") as file:
        for line in file:
            stats["total_lines"] += 1

            if "[ERROR]" in line:
                stats["error_count"] += 1
                stats["errors"].append(line.strip())
            elif "[WARNING]" in line:
                stats["warning_count"] += 1
            elif "[INFO]" in line:
                stats["info_count"] += 1

            # Extract hour if timestamp present
            if line.startswith("["):
                try:
                    time_str = line[1:20]
                    dt = datetime.strptime(time_str, "%Y-%m-%d %H:%M:%S")
                    stats["hourly_distribution"][dt.hour] += 1
                except:
                    pass

    return stats

# Create sample log
sample_log = """[2024-01-15 10:23:45] [INFO] Application started
[2024-01-15 10:24:01] [INFO] User logged in
[2024-01-15 10:25:33] [WARNING] High memory usage
[2024-01-15 10:26:12] [ERROR] Database connection failed
[2024-01-15 11:00:00] [INFO] Retry successful
[2024-01-15 11:15:22] [ERROR] Timeout error
"""

with open("sample.log", "w") as f:
    f.write(sample_log)

result = analyze_log("sample.log")
print(f"Total lines: {result['total_lines']}")
print(f"Errors: {result['error_count']}")
print(f"Warnings: {result['warning_count']}")
```
:::

### Exercise 2: Config File Manager

Create a simple configuration file manager.

::: details Solution
```python
import json
from pathlib import Path

class ConfigManager:
    def __init__(self, filename):
        self.filename = filename
        self.config = self._load()

    def _load(self):
        """Load config from file"""
        if Path(self.filename).exists():
            with open(self.filename, "r") as f:
                return json.load(f)
        return {}

    def save(self):
        """Save config to file"""
        with open(self.filename, "w") as f:
            json.dump(self.config, f, indent=2)

    def get(self, key, default=None):
        """Get config value"""
        keys = key.split(".")
        value = self.config
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default
        return value

    def set(self, key, value):
        """Set config value"""
        keys = key.split(".")
        config = self.config
        for k in keys[:-1]:
            config = config.setdefault(k, {})
        config[keys[-1]] = value
        self.save()

    def delete(self, key):
        """Delete config value"""
        keys = key.split(".")
        config = self.config
        for k in keys[:-1]:
            if k in config:
                config = config[k]
            else:
                return
        if keys[-1] in config:
            del config[keys[-1]]
            self.save()

# Test
config = ConfigManager("app_config.json")
config.set("database.host", "localhost")
config.set("database.port", 5432)
config.set("app.debug", True)

print(config.get("database.host"))  # localhost
print(config.get("database.port"))  # 5432
print(config.get("missing", "default"))  # default
```
:::

### Exercise 3: File Backup System

Create a simple file backup system.

::: details Solution
```python
from pathlib import Path
from datetime import datetime
import shutil

class BackupManager:
    def __init__(self, backup_dir="backups"):
        self.backup_dir = Path(backup_dir)
        self.backup_dir.mkdir(exist_ok=True)

    def backup(self, file_path):
        """Create a timestamped backup of a file"""
        file_path = Path(file_path)
        if not file_path.exists():
            return None

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_name = f"{file_path.stem}_{timestamp}{file_path.suffix}"
        backup_path = self.backup_dir / backup_name

        shutil.copy2(file_path, backup_path)
        return backup_path

    def restore(self, backup_name, dest_path=None):
        """Restore a file from backup"""
        backup_path = self.backup_dir / backup_name
        if not backup_path.exists():
            return False

        if dest_path is None:
            # Extract original filename
            parts = backup_name.rsplit("_", 2)
            dest_path = parts[0] + Path(backup_name).suffix

        shutil.copy2(backup_path, dest_path)
        return True

    def list_backups(self, pattern="*"):
        """List all backups matching pattern"""
        return list(self.backup_dir.glob(pattern))

    def cleanup(self, keep_latest=5):
        """Keep only the latest N backups per file"""
        backups = sorted(self.backup_dir.iterdir(),
                        key=lambda p: p.stat().st_mtime,
                        reverse=True)

        file_counts = {}
        for backup in backups:
            base_name = backup.stem.rsplit("_", 2)[0]
            file_counts[base_name] = file_counts.get(base_name, 0) + 1
            if file_counts[base_name] > keep_latest:
                backup.unlink()
                print(f"Deleted old backup: {backup.name}")

# Test
backup = BackupManager()

# Create a test file
Path("test.txt").write_text("Original content")
backup.backup("test.txt")

Path("test.txt").write_text("Modified content")
backup.backup("test.txt")

print("Backups:", [b.name for b in backup.list_backups()])
```
:::

## Quick Reference

::: tip File I/O Cheat Sheet
```python
# Reading files
with open("file.txt", "r") as f:
    content = f.read()        # Entire file
    lines = f.readlines()     # List of lines
    line = f.readline()       # Single line

# Writing files
with open("file.txt", "w") as f:
    f.write("text")           # Write string
    f.writelines(lines)       # Write list

# Appending
with open("file.txt", "a") as f:
    f.write("more text")

# Binary mode
with open("file.bin", "rb") as f:  # Read binary
with open("file.bin", "wb") as f:  # Write binary

# Pathlib
from pathlib import Path
p = Path("file.txt")
p.exists()                    # Check exists
p.read_text()                 # Read content
p.write_text("content")       # Write content
p.parent                      # Parent directory
p.name                        # Filename
p.suffix                      # Extension

# JSON
import json
data = json.load(f)           # Read JSON
json.dump(data, f)            # Write JSON

# CSV
import csv
reader = csv.reader(f)
writer = csv.writer(f)
```
:::

## Summary

| Operation | Code | Description |
|-----------|------|-------------|
| Read | `open("f", "r")` | Open for reading |
| Write | `open("f", "w")` | Open for writing |
| Append | `open("f", "a")` | Open for appending |
| Binary | `open("f", "rb")` | Binary mode |
| Context | `with open() as f:` | Auto-close |
| Read all | `f.read()` | Entire content |
| Read lines | `f.readlines()` | List of lines |
| Write | `f.write(s)` | Write string |
| JSON | `json.load/dump` | JSON files |
| CSV | `csv.reader/writer` | CSV files |

## Next Steps

Continue to [Modules](/guide/python/07-modules) to learn how to organize code into modules and packages.
