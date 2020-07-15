export const getValue = (obj: object, name: string) => {
    for (const [key, value] of Object.entries(obj || {})) {
        if (key === name) {
            return value;
        }
    }
}