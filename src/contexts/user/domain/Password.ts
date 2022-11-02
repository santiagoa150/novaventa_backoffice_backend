import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';
import { HttpErrorMessagesConstants } from '../../shared/domain/constants/HttpErrorMessagesConstants';
import { PasswordNotValidException } from './exceptions/PasswordNotValidException';

export class Password extends StringValueObject {

    constructor(value: string) {
        super(value);
    }

    static ensureIsValidParam(value: string): void {
        const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!"#$%&'()*+,\-./:;<>?@[\]\\^_`{|}~¡´¿])\S{8,}$/;
        if (!value.match(regexp)) {
            throw new PasswordNotValidException(HttpErrorMessagesConstants.UNAUTHORIZED);
        }
    }
}
