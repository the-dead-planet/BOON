import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import App from '../App';
import authService from '../services/authService';
import sprintsService from '../services/sprintsService';
import projectsService from '../services/projectsService';
import usersService from '../services/usersService';

jest.mock('../services/authService');
jest.mock('../services/sprintsService');
jest.mock('../services/projectsService');
jest.mock('../services/usersService');

jest.setTimeout(10000);

describe('app', () => {
    // CRUD is not implemented in the UI.
    // TODO: reintroduce buttons to create, update and delete sprints, then reenable this test.
    test.skip('Allows Sprint CRUD', async () => {
        // Data from those services is not required for the test to pass.
        // Provide a trivial implementation.
        projectsService.getAll.mockResolvedValue([]);
        usersService.getAll.mockResolvedValue([]);

        authService.whoami.mockResolvedValue({ user: { username: 'username', _id: 'userId' } });

        // Initial sprints state - empty.
        sprintsService.getAll.mockResolvedValue([]);

        sprintsService.add.mockImplementation((instance) => {
            // Upon calling `add`, the service will add the freshly added instance to its list.
            sprintsService.getAll.mockResolvedValue([
                { ...instance, _id: 'abcd', likes: [], comments: [], posts: [], author: { _id: 'userId' } },
            ]);

            return Promise.resolve();
        });

        sprintsService.delete.mockImplementation((instance) => {
            // Upon calling `delete`, the service will remove the instance from the list.
            sprintsService.getAll.mockResolvedValue([]);

            return Promise.resolve();
        });

        const { container, getByLabelText, getByRole, findByText, findAllByText } = render(<App />);

        // Landing page skipped for logged in users.

        await act(async () => fireEvent.click(await findByText(/new sprint/i)));

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

        expect(sprintsService.add).toHaveBeenCalled();

        // Sprints list. Contains the freshly added instance.
        expect(sprintsService.getAll).toHaveBeenCalled();

        await act(async () => fireEvent.click(await findByText(/Some Title/i)));

        // TODO - uncomment after clicking on a sprint leads to a detail page.
        /*
        await act(async () => fireEvent.click(await getByLabelText(/more/i)));
        */

        // TODO - uncomment after sprint deletion is reintroduced
        /*
        await act(async () => fireEvent.click(await findByText(/Delete/i)));

        expect(sprintsService.delete).toHaveBeenCalled();
        */
        // TODO - change the app's behaviour and refresh the displayed list after deletion.
        // Once done, update the test.
    });
});
