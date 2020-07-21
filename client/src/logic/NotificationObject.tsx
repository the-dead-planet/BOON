// TODO - add factory methods to extract data from error messages.

// Function building a function that will generate the next number on every call.
const buildUniqueIdGenerator = (): (() => number) => {
    // `ctr` holds the genrator state. It's a private variable, accessible only
    // in the closure below.
    let ctr = 0;
    return () => {
        // Increment the state on every call, guaranteeing unique results.
        ctr += 1;
        return ctr;
    };
};

const idGenerator = buildUniqueIdGenerator();

export default class NotificationObject {
    id: string | number;
    message: string;

    // Convenience factory method, requiring just the message.
    // `id` is autogenerated and guaranteed to be unique.
    static make(message: string) {
        const id = idGenerator();
        return new NotificationObject(id, message);
    }

    constructor(id: string | number, message: string) {
        this.id = id;
        this.message = message;
    }
}
