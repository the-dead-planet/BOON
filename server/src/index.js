// This script starts the server.
// It's responsible for connecting to the real world, i.e. setup a database connection,
// bind to a port and wait indefinitely, if need be.
//
// Note, that this file should be kept as simple as possible, as it is not
// covered by unit tests.
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const mongoose = require('mongoose');

// `app` should be the first project-related import,
// as it initializes mongoose.
// TODO: get rid of the side effect, initialize explicitly.
const app = require('./app');
const seed = require('./commands/seeds.js');

// Default value when running outside of docker, i.e. on a local development workstation.
// When running inside docker, environment variables should define all parameters.
const LOCAL_DATABASE_URL = 'mongodb://localhost:27017/boon';

// Connect to Mongo DB
const databaseUrl = process.env.DATABASEURL || 'mongodb://localhost:27017/boon';
//const databaseUrl = process.env.DATABASEURL || 'mongodb://mongo:27017/boon'; // For docker

const PORT = process.env.PORT || 5000;

console.log(`Connecting to database:  ${databaseUrl}`);

mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Parse command line arguments and execute the right command.
yargs(hideBin(process.argv))
    // The `*` bit means this is the default command.
    .command(['run', '*'], 'Start the app and wait indefinitely.', {}, (argv) => {
        // Start listening and hang.
        // The Promise will not resolve until either `error` or `close` events occur.
        // See https://nodejs.org/api/net.html#net_event_close for event details.
        return new Promise((resolve, reject) => {
            app.listen(PORT, () => {
                console.log(`BOON server has started on port ${PORT}`);
            });
            app.on('error', reject);
            app.on('close', resolve);
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
            return await seed(password);
        }
    )
    .onFinishCommand(async (result) => {
        await mongoose.disconnect();
        console.log(`Command returned ${result}`);
        return result;
    })
    .parse();
