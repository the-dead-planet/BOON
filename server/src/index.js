// This script starts the server. It's responsible for connecting the app to
// the real world, i.e. setup a database connection, bind to a port and wait
// indefinitely.
//
// Note, that this file should be kept as simple as possible, as it is not
// covered by unit tests.

const app = require('./app');
const mongoose = require('mongoose');

// Default value when running outside of docker, i.e. on a local development workstation.
// When running inside docker, environment variables should define all parameters.
const LOCAL_DATABASE_URL = 'mongodb://localhost:27017/boon';

// Connect to Mongo DB
const databaseUrl = process.env.DATABASEURL || LOCAL_DATABASE_URL;

console.log(`Connecting to database:  ${databaseUrl}`);

mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`BOON server has started on port ${PORT}`);
});
