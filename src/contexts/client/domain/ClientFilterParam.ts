import { ClientFilterParamConstants } from './ClientFilterParamConstants';
import { InvalidSearchParamException } from '../../shared/domain/exceptions/InvalidSearchParamException';
import { HttpErrorMessagesConstants } from '../../shared/domain/constants/HttpErrorMessagesConstants';
import { FilterValueObject } from '../../shared/domain/value-object/FilterValueObject';

export class ClientFilterParam extends FilterValueObject {
    constructor(value: string) {
        super(value);
        this.ensureIsValidParam(value);
    }

    ensureIsValidParam(value: string) {
        if (!(Object.values(ClientFilterParamConstants) as string[]).includes(value)) {
            throw new InvalidSearchParamException(HttpErrorMessagesConstants.INVALID_SEARCH_PARAM);
        }
    }
}
