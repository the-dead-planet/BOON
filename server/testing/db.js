const mongoose = require('mongoose');

// Connect to a temporary database.
const connect = () =>
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

const disconnect = () => mongoose.disconnect();

// When invoked in a test, all underlying tests will start a new database
// connection before the test and close the connection afterwards.
// TODO - erase all data in `afterEach`.
const withFreshDbConnection = () => {
    beforeEach(() => {
        return connect();
    });

    afterEach(() => {
        return disconnect();
    });
};

module.exports = { withFreshDbConnection };
