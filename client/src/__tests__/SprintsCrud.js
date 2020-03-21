import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import App from '../App';
import authService, { resolveWhoAmi } from '../services/authService';
import MockSprintsService from '../services/sprintsService';

jest.mock('../services/authService');
jest.mock('../services/sprintsService');

jest.setTimeout(10000);

describe('app', () => {
    test('Allows Sprint CRUD', async () => {
        const { container, getByLabelText, getByRole, findByText, findAllByText } = render(<App />);

        resolveWhoAmi({ user: { username: 'username', _id: 'userId' } });

        // Initial sprints state - empty.
        MockSprintsService.getAll.mockResolvedValue([]);

        MockSprintsService.add.mockImplementation(instance => {
            // Upon calling `add`, the service will add the freshly added instance to its list.
            MockSprintsService.getAll.mockResolvedValue([
                { ...instance, _id: 'abcd', likes: [], comments: [], author: { id: 'userId' } },
            ]);

            return Promise.resolve();
        });

        MockSprintsService.delete.mockImplementation(instance => {
            // Upon calling `delete`, the service will remove the instance from the list.
            MockSprintsService.getAll.mockResolvedValue([]);

            return Promise.resolve();
        });

        // Landing page.
        await act(async () => fireEvent.click(await findByText(/enter the boon/i)));

        // Sprints list. Initially empty.
        expect(MockSprintsService.getAll).toHaveBeenCalled();

        await act(async () => fireEvent.click(await findByText(/ADD SPRINT/i)));

        // Sprint form.
        await act(async () =>
            fireEvent.change(await getByLabelText(/sprint name/i), { target: { value: 'Some Title' } })
        );
        await act(async () =>
            fireEvent.change(await getByLabelText(/ruling the world/i), { target: { value: 'Some Body' } })
        );
        await act(async () => fireEvent.change(await getByLabelText(/number/i), { target: { value: 42 } }));
        await act(async () =>
            fireEvent.change(await getByLabelText(/start date/i), { target: { value: '2020-20-20' } })
        );
        await act(async () => fireEvent.change(await getByLabelText(/end date/i), { target: { value: '2020-20-21' } }));

        await act(async () => fireEvent.submit(await findByText(/submit/i)));

        expect(MockSprintsService.add).toHaveBeenCalled();

        // Sprints list. Contains the freshly added instance.
        expect(MockSprintsService.getAll).toHaveBeenCalled();

        await act(async () => fireEvent.click(await findByText(/Some Title/i)));
        await act(async () => fireEvent.click(await getByLabelText(/more/i)));
        await act(async () => fireEvent.click(await findByText(/Delete/i)));

        expect(MockSprintsService.delete).toHaveBeenCalled();
        // TODO - change the app's behaviour and refresh the displayed list after deletion.
        // Once done, update the test.
    });
});
