# Jupyter-like Features Implementation

This document describes all the Jupyter-like features that have been implemented in the AdeloopFlow system.

## 1. Variable Persistence

Variables defined in one cell execution persist across subsequent executions, just like in Jupyter notebooks.

Example:
```python
# Cell 1
x = 10
y = 20

# Cell 2 (can access x and y from previous cell)
z = x + y
print(z)  # Output: 30
```

## 2. Execution Count Tracking

Each code execution is assigned a sequential execution count (1, 2, 3, ...), displayed in brackets like Jupyter.

Example output:
```
[1] x = 10
[2] y = 20
[3] print(x + y)  # Output: 30
```

## 3. Rich Output Support

The system supports various types of rich output including:
- DataFrames with HTML formatting
- Matplotlib plots
- Plotly figures
- Images
- Tables

Example:
```python
import pandas as pd
import matplotlib.pyplot as plt

# DataFrame display
df = pd.DataFrame({'A': [1, 2, 3], 'B': [4, 5, 6]})
print(df)

# Plot display
plt.plot([1, 2, 3, 4], [1, 4, 2, 3])
plt.show()
```

## 4. Magic Commands

The following Jupyter-like magic commands are supported:

### %who
List all variable names in the current namespace.

### %whos
List variables with details including types and sizes.

### %history
Show execution history with code snippets.

### %ls
List directory contents with details (type and size).

### %pwd
Print working directory.

### %reset
Reset the namespace (clear all variables).

### %time
Time execution of a statement.

### %matplotlib
Set or show matplotlib backend.

Example:
```python
x = 10
y = [1, 2, 3]
%who  # Output: x y
%whos  # Output: x (int): 10, y (list): 3 items
```

## 5. Shell Command Support

Execute shell commands using the `!` prefix with enhanced output capture.

Example:
```python
!ls -la
!echo "Hello World"
!pwd
!date
```

Shell commands now properly capture both stdout and stderr output.

## 6. Streaming Output

Real-time output streaming for long-running processes, similar to Jupyter notebooks.

Example:
```python
import time
for i in range(1, 11):
    print(f"Count: {i}")
    time.sleep(2)  # Wait for 2 seconds
```

## 7. Namespace Management

Proper namespace management that:
- Preserves variables across executions
- Prevents namespace corruption
- Provides recovery mechanisms
- Supports variable inspection

## 8. Execution History

Complete execution history tracking:
- Code snippets for each execution
- Timestamps
- Execution counts
- Variable state at each execution

## 9. Variable History

Tracking of variable changes across executions:
- Variable names and values at each execution step
- Type information
- Size information for collections
- Execution count association

## 10. Error Handling

Enhanced error handling with:
- Detailed traceback information
- Error recovery mechanisms
- Namespace corruption detection and recovery

## Implementation Details

### Backend (Python)
- Modified `jupyter_kernel.py` to include execution count tracking
- Added magic command support through `_add_magic_commands()` method
- Implemented shell command support in `_preprocess_code()` method
- Enhanced variable persistence and namespace management
- Added execution and variable history tracking

### Frontend (TypeScript/React)
- Updated WebSocket context to handle execution count and variables
- Modified cell execution hook to process Jupyter-like features
- Added UI components to display execution count and variable information

### WebSocket Communication
- Extended WebSocket messages to include execution count
- Added variable and history information to execution results
- Enhanced streaming output with execution context

## Usage Examples

### Basic Variable Persistence
```python
# Cell 1
data = [1, 2, 3, 4, 5]
total = sum(data)

# Cell 2 (can access data and total from previous cell)
average = total / len(data)
print(f"Average: {average}")
```

### Magic Commands Usage
```python
# Create some variables
x = 10
y = "hello"
z = [1, 2, 3]

# List variables
%who  # Output: x y z

# Detailed variable listing
%whos
# Output:
# Variable    Type         Size/Value
# -----------------------------------------------
# x           int          10
# y           str          hello
# z           list         3 items

# Show execution history
%history

# Time execution
%time sum([i**2 for i in range(1000)])

# Show matplotlib backend
%matplotlib
```

### Shell Commands
```python
# Execute shell commands
!ls -la
!echo "Current directory:"
!pwd
```

### Streaming Output
```python
import time
import pandas as pd

# Create a large dataset
data = []
for i in range(100):
    data.append({'index': i, 'value': i**2})
    if i % 10 == 0:
        print(f"Generated {i} rows...")
        time.sleep(1)  # Simulate processing time

df = pd.DataFrame(data)
print(f"Created DataFrame with {len(df)} rows")
```

## Testing

Test files are included to verify all features:
- `test_jupyter_features.py` - Comprehensive test of all features
- `test_streaming_with_count.py` - Streaming output with execution count

## API Response Structure

Execution results now include additional Jupyter-like information:

```json
{
  "execution_count": 1,
  "status": "ok",
  "output": "z = 30\n",
  "variables": {
    "x": 10,
    "y": 20,
    "z": 30
  },
  "execution_history": [
    {
      "execution_count": 1,
      "code": "x = 10\ny = 20\nz = x + y\nprint(f\"z = {z}\")",
      "timestamp": "2023-01-01 12:00:00"
    }
  ],
  "variable_history": {
    "1": {
      "x": 10,
      "y": 20,
      "z": 30
    }
  }
}
```

## Future Enhancements

Planned improvements:
- Additional magic commands (%matplotlib, %time, %timeit, etc.)
- Enhanced help system
- Cell magic commands (%%time, %%writefile, etc.)
- Better error visualization
- Export to Jupyter notebook format