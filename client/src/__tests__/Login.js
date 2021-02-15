import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import App from '../App';
import services from '../services/realImpl';

jest.mock('../services/realImpl');

test('login screen', async () => {
    const { authService, sprintsService, projectsService, usersService } = services;

    authService.whoami.mockResolvedValue({ user: null });
    authService.login.mockResolvedValue({ user: { username: 'userA' } });
    sprintsService.getAll.mockResolvedValue([]);
    projectsService.getAll.mockResolvedValue([]);
    usersService.getAll.mockResolvedValue([]);

    const { getByText, getByLabelText, findByText } = render(<App />);

    // Landing page.
    await act(async () => fireEvent.click(await findByText(/enter the demo/i)));
    // Sprints view.
    await act(async () => fireEvent.click(await findByText(/login/i)));

    // Login form.
    await act(async () => fireEvent.change(await getByLabelText(/e-mail/i), { target: { value: 'some@email.com' } }));
    await act(async () => fireEvent.change(await getByLabelText(/password/i), { target: { value: 'password' } }));

    await act(async () => fireEvent.submit(await findByText(/log in/i)));

    expect(authService.login).toHaveBeenCalled();
});
