declare global {
    namespace Express {
        interface User {
            username: string;
            _id?: number;
        }
    }
}
