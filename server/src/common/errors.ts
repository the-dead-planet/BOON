interface RawObject {
    message: string;
    detail: string | null;
}

/**
 * Common class for errors that can arise while processing a user's request.
 * Handle translating a rich object into a HTTP form.
 */
export class BoonHttpError {
    public errorCode: number;
    public message: string;

    public constructor(errorCode: number, message: string) {
        this.errorCode = errorCode;
        this.message = message;
    }

    /**
     * Extra data to be sent to the user.
     * @returns 
     */
    public detail(): string | null {
        return null;
    }

    /**
     * Encodes self into a JSON-stringifiable raw object.
     * @returns 
     */
    public toRawObject(): RawObject {
        return {
            message: this.message,
            detail: this.detail(),
        };
    }
}

export class NotFoundError extends BoonHttpError {
    public fieldName: string;
    public value: string;

    public constructor(fieldName: string, value: string) {
        super(404, 'Not found');
        this.fieldName = fieldName;
        this.value = value;
    }

    public detail(): string | null {
        return `${this.fieldName}: ${this.value}`;
    }
}

export class UnauthenticatedError extends BoonHttpError {
    constructor() {
        super(401, 'Unauthenticated');
    }
}

/**
 * A generic class for any unspecified error kind.
 * If possible, prefer using specialized variants with more structured messages.
 */
export class InternalError extends BoonHttpError {
    public constructor(message: string) {
        super(500, message);
    }
}
