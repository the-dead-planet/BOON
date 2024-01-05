import mongoose from 'mongoose';

// Connect to a temporary database.
const connect = () =>
    mongoose.connect(process.env.MONGO_URL ?? '', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });

const disconnect = () => mongoose.disconnect();

const eraseAllData = () => {
    const modelNames = mongoose.modelNames();
    return Promise.all(modelNames.map((name: string) => mongoose.model(name).deleteMany()));
};

// When invoked in a test, all underlying tests will start a new database
// connection before the test and close the connection afterwards.
// No data persists across connections.
const withFreshDbConnection = () => {
    beforeEach(() => {
        return connect();
    });

    afterEach(() => {
        return eraseAllData().then(disconnect);
    });
};

export { withFreshDbConnection };
