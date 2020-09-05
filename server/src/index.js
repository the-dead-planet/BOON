// This script starts the server. It's responsible for connecting the app to
// the real world, i.e. setup a database connection, bind to a port and wait
// indefinitely.
//
// Note, that this file should be kept as simple as possible, as it is not
// covered by unit tests.

const app = require('./app');
const mongoose = require('mongoose');

// Connect to Mongo DB
const databaseUrl = process.env.DATABASEURL || 'mongodb://mongo:27017/boon';

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
