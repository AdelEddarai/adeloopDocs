# Jupyter-like Features Example

# 1. Variable Persistence
print("=== 1. Variable Persistence ===")
x = 10
y = 20
print(f"x = {x}, y = {y}")

# 2. Execution Count Tracking
print("\n=== 2. Execution Count Tracking ===")
print("Check the execution count in the output prefix")

# 3. Rich Output Support
print("\n=== 3. Rich Output Support ===")
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Create a DataFrame
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'Age': [25, 30, 35, 28],
    'City': ['New York', 'London', 'Tokyo', 'Paris']
})
print("DataFrame:")
print(df)

# Create a plot
plt.figure(figsize=(8, 6))
x = np.linspace(0, 10, 100)
y = np.sin(x)
plt.plot(x, y, label='sin(x)')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Sine Wave')
plt.legend()
plt.grid(True)
plt.show()

# 4. Magic Commands
print("\n=== 4. Magic Commands ===")
%who
%whos

# List directory contents
%ls

# Show current directory
%pwd

# Show execution history
%history

# 5. Shell Commands
print("\n=== 5. Shell Commands ===")
!echo "Hello from shell command"
!date /t  # Windows command, use 'date' on Unix/Linux

# 6. Time Execution
print("\n=== 6. Time Execution ===")
%time sum([i**2 for i in range(10000)])

# 7. Streaming Output
print("\n=== 7. Streaming Output ===")
import time
for i in range(1, 6):
    print(f"[{i}] Streaming output: {i}")
    time.sleep(1)

print("\n=== All Jupyter-like Features Demonstrated ===")