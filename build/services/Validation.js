"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class Validation {
    constructor(schema, data) {
        this.schema = schema;
        this.data = data;
    }
    validate() {
        const { value, error: validationError } = this.schema.validate(this.data);
        const errorDetails = validationError ? lodash_1.first(validationError.details) : undefined;
        const errorMessage = errorDetails
            ? lodash_1.capitalize(errorDetails.message
                .split('"').join('')
                .split(/(?=[A-Z])/).join(' ')
                .split('[ref:').join('')
                .split(']').join(''))
            : undefined;
        const error = errorMessage ? { message: errorMessage } : undefined;
        return { value, error };
    }
}
exports.default = Validation;
