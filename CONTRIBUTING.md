# Contributing to Stargate Mongoose Sample Apps

Thank you for your interest in contributing to the Stargate Mongoose sample applications! This document provides guidelines for contributing to this repository.

## Code of Conduct

Please be respectful and constructive in all interactions. We aim to maintain a welcoming environment for all contributors.

## How to Contribute

### Reporting Issues

1. Check if the issue already exists
2. Use a clear and descriptive title
3. Provide detailed steps to reproduce
4. Include code samples if applicable
5. Specify which sample app is affected

### Suggesting Enhancements

1. Use a clear and descriptive title
2. Explain the use case and benefits
3. Provide examples if possible
4. Consider backward compatibility

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the coding standards below
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork
7. Open a Pull Request with a clear description

## Coding Standards

### JavaScript/TypeScript

- Use consistent indentation (2 spaces)
- Follow existing code style in each sample app
- Use meaningful variable and function names
- Add comments for complex logic
- Use async/await instead of callbacks
- Use `const` and `let`, avoid `var`

### Error Handling

- Always handle errors properly (no empty catch blocks)
- Use appropriate HTTP status codes:
  - `400` for validation errors
  - `401` for authentication failures
  - `404` for not found
  - `500` for server errors
- Include meaningful error messages
- Don't expose sensitive information in errors

### Security

- Never use synchronous bcrypt operations in production code
- Always validate and sanitize user input
- Use parameterized queries to prevent injection
- Don't commit secrets or credentials
- Follow security best practices in SECURITY.md

### Testing

- Write tests for new features
- Ensure existing tests pass
- Follow the testing patterns in each sample app
- Test both success and failure cases

### Documentation

- Update README.md if you change functionality
- Add JSDoc comments for functions when appropriate
- Update .env.example if you add environment variables
- Keep documentation clear and concise

## Sample App Structure

Each sample app should:
- Be self-contained in its own directory
- Include a detailed README.md
- Provide .env.example file
- Include appropriate tests
- Follow Mongoose best practices
- Demonstrate clear use cases

## Testing Your Changes

Before submitting:

1. Install dependencies: `npm install`
2. Run linter (if available): `npm run lint`
3. Run tests: `npm test`
4. Build (if applicable): `npm run build`
5. Test manually with local Stargate instance

## Commit Message Guidelines

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- First line should be a brief summary (50 chars or less)
- Reference issues and PRs when relevant

Examples:
```
Fix typo in error messages
Add async bcrypt implementation
Update authentication to use proper HTTP codes
```

## Questions?

If you have questions about contributing, please:
1. Check existing issues and discussions
2. Review the README.md and documentation
3. Open a new issue with your question

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
