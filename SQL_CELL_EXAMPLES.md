# SQL Cell Examples - Persistent Session

SQL cells now work like Python cells! Tables persist across cells in the same session.

## Example 1: Basic Table Creation and Querying

### Cell 1: Create a table
```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10,2)
);

INSERT INTO employees VALUES
(1, 'Alice Johnson', 'Engineering', 75000),
(2, 'Bob Smith', 'Sales', 65000),
(3, 'Charlie Brown', 'Engineering', 80000);
```

### Cell 2: Query the table (it persists!)
```sql
SELECT * FROM employees WHERE department = 'Engineering';
```

### Cell 3: Create another table
```sql
CREATE TABLE departments AS
SELECT DISTINCT department, COUNT(*) as employee_count
FROM employees
GROUP BY department;

SELECT * FROM departments;
```

### Cell 4: Join tables from previous cells
```sql
SELECT e.name, e.salary, d.employee_count
FROM employees e
JOIN departments d ON e.department = d.department
ORDER BY e.salary DESC;
```

## Example 2: Show All Available Tables

```sql
SHOW TABLES;
```

## Example 3: Get Table Schema

```sql
DESCRIBE employees;
```

## Example 4: Complex Analytics

### Cell 1: Create sales data
```sql
CREATE TABLE sales (
    sale_id INT,
    employee_id INT,
    amount DECIMAL(10,2),
    sale_date DATE
);

INSERT INTO sales VALUES
(1, 1, 5000, '2024-01-15'),
(2, 2, 3000, '2024-01-16'),
(3, 1, 7000, '2024-01-17'),
(4, 3, 4500, '2024-01-18');
```

### Cell 2: Analyze with window functions
```sql
SELECT 
    e.name,
    s.amount,
    s.sale_date,
    SUM(s.amount) OVER (PARTITION BY e.id ORDER BY s.sale_date) as running_total,
    AVG(s.amount) OVER (PARTITION BY e.id) as avg_sale
FROM sales s
JOIN employees e ON s.employee_id = e.id
ORDER BY e.name, s.sale_date;
```

## Important Notes:

1. **Tables persist** across cells in the same session
2. **Session lasts** until you restart the dev server
3. **Don't select datasets** in cells where you want to use tables from previous cells
4. **Selecting a dataset** will create new tables (might overwrite existing ones with same name)
5. **Mix with Python**: You can query DataFrames created in Python cells!

## Tips:

- Use `SHOW TABLES;` to see all available tables
- Use `DESCRIBE table_name;` to see table structure
- Tables are in-memory, so they're fast but don't persist after restart
- You can create as many tables as you want in a session
