import { StringValueObject } from '../../shared/domain/value-object/StringValueObject';
import { HttpErrorMessagesConstants } from '../../shared/domain/constants/HttpErrorMessagesConstants';
import { OrderStatusConstants } from './OrderStatusConstants';
import { InvalidOrderStatusException } from './exception/InvalidOrderStatusException';

export class OrderStatus extends StringValueObject {

    constructor(value: string) {
        super(value);
        this.ensureIsValidParam(value);
    }

    ensureIsValidParam(value: string) {
        if (!(Object.values(OrderStatusConstants) as string[]).includes(value)) {
            throw new InvalidOrderStatusException(HttpErrorMessagesConstants.INVALID_ORDER_STATUS);
        }
    }
}