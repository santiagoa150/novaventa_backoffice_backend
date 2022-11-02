import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';
import { EmailNotValidException } from './exceptions/EmailNotValidException';
import { HttpErrorMessagesConstants } from '../../shared/domain/constants/HttpErrorMessagesConstants';

export class Email extends StringValueObject {
    constructor(value: string) {
        super(value);
    }

    private static ensureIsValidParam(value: string): void {
        const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (!regexp.test(value)) {
            throw new EmailNotValidException(HttpErrorMessagesConstants.EMAIL_NOT_VALID);
        }
    }
}