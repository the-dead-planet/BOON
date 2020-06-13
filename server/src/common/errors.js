// Common class for errors that can arise while processing a user's request.
// Handle translating a rich object into a HTTP form.
class BoonHttpError {
    constructor(errorCode, message) {
        this.errorCode = errorCode;
        this.message = message;
    }

    // Extra data to be sent to the user.
    detail() {
        return null;
    }

    // Encodes self into a JSON-stringifiable raw object.
    toRawObject() {
        return {
            message: this.message,
            detail: this.detail(),
        };
    }
}

class NotFoundError extends BoonHttpError {
    constructor(fieldName, value) {
        super(404, 'Not found');
        this.fieldName = fieldName;
        this.value = value;
    }

    detail() {
        return `${this.fieldName}: ${this.value}`;
    }
}

module.exports = {
    BoonHttpError,
    NotFoundError,
};
