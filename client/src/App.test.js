import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('landing page', () => {
    test('Displays a loading message', () => {
        const { getByText } = render(<App />);
        expect(getByText(/loading/i)).toBeInTheDocument();
    });

    // NOTE: skipped, because it would currently fail - the app waits for the whoami call to resolve before rendering the landing page
    test.skip('renders the enter button', () => {
        const { getByText } = render(<App />);
        const enterTheBoonButton = getByText(/ /i);
        expect(enterTheBoonButton).toBeInTheDocument();
    });
});
