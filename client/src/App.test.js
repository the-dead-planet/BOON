import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import authService, { resolveWhoAmi, rejectWhoAmi } from './services/authService';

jest.mock('./services/authService');

describe('landing page', () => {
    test('Waits from whoami and renders an enter button', () => {
        const { getByText, findByText } = render(<App />);

        // The whoami request is pending - app shows a loading screen.
        expect(getByText(/loading/i)).toBeInTheDocument();

        // Finalize the request. The app should transition to the landing page.
        resolveWhoAmi({ user: { username: 'username' } });
        const enterButtonPromise = findByText(/enter the boon/i);
        return expect(enterButtonPromise).resolves.toBeInTheDocument();
    });
});
