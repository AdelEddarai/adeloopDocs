# Redis Configuration

This document explains how to configure Redis for the HRatlas backend.

## Current Status

Redis is currently **disabled by default** to simplify local development. All functionality works with in-memory storage as a fallback.

## Enabling Redis

To enable Redis when you need it:

1. **Start Redis server**:
   ```bash
   redis-server
   ```

2. **Set environment variable**:
   ```bash
   # In your .env file or environment
   ENABLE_REDIS=true
   ```

3. **(Optional) Configure Redis URL**:
   ```bash
   # Default is redis://localhost:6379
   REDIS_URL=redis://your-redis-host:6379
   ```

## Benefits of Enabling Redis

When Redis is enabled, you get:

- **Persistent kernel sessions** across server restarts
- **Shared session state** in multi-server deployments
- **Better scalability** for high-concurrency scenarios
- **Enhanced reliability** for production environments

## When to Keep Redis Disabled

Keep Redis disabled when:

- Developing locally
- Testing basic functionality
- Running in resource-constrained environments
- You don't need persistent sessions

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `ENABLE_REDIS` | `false` | Enable/disable Redis integration |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection URL |

## Fallback Mechanism

When Redis is disabled or unavailable, the system automatically falls back to in-memory storage:

- Kernel session mappings are stored in memory
- All streaming functionality works as expected
- No persistent sessions across restarts
- Perfect for local development

## Troubleshooting

If you encounter Redis connection errors:

1. **Check if Redis server is running**:
   ```bash
   redis-cli ping
   ```

2. **Verify Redis URL configuration**:
   ```bash
   echo $REDIS_URL
   ```

3. **Temporarily disable Redis**:
   ```bash
   ENABLE_REDIS=false
   ```