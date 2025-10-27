# 📊 Data Pipeline User Guide

## ✅ What's Fixed

### 1. **Backend Connection Status** 🟢
- **Green dot** appears in toolbar when Python backend is connected
- **Red dot** when disconnected
- Hover to see connection details and how to start backend
- Auto-checks every 10 seconds

### 2. **Print Output Display** 📝
- All `print()` statements now show in the code block
- Appears in a gray box below the code node
- Shows stdout/stderr from Python execution

### 3. **Variable Sharing** 🔗
- Variables created in each block are displayed in **purple boxes**
- Shows variable name, type (array/object/string/number), and count
- Click on next block to see **"Available Variables"** section
- Variables are **automatically injected** into your code

### 4. **Workspace Cell Import** 📂
- Click **"Import from Workspace"** button in toolbar
- 3-step process:
  1. Select Workspace
  2. Select Notebook
  3. Select Cells to import
- Import selected cells OR run all cells
- All variables from imported cells available in pipeline

---

## 🚀 How to Use Features

### **Using Concatenation Results in Python/SQL**

When you use a **Concat node**, the result is stored in the node's `resultData`. Here's how to use it:

#### Example Pipeline:
```
[Dataset 1] ──┐
              ├──> [Concat Node] ──> [Python Code Node]
[Dataset 2] ──┘
```

#### In the Python Code Node:
```python
import pandas as pd

# The concat result is automatically available as 'input_data'
df = pd.DataFrame(input_data)

# Now you can work with the concatenated data
print(f"Total rows after concat: {len(df)}")
print(df.head())

# Create new variables
total_sales = df['sales'].sum()
avg_price = df['price'].mean()

# These variables will be available in next blocks!
```

#### In SQL Code Node:
```sql
-- The concat result is available as 'input_data' table
SELECT 
  category,
  COUNT(*) as count,
  AVG(price) as avg_price
FROM input_data
GROUP BY category
ORDER BY count DESC
```

---

### **Variable Sharing Between Blocks**

#### Block 1 (Python):
```python
import pandas as pd

# Process data
df = pd.DataFrame(input_data)
filtered_df = df[df['value'] > 100]

# Create variables to share
threshold = 100
result_count = len(filtered_df)
top_items = filtered_df.head(10).to_dict('records')
```

**After execution, Block 1 shows:**
- 🟣 **Variables (3)**
  - `threshold` (number) - 100
  - `result_count` (number) - 45
  - `top_items` (array) - Array(10)

#### Block 2 (Connected to Block 1):
Click on Block 2 → Config panel shows:
```
⚡ Available Variables (3)
┌─────────────────────────────┐
│ number    threshold          │
│           100                │
│ [Copy]                       │
├─────────────────────────────┤
│ number    result_count       │
│           45                 │
│ [Copy]                       │
├─────────────────────────────┤
│ array     top_items          │
│           Array(10)          │
│ [Copy]                       │
└─────────────────────────────┘
💡 These variables are automatically available in your code
```

**In Block 2 code:**
```python
# Variables from Block 1 are automatically available!
print(f"Using threshold: {threshold}")
print(f"Previous result count: {result_count}")

# Use the variables
new_threshold = threshold * 1.5
filtered_again = [item for item in top_items if item['value'] > new_threshold]
```

---

### **Importing Workspace Cells**

#### Step-by-Step:

1. **Click "Import from Workspace"** button in pipeline toolbar

2. **Select Workspace** (e.g., "Sales Analysis")
   - Shows all your workspaces
   - Displays number of notebooks in each

3. **Select Notebook** (e.g., "Data Cleaning")
   - Shows all notebooks in the workspace
   - Click to load cells

4. **Select Cells**
   - Check boxes next to cells you want to import
   - Or click "Select All" for all code cells
   - Preview shows:
     - Language (python/sql)
     - Execution count
     - Code preview

5. **Choose Action:**
   - **"Run All Cells"** - Executes all cells in notebook, stores all variables
   - **"Import Selected (3)"** - Executes only selected cells

#### After Import:
All variables from imported cells are available in your pipeline!

**Example:**
If imported cell had:
```python
customer_data = load_customers()
revenue_threshold = 10000
```

These variables (`customer_data`, `revenue_threshold`) are now available in all pipeline blocks!

---

## 🎯 Complete Example: Sales Data Pipeline

### Pipeline Structure:
```
[Sales Dataset] ──┐
                  ├──> [Concat] ──> [Python: Clean] ──> [Python: Analyze] ──> [Output]
[Returns Dataset]─┘
```

### Step 1: Concat Node
- Combines Sales + Returns data
- Result: 1000 rows

### Step 2: Python Clean Block
```python
import pandas as pd

df = pd.DataFrame(input_data)

# Clean data
df = df.dropna()
df['date'] = pd.to_datetime(df['date'])

# Create variables for next block
clean_data = df.to_dict('records')
total_records = len(df)
date_range = f"{df['date'].min()} to {df['date'].max()}"

print(f"Cleaned {total_records} records")
print(f"Date range: {date_range}")
```

**Shows in block:**
- Print output: "Cleaned 950 records..."
- 🟣 Variables: `clean_data`, `total_records`, `date_range`

### Step 3: Python Analyze Block
```python
import pandas as pd

# Variables from previous block automatically available!
df = pd.DataFrame(clean_data)

print(f"Analyzing {total_records} records from {date_range}")

# Analysis
monthly_sales = df.groupby(df['date'].dt.month)['amount'].sum()
top_products = df.groupby('product')['amount'].sum().nlargest(10)

# Results
analysis_results = {
    'monthly_sales': monthly_sales.to_dict(),
    'top_products': top_products.to_dict()
}

print(f"Top product: {top_products.index[0]}")
```

**Shows in block:**
- Print output: "Analyzing 950 records..." and "Top product: Widget A"
- 🟣 Variables: `analysis_results`, `monthly_sales`, `top_products`

---

## 🔧 Backend Connection

### Check Status:
Look for badge in toolbar:
- 🟢 **Backend** - Connected and ready
- 🔴 **Offline** - Backend not running

### Start Backend:
```bash
cd backend
python main.py
```

Backend runs on `http://localhost:8000`

### Troubleshooting:
1. Check if port 8000 is available
2. Install backend dependencies: `pip install -r requirements.txt`
3. Check backend logs for errors
4. Hover over status badge for connection details

---

## 💡 Tips & Best Practices

### 1. **Variable Naming**
- Use descriptive names: `customer_count` not `c`
- Avoid Python keywords
- Use snake_case for consistency

### 2. **Data Flow**
- Each block receives `input_data` from connected nodes
- Create variables for data you want to share
- Use `print()` to debug and see intermediate results

### 3. **Performance**
- Concat large datasets early in pipeline
- Filter data as soon as possible
- Use SQL for aggregations when possible

### 4. **Debugging**
- Check print output in each block
- View variables in config panel
- Use ExecutionLogs (left sidebar) to see full execution history

### 5. **Reusability**
- Import common data cleaning cells from workspace
- Create reusable transform blocks
- Save successful pipelines for future use

---

## 📚 Node Types Reference

| Node Type | Purpose | Input | Output |
|-----------|---------|-------|--------|
| **Dataset** | Load data | None | Dataset rows |
| **Concat** | Combine datasets | Multiple datasets | Combined rows |
| **Join** | Merge datasets | 2 datasets | Joined rows |
| **Transform** | Filter/Select/Aggregate | Dataset | Transformed rows |
| **Code (Python)** | Custom Python logic | Dataset + Variables | Data + Variables |
| **Code (SQL)** | SQL queries | Dataset | Query results |
| **Output** | Final result | Dataset | Display in sheet |

---

## 🎨 UI Elements

### Node Status Colors:
- 🟡 **Yellow border** - Queued (waiting to execute)
- 🔵 **Blue gradient** - Executing (running now)
- 🟢 **Green glow** - Completed successfully
- 🔴 **Red glow** - Error occurred

### Variable Display:
- **Purple box** in node - Variables created by this block
- **Purple panel** in config - Variables available from previous blocks
- **Badge colors** - Type indicators (array/object/string/number)

---

## ❓ FAQ

**Q: Why don't I see variables from previous block?**
A: Make sure blocks are connected with an edge. Variables only flow through connections.

**Q: How do I use concat result in SQL?**
A: The concat result is available as `input_data` table. Use: `SELECT * FROM input_data`

**Q: Can I import cells from multiple notebooks?**
A: Yes! Import from one notebook, then import from another. Variables accumulate.

**Q: Why is print output not showing?**
A: Check backend connection status. Print only works when Python backend is running.

**Q: How do I clear variables?**
A: Click "Run Pipeline" button - this clears all variables and starts fresh.

---

## 🚀 Next Steps

1. ✅ Start your Python backend
2. ✅ Create a simple 2-block pipeline
3. ✅ Try importing workspace cells
4. ✅ Experiment with variable sharing
5. ✅ Build a complete data analysis pipeline!

**Happy Data Pipelining! 🎉**

