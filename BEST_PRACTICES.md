# Common Issues and Best Practices

This guide provides quick reference for common issues and best practices when working with these sample applications.

## Table of Contents
- [Authentication](#authentication)
- [Database Queries](#database-queries)
- [Error Handling](#error-handling)
- [Input Validation](#input-validation)
- [Performance](#performance)

## Authentication

### ✅ DO: Use Async Bcrypt
```typescript
// Good
const salt = await bcrypt.genSalt(10);
const hash = await bcrypt.hash(password, salt);
```

### ❌ DON'T: Use Sync Bcrypt
```typescript
// Bad - blocks event loop
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);
```

### ✅ DO: Use Correct Status Codes
```typescript
// Good
response.status(401).json({ error: 'Login Failed' }); // Authentication failure
response.status(400).json({ error: 'password is too short' }); // Validation error
```

### ❌ DON'T: Use Generic 500
```typescript
// Bad
response.status(500).json({ error: 'Login Failed' }); // Wrong status code
response.status(404).json({ error: 'user not found' }); // Should be 401
```

## Database Queries

### ✅ DO: Use Incremental Calculations
```typescript
// Good - O(1) calculation
const currentAverage = vehicle.averageReview || 0;
const currentCount = vehicle.numReviews || 0;
const newAverage = (currentAverage * currentCount + newRating) / (currentCount + 1);
```

### ❌ DON'T: Fetch All Records for Calculations
```typescript
// Bad - O(n) query grows with data
const allReviews = await Review.find({ vehicleId });
const average = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
```

### ✅ DO: Use Mongoose Query Sanitization
```typescript
// Good
const user = await User
  .findOne({ email: request.body.email })
  .setOptions({ sanitizeFilter: true });
```

### ❌ DON'T: Use Raw Query Objects
```typescript
// Bad - vulnerable to NoSQL injection
const user = await User.findOne(request.body);
```

## Error Handling

### ✅ DO: Handle Specific Errors
```typescript
// Good
try {
  fs.mkdirSync(path);
} catch (err) {
  if (err.code !== 'EEXIST') {
    console.error('Error creating directory:', err);
    throw err;
  }
  // Directory exists, that's fine
}
```

### ❌ DON'T: Swallow All Errors
```typescript
// Bad
try {
  fs.mkdirSync(path);
} catch (err) {
  // Silent failure - impossible to debug
}
```

### ✅ DO: Use Descriptive Error Messages
```typescript
// Good
response.status(400).json({ 
  error: 'Validation failed',
  details: 'Password must be at least 6 characters'
});
```

### ❌ DON'T: Expose Internal Details
```typescript
// Bad
response.status(500).json({ 
  error: err.stack // Leaks implementation details
});
```

## Input Validation

### ✅ DO: Validate Before Using
```typescript
// Good
if (!request.body || !request.body.password) {
  return response.status(400).json({ error: 'Password is required' });
}
if (request.body.password.length < 6) {
  return response.status(400).json({ error: 'Password too short' });
}
```

### ❌ DON'T: Assume Input Exists
```typescript
// Bad - crashes if password is undefined
if (request.body.password.length < 6) {
  return response.status(400).json({ error: 'Password too short' });
}
```

### ✅ DO: Validate Data Types
```typescript
// Good
const rating = parseInt(request.body.rating);
if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
  return response.status(400).json({ error: 'Rating must be 1-5' });
}
```

### ❌ DON'T: Trust Input Types
```typescript
// Bad - might be a string or object
vehicle.rating = request.body.rating;
```

## Performance

### ✅ DO: Use Indexes
```typescript
// Good
const schema = new mongoose.Schema({
  email: { type: String, required: true, index: true },
  createdAt: { type: Date, index: true }
});
```

### ✅ DO: Limit Query Results
```typescript
// Good
const photos = await Photo.find({ category: 'animal' }).limit(20);
```

### ❌ DON'T: Fetch Unbounded Results
```typescript
// Bad - could return millions of documents
const photos = await Photo.find({ category: 'animal' });
```

### ✅ DO: Use Lean Queries When Appropriate
```typescript
// Good - faster for read-only data
const users = await User.find().lean();
```

### ✅ DO: Use Projections
```typescript
// Good - only fetch needed fields
const users = await User.find().select('firstName lastName email');
```

## HTTP Status Codes Reference

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET, PUT, or POST |
| 201 | Created | Successfully created resource |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation errors, malformed input |
| 401 | Unauthorized | Authentication required or failed |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource conflict (e.g., duplicate) |
| 500 | Internal Server Error | Unexpected server errors |

## Mongoose Schema Best Practices

### ✅ DO: Use Built-in Validation
```typescript
// Good
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: 'Invalid email format'
    }
  }
});
```

### ✅ DO: Use Timestamps
```typescript
// Good
const schema = new mongoose.Schema({
  // fields
}, { timestamps: true }); // Adds createdAt and updatedAt
```

### ✅ DO: Use Virtuals for Computed Properties
```typescript
// Good
schema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});
```

## Environment Variables

### ✅ DO: Validate Required Variables
```typescript
// Good
const requiredEnvVars = ['DATA_API_URI', 'DATA_API_AUTH_USERNAME'];
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
}
```

### ✅ DO: Use Defaults Safely
```typescript
// Good
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';
```

### ❌ DON'T: Commit .env Files
```bash
# Good - in .gitignore
.env
.env.local
.env.*.local

# Keep only .env.example
.env.example
```

## Async/Await Best Practices

### ✅ DO: Use Try-Catch with Async/Await
```typescript
// Good
async function handler(req, res) {
  try {
    const result = await someAsyncOperation();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

### ✅ DO: Use Promise.all for Parallel Operations
```typescript
// Good - runs in parallel
const [users, posts, comments] = await Promise.all([
  User.find(),
  Post.find(),
  Comment.find()
]);
```

### ❌ DON'T: Use Sequential Awaits Unnecessarily
```typescript
// Bad - runs sequentially
const users = await User.find();
const posts = await Post.find();
const comments = await Comment.find();
```
