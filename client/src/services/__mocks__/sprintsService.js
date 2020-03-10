export let resolveGetAll, rejectGetAll;

// TODO - extract to a reusable testing/ module
// TODO - consider using the real implementation and mocking axios instead
const getAllPromiseHandle = new Promise((resolve, reject) => {
    resolveGetAll = resolve;
    rejectGetAll = reject;
});

export default {
    getAll: () => getAllPromiseHandle,
};
