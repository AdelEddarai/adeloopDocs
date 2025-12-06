# Database Integration Setup

## Installation

```bash
# 1. Install database drivers
npm install pg mysql2
# MongoDB is already installed

# 2. Generate Prisma client (IMPORTANT!)
npx prisma generate
npx prisma db push
```

## How It Works

1. **Connect**: User enters DB credentials (PostgreSQL/MySQL/MongoDB)
2. **Select Table**: Browse and select table/collection
3. **Real-Time Queries**: All queries run directly on external DB
4. **No Data Storage**: Only connection metadata is saved (NOT passwords)

## Usage

1. Click "External DB" card
2. Enter credentials and test connection
3. Select table
4. Click "Connect"
5. Use in notebook cells - queries run in real-time on your external database

## Security

- ✅ Passwords NEVER stored
- ✅ Only metadata saved (host, port, database, table)
- ✅ User enters password each time they query
- ✅ Real-time queries - no data duplication

## Features

### ✅ What's Implemented

- **Database Support**: PostgreSQL, MySQL, MongoDB
- **Connection Testing**: Test credentials before loading data
- **Table/Collection Browsing**: View all available tables with row counts
- **Data Import**: Load up to 1000 rows per table
- **Saved Connections**: Store connection metadata (passwords NOT saved)
- **Security**: Only metadata stored, credentials never persisted

### 🔒 Security Features

- Passwords are NEVER stored in the database
- Users must re-enter credentials each time
- Connection timeouts (10 seconds)
- SQL injection prevention (table name sanitization)
- SSL/TLS support for all database types

## API Endpoints

### Test Connection
```
POST /api/external-sources/test
```
Tests database connectivity without saving credentials.

### Fetch Tables
```
POST /api/external-sources/tables
```
Returns list of tables/collections with row counts.

### Load Data
```
POST /api/external-sources/data
```
Fetches data from a specific table (max 1000 rows).

### Save Connection Metadata
```
POST /api/external-sources
```
Saves connection metadata (host, port, database, username).

### Get Saved Connections
```
GET /api/external-sources
```
Returns user's saved connection metadata.

## Usage in Notebook Cells

Once data is loaded from an external database, it's automatically saved as a dataset and can be used in notebook cells:

### Example Workflow

1. **Connect to Database**
   - User clicks "External DB" integration card
   - Selects database type (PostgreSQL, MySQL, or MongoDB)
   - Enters connection credentials
   - Tests connection ✅

2. **Browse and Load Data**
   - Views available tables/collections with row counts
   - Selects desired table (e.g., "users")
   - Loads up to 1000 rows
   - Data is automatically saved as a dataset

3. **Use in Notebook Cells**
   - Dataset appears in the dataset list with a database icon
   - External datasets are marked with a badge (e.g., "POSTGRESQL", "MYSQL", "MONGODB")
   - Select the dataset in any notebook cell
   - Analyze with Python, SQL, or JavaScript

### Python Analysis Example

```python
# The dataset is automatically available as 'df'
import pandas as pd
import matplotlib.pyplot as plt

# Analyze the data
print(df.head())
print(df.describe())

# Create visualizations
df['column_name'].value_counts().plot(kind='bar')
plt.title('Distribution')
plt.show()
```

### SQL Query Example

```sql
-- Query the imported data
SELECT column1, COUNT(*) as count
FROM df
WHERE column2 > 100
GROUP BY column1
ORDER BY count DESC
LIMIT 10;
```

### JavaScript Analysis Example

```javascript
// Access the data
console.log(data.length + ' rows loaded');

// Filter and transform
const filtered = data.filter(row => row.value > 100);
console.log('Filtered:', filtered.length);
```

## Database Connection Examples

### PostgreSQL
```json
{
  "type": "postgresql",
  "host": "localhost",
  "port": "5432",
  "database": "mydb",
  "username": "postgres",
  "password": "password",
  "ssl": false
}
```

### MySQL
```json
{
  "type": "mysql",
  "host": "localhost",
  "port": "3306",
  "database": "mydb",
  "username": "root",
  "password": "password",
  "ssl": false
}
```

### MongoDB
```json
{
  "type": "mongodb",
  "host": "localhost",
  "port": "27017",
  "database": "mydb",
  "username": "admin",
  "password": "password",
  "authSource": "admin",
  "ssl": false
}
```

## Troubleshooting

### Connection Fails

**Issue**: "Connection timeout" or "Connection refused"

**Solutions**:
- Check if database is running
- Verify firewall rules allow connections
- Ensure host/port are correct
- Check if database requires SSL

### Tables Not Loading

**Issue**: No tables appear after successful connection

**Solutions**:
- Verify user has permission to list tables
- Check schema/database name is correct
- For PostgreSQL, ensure tables are in 'public' schema

### Data Not Loading

**Issue**: Error when loading table data

**Solutions**:
- Verify user has SELECT permission
- Check table name is correct
- Ensure table has data
- Try reducing the limit (default 1000 rows)

## Best Practices

1. **Use Read-Only Users**: Create database users with only SELECT permissions
2. **Limit Data**: Default limit is 1000 rows to prevent memory issues
3. **Use SSL**: Enable SSL for production databases
4. **Test First**: Always test connection before loading data
5. **Save Metadata**: Save connection metadata for quick reconnection

## Next Steps

### For Users
- Connect your first database
- Import data into the notebook
- Start analyzing with Python or SQL

### For Developers
- Add more database types (Oracle, SQL Server, etc.)
- Implement query builder for custom data selection
- Add data preview before full import
- Implement scheduled data syncing
- Add connection pooling for better performance

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check the server logs
3. Verify database credentials
4. Ensure database is accessible from your server

## Files Created

- `app/api/external-sources/route.ts` - Main API for saving/loading connections
- `app/api/external-sources/test/route.ts` - Connection testing
- `app/api/external-sources/tables/route.ts` - Table/collection listing
- `app/api/external-sources/data/route.ts` - Data fetching
- `components/DataIngestion/DataEditorComponents/ExternalSourceDialog.tsx` - UI component (already existed)

## License

MIT
