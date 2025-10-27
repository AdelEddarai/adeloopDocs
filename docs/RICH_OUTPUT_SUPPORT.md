# Rich Output Support

This document explains how rich output is supported in the AdeloopFlow environment, similar to Jupyter notebooks.

## Overview

Rich output support allows displaying various data types in an enhanced visual format rather than plain text. This includes DataFrames, plots, images, and other complex data structures.

## Supported Output Types

### DataFrames
When you assign a pandas DataFrame to the `result` variable, it will be automatically displayed in a tabular format in the table view tab.

Example:
```python
import pandas as pd
data = {'Name': ['Alice', 'Bob', 'Charlie'], 'Age': [25, 30, 35]}
df = pd.DataFrame(data)
result = df  # This will be displayed as a table
```

### Plots and Images
Coming soon - support for matplotlib plots and image display.

## How It Works

1. When code is executed, the kernel checks if a variable named `result` exists in the namespace
2. If the `result` variable contains a supported data type (like a pandas DataFrame), it's formatted for rich display
3. The formatted data is sent through the WebSocket connection to the frontend
4. The frontend displays the data in the appropriate visualization format

## Technical Implementation

The rich output support is implemented across multiple components:

- **Backend**: The kernel service identifies and formats rich output data
- **WebSocket API**: Transmits formatted data to the frontend
- **Frontend**: Processes and displays the rich output in the appropriate format

## Usage Tips

1. Assign your final output to the `result` variable to trigger rich display
2. For DataFrames, they will automatically appear in the table tab
3. Make sure to import required libraries (like pandas) before using them