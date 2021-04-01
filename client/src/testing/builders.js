// Builds a map from an object.
export const buildMap = (obj) => {
    const ret = new Map();
    Object.entries(obj).forEach(([k, v]) => {
        ret.set(k, v);
    });
    return ret;
};
