// Functions handling container manipulation.

// Merge multiple maps into one.
// Order is important - the rightmost item takes precedence, i.e. if a key is found in
// multiple items, its value from the rightmost map will be present in the result.
const map = new Map();
export const concatMaps = (maps: typeof map[]) => {
    // Put all (key, value) pairs from `item` into `accumulator, in place.
    const emptyMap = new Map();
    return maps.reduce((acc, item) => {
        for (const [k, v] of item) {
            acc.set(k, v);
        }
        return acc;
    }, emptyMap);
};
