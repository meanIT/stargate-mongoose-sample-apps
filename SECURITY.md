# Security Policy

## Supported Versions

This repository contains sample applications for educational purposes. Use these samples as a reference for learning, but always follow production-ready security practices for real applications.

## Security Best Practices

### 1. Authentication & Password Security

- **Use async bcrypt operations**: Always use `bcrypt.hash()` and `bcrypt.genSalt()` (async) instead of their synchronous counterparts to avoid blocking the event loop
- **Password requirements**: Enforce minimum password length (6+ characters, preferably 8+)
- **Salt rounds**: Use at least 10 salt rounds for bcrypt (as shown in the samples)
- **Never log passwords**: Ensure passwords are never logged or exposed in error messages

### 2. Input Validation

- **Validate all inputs**: Always validate request body, params, and query parameters
- **Use sanitization**: The samples use `sanitizeFilter` option in Mongoose queries to prevent NoSQL injection
- **Type checking**: Check for null/undefined before accessing object properties

### 3. HTTP Status Codes

Use appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request (validation errors, malformed input)
- `401` - Unauthorized (authentication failures)
- `403` - Forbidden (authorization failures)
- `404` - Not Found
- `500` - Internal Server Error (unexpected errors only)

### 4. Error Handling

- **Don't expose stack traces**: Never send stack traces to clients in production
- **Log errors server-side**: Always log errors for debugging
- **Generic error messages**: Return generic error messages to clients to avoid leaking implementation details

### 5. Environment Variables

- **Never commit `.env` files**: All `.env` files are gitignored
- **Use `.env.example`**: Provide example files without sensitive data
- **Validate environment variables**: Check that required environment variables are set on startup

### 6. Dependencies

- **Keep dependencies updated**: Run `npm audit` regularly
- **Review security advisories**: Check for known vulnerabilities
- **Minimal dependencies**: Only include necessary packages

## Reporting a Vulnerability

If you discover a security vulnerability in these sample applications, please report it by:

1. **Do NOT** open a public issue
2. Contact the maintainers privately
3. Provide detailed information about the vulnerability
4. Allow time for the vulnerability to be addressed before public disclosure

## Sample-Specific Notes

These are **sample applications** designed for learning and demonstration purposes. Before using any code in production:

1. Add proper authentication middleware
2. Implement rate limiting
3. Add comprehensive input validation
4. Set up proper logging and monitoring
5. Use HTTPS in production
6. Implement CSRF protection for web applications
7. Add security headers (helmet.js for Express)
8. Set up proper session management
9. Implement proper error handling and logging
10. Review and update all dependencies
