// This script starts the server.
// It's responsible for connecting to the real world, i.e. setup a database connection,
// bind to a port and wait indefinitely, if need be.
//
// Note, that this file should be kept as simple as possible, as it is not
// covered by unit tests.
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import mongoose from 'mongoose';

// `app` should be the first project-related import,
// as it initializes mongoose.
// TODO: get rid of the side effect, initialize explicitly.
import app from './app';
import * as Seeds from './commands/seeds';
import { Application } from 'express';

// Default value when running outside of docker, i.e. on a local development workstation.
// When running inside docker, environment variables should define all parameters.
const LOCAL_DATABASE_URL = 'mongodb://localhost:27017/boon';

// Connect to Mongo DB
const databaseUrl = process.env.DATABASEURL || LOCAL_DATABASE_URL;
//const databaseUrl = process.env.DATABASEURL || 'mongodb://mongo:27017/boon'; // For docker

const PORT = process.env.PORT || 5000;

console.log(`Connecting to database:  ${databaseUrl}`);

mongoose.connect(databaseUrl);

// Parse command line arguments and execute the right command.
const parser = yargs(hideBin(process.argv))
    // The `*` bit means this is the default command.
    .command(['run', '*'], 'Start the app and wait indefinitely.', {}, (_argv) => {
        // Start listening and hang.
        // The Promise will not resolve until either `error` or `close` events occur.
        // See https://nodejs.org/api/net.html#net_event_close for event details.
        return new Promise((resolve, reject) => {
            app.listen(PORT, () => {
                console.log(`BOON server has started on port ${PORT}`);
            });
            app.on('error', (_parent: Application) => reject());
            app.on('close', (_parent: Application) => resolve());
        });
    })
    .command(
        'seed',
        'Fill the database with predefined data.',
        {
            password: { describe: 'Password for created user accounts.', required: true, type: 'string' },
        },
        async (argv) => {
            const { password } = argv;
            return await Seeds.populateDataBaseWithDemoContent(password);
        }
    );

(async () => {
    const argv = await parser.argv;
    await mongoose.disconnect();
    console.log(`Command returned ${argv}`);
})();
