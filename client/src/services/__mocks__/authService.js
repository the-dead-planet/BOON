export let resolveWhoAmi, rejectWhoAmi;

const whoAmiPromiseHandle = new Promise((resolve, reject) => {
    resolveWhoAmi = resolve;
    rejectWhoAmi = reject;
});

export default {
    whoami: () => whoAmiPromiseHandle,
};
