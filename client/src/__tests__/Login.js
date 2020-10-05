import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import App from '../App';
import authService from '../services/authService';
import sprintsService from '../services/sprintsService';

jest.mock('../services/authService');
jest.mock('../services/sprintsService');

test('login screen', async () => {
    authService.whoami.mockResolvedValue({ user: null });
    authService.login.mockResolvedValue({ user: { username: 'userA' } });
    sprintsService.getAll.mockResolvedValue([]);

    const { getByText, getByLabelText, findByText } = render(<App />);

    // Landing page.
    await act(async () => fireEvent.click(await findByText(/enter the demo/i)));
    // Sprints view.
    await act(async () => fireEvent.click(await findByText(/login/i)));

    // Login form.
    await act(async () => fireEvent.change(await getByLabelText(/e-mail/i), { target: { value: 'some@email.com' } }));
    await act(async () => fireEvent.change(await getByLabelText(/password/i), { target: { value: 'password' } }));

    await act(async () => fireEvent.submit(await findByText(/submit/i)));

    expect(authService.login).toHaveBeenCalled();
});
