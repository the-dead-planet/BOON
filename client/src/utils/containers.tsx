// Functions handling container manipulation.

// Merge multiple maps into one.
// Order is important - the rightmost item takes precedence, i.e. if a key is found in
// multiple items, its value from the rightmost map will be present in the result.
export const concatMaps = (maps: any) => {
    // Put all (key, value) pairs from `item` into `accumulator, in place.
    const mergeIntoAccumulator = (accumulator: any, item: any) => {
        for (let [k, v] of item) {
            accumulator.set(k, v);
        }
        return accumulator;
    };

    const emptyMap = new Map();
    return maps.reduce(mergeIntoAccumulator, emptyMap);
};
