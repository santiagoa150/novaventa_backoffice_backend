import { HttpException, HttpStatus } from '@nestjs/common';
import { ResolveStatusInterface } from '../../shared/config/ResolveStatusInterface';
import { GenericExceptionList } from '../../shared/config/GenericExceptionList';
import { HttpErrorCodesConstants } from '../../../contexts/shared/domain/constants/HttpErrorCodesConstants';
import { InvalidOrderStatusException } from '../../../contexts/order/domain/exception/InvalidOrderStatusException';
import { OrderNotCreatedException } from '../../../contexts/order/domain/exception/OrderNotCreatedException';
import { OrderFoundException } from '../../../contexts/order/domain/exception/OrderFoundException';
import { OrderNotFoundException } from '../../../contexts/order/domain/exception/OrderNotFoundException';

export class OrderExceptionFilter extends GenericExceptionList {
    resolveStatus(exception: HttpException): ResolveStatusInterface {
        const exceptions = [
            {
                instance: InvalidOrderStatusException,
                status: HttpStatus.BAD_REQUEST,
                code: HttpErrorCodesConstants.INVALID_ORDER_STATUS
            },
            {
                instance: OrderFoundException,
                status: HttpStatus.BAD_REQUEST,
                code: HttpErrorCodesConstants.ORDER_FOUND,
            },
            {
                instance: OrderNotCreatedException,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                code: HttpErrorCodesConstants.ORDER_NOT_CREATED,
            },
            {
                instance: OrderNotFoundException,
                status: HttpStatus.NOT_FOUND,
                code: HttpErrorCodesConstants.ORDER_NOT_FOUND,
            }
        ]
            .concat(this.exceptions);
        const exceptionFound = exceptions.find(e => exception instanceof e.instance);
        return {
            status: exceptionFound ? exceptionFound.status : HttpStatus.INTERNAL_SERVER_ERROR,
            code: exceptionFound ? exceptionFound.code : HttpErrorCodesConstants.INTERNAL_SERVER_ERROR
        };
    }
}
