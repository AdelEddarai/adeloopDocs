# Dataset CSV Access Fix

## Problem
When users selected a dataset (e.g., "paie") in a cell and tried to use `pd.read_csv('paie.csv')`, they got:
```
FileNotFoundError: [Errno 2] No such file or directory: 'paie.csv'
```

## Root Cause
1. The backend was creating CSV files in the kernel's temp directory
2. However, Python's working directory was not set to the temp directory
3. When users called `pd.read_csv('paie.csv')`, Python looked in the wrong directory

## Solution Implemented

### Backend Changes (`backend/services/kernel/kernel_manager.py`)

#### 1. Updated `_prepare_datasets_for_kernel` function:
- **Changes working directory** to kernel temp directory before creating CSV files
- Creates **multiple CSV file versions** for flexibility:
  - Original name: `paie.csv`
  - Safe name: `paie.csv` (sanitized)
  - Numbered: `dataset1.csv`, `dataset2.csv`, etc.
- **Injects dataset as DataFrame** directly into namespace with multiple names:
  - Original safe name: `paie`
  - Numbered: `df1`, `df2`, etc.
  - First dataset also available as: `df`
- **Stores dataset info** in `_available_datasets` variable for debugging

#### 2. Updated `execute_code_with_kernel` function:
- **Saves original working directory** before execution
- **Changes to kernel temp directory** before executing code
- **Restores original directory** after execution (even on error)
- Ensures CSV files are accessible during code execution

## How It Works Now

### Method 1: Direct DataFrame Access (Recommended)
```python
# Dataset "paie" is automatically available as a DataFrame
print(paie.head())  # Works immediately
print(paie.shape)   # Works immediately

# Also available as:
print(df.head())    # First dataset
print(df1.head())   # First dataset (numbered)
```

### Method 2: CSV File Access
```python
# Now this works because working directory is set correctly
gh = pd.read_csv('paie.csv')
print(gh.head())

# Also works with numbered files
gh = pd.read_csv('dataset1.csv')
```

### Method 3: Check Available Datasets
```python
# See what datasets are available
print(_available_datasets)
# Output: [{'name': 'paie', 'variable': 'paie', 'csv_file': 'paie.csv', 'shape': (100, 5)}]
```

## Multiple Dataset Support

Users can select multiple datasets and access them all:

```python
# If user selects: "paie", "employees", "sales"

# Direct access
print(paie.head())
print(employees.head())
print(sales.head())

# Or numbered
print(df1.head())  # paie
print(df2.head())  # employees
print(df3.head())  # sales

# Or via CSV
data1 = pd.read_csv('paie.csv')
data2 = pd.read_csv('employees.csv')
data3 = pd.read_csv('sales.csv')
```

## Working Without Dataset Selection

Users can also work without selecting datasets:

```python
# Load from external sources
df = pd.read_csv('https://example.com/data.csv')

# Create data manually
df = pd.DataFrame({
    'A': [1, 2, 3],
    'B': [4, 5, 6]
})

# Load from local files (if accessible)
df = pd.read_csv('/path/to/file.csv')
```

## Benefits

1. ✅ **Flexible Access**: Users can access datasets as DataFrames or CSV files
2. ✅ **Multiple Names**: Datasets available with original name, safe name, and numbered
3. ✅ **No Selection Required**: Users can work without selecting datasets
4. ✅ **Multiple Datasets**: Support for selecting and using multiple datasets
5. ✅ **Backward Compatible**: Existing code continues to work
6. ✅ **Error Prevention**: Working directory properly managed
7. ✅ **Debugging Support**: `_available_datasets` variable shows what's available

## Testing

To test the fix:

1. **Select a dataset** named "paie" in a cell
2. **Run this code**:
```python
# Method 1: Direct access (recommended)
print("Direct access:")
print(paie.head())

# Method 2: CSV access
print("\nCSV access:")
gh = pd.read_csv('paie.csv')
print(gh.head())

# Method 3: Check available datasets
print("\nAvailable datasets:")
print(_available_datasets)
```

3. **All three methods should work** without errors

## Notes

- The working directory change is **temporary** and only affects the current execution
- Original working directory is **always restored** after execution
- CSV files are created in a **temporary directory** that's cleaned up when the kernel is reset
- This approach is **safe** and doesn't affect other parts of the system
