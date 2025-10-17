# Testing Guide - Theme Toggle Feature

## Overview

This test suite provides comprehensive coverage for the theme toggle feature added to the AI Todo List application. The suite includes **55 test cases** across **724 lines** of test code, covering both React component functionality and CSS styling validation.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Tests

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once (for CI/CD)
npm run test:run

# Run tests with UI interface
npm run test:ui
```

## Test Coverage Summary

- **Total Tests**: 55
- **App Component Tests**: 29
- **CSS Styling Tests**: 26
- **Total Lines of Test Code**: 724

## Files Created

1. **vitest.config.js** - Test configuration
2. **src/test/setup.js** - Test environment setup
3. **src/App.test.jsx** - Component tests (409 lines)
4. **src/styles.test.js** - CSS tests (315 lines)
5. **package.json** - Updated with dependencies
6. **TEST_DOCUMENTATION.md** - Detailed docs
7. **TEST_SUMMARY.md** - Quick reference
8. **TESTING_README.md** - This file

## What's Tested

### React Component (App.jsx)
- Theme toggle button rendering
- Theme state management
- Document attribute synchronization
- Integration with todo functionality
- Edge cases and error handling
- Accessibility features

### CSS Styling (styles.css)
- Dark theme variables (7 variables)
- Light theme variables (7 variables)
- Theme switching behavior
- Color format validation
- Variable consistency

## Running Specific Tests

```bash
# Run specific file
npx vitest src/App.test.jsx

# Run tests matching pattern
npx vitest -t "Theme Toggle"
npx vitest -t "Accessibility"
```

## Test Dependencies

- vitest: ^1.0.4
- @testing-library/react: ^14.1.2
- @testing-library/jest-dom: ^6.1.5
- @testing-library/user-event: ^14.5.1
- jsdom: ^23.0.1

## Documentation

- **TEST_DOCUMENTATION.md** - Comprehensive guide
- **TEST_SUMMARY.md** - Quick reference

---

**Note**: Run `npm install` first to install test dependencies.