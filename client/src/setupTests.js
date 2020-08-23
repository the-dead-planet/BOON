// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'jest-extended';
import 'intersection-observer';

// Mock some browser specific functions.
global.window.scrollTo = () => {};

// Extend jest with local matchers.
import { matchers } from './testing/matchers';
expect.extend(matchers);
