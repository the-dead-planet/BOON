// Utility function to login the `agent` (i.e. an object maintaining the
// connection with the server, mimicking a browser) using `user`'s data.
// Note, that this is a Higher Order Function (HOF) - it takes an argument
// (`agent`),and returns a function that takes one argument (`user`) that
// produces a result. It's done for convenience - the agent will be applied
// in the test description, while the second function will be used in test's body.
// The same behaviour could be implemented with `bind`.
const loginAgentAs = agent => async (email, password) => {
    await agent
        .post('/api/auth/login')
        .send(`email=${email}`)
        .send(`password=${password}`)
        .expect(200);
    return agent;
};

module.exports = {
    loginAgentAs,
};
