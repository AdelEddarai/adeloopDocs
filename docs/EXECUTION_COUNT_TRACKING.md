# Execution Count Tracking

This document explains how execution count tracking works in the AdeloopFlow environment, similar to Jupyter notebooks.

## Overview

Execution count tracking provides a sequential numbering system for code cell executions. Each time a cell is executed, the execution count increments by one, helping users keep track of the order in which cells were run.

## How It Works

1. The kernel maintains an execution count that starts at 1
2. Each time a code cell is executed, the count is incremented
3. The current execution count is displayed in the cell's prompt area
4. The execution count is included in WebSocket messages for tracking purposes
5. The count resets when the kernel is restarted

## Technical Implementation

Execution count tracking is implemented in the kernel manager and Jupyter kernel:

- **Initialization**: The execution count starts at 1 when the kernel is initialized
- **Incrementing**: The count is incremented each time `execute_code` is called
- **Persistence**: The count is maintained throughout the kernel's lifetime
- **Reset**: The count resets to 1 when the kernel is restarted

## WebSocket Integration

The execution count is included in WebSocket messages sent from the backend to the frontend:

```json
{
  "execution_count": 5,
  "result": "output",
  ...
}
```

This allows the frontend to display the correct execution count for each cell.

## Usage Tips

1. The execution count helps track the order of cell executions
2. It's especially useful for debugging and understanding data flow
3. The count is independent for each kernel instance
4. Restarting the kernel resets the count to 1
5. The execution count is displayed in the cell's prompt area (e.g., `In [1]:`)