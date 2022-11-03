import {StringValueObject} from './StringValueObject';
import {InvalidPaginationParamException} from '../exceptions/InvalidPaginationParamException';
import { HttpErrorMessagesConstants } from '../constants/HttpErrorMessagesConstants';

export class PaginationParamObject extends StringValueObject {

    constructor(value: string) {
        super(value);
        this.ensureIsValidParam(value);
        this.ensureIsGreaterThanZero(value);
    }

    ensureIsValidParam(value: string) {
        if (isNaN(Number(value))) {
            throw new InvalidPaginationParamException(HttpErrorMessagesConstants.PAGINATION_PARAM_MUST_BE_NUMBER);
        }
    }

    ensureIsGreaterThanZero(value: string) {
        if (Number(value) <= 0) {
            throw new InvalidPaginationParamException(HttpErrorMessagesConstants.PAGINATION_PARAM_MUST_BE_GREATER_THAN_ZERO);
        }
    }
}
