import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';
import authService from '../services/authService';

jest.mock('../services/authService');

describe('landing page', () => {
    test('Waits from whoami and renders an enter button', () => {
        let resolveHandle;
        authService.whoami.mockImplementation(
            () =>
                new Promise(resolve => {
                    resolveHandle = resolve;
                })
        );

        const { getByText, findByText } = render(<App />);

        // The whoami request is pending - app shows a loading screen.
        expect(getByText(/loading/i)).toBeInTheDocument();

        // Finalize the request. The app should transition to the landing page.
        resolveHandle({ user: { username: 'username' } });
        const enterButtonPromise = findByText(/enter the boon/i);
        return expect(enterButtonPromise).resolves.toBeInTheDocument();
    });
});
