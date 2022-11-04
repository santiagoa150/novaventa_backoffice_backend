import { HttpException, HttpStatus } from '@nestjs/common';
import { ResolveStatusInterface } from '../../shared/config/ResolveStatusInterface';
import { GenericExceptionList } from '../../shared/config/GenericExceptionList';
import { HttpErrorCodesConstants } from '../../../contexts/shared/domain/constants/HttpErrorCodesConstants';
import { ProductNotCreatedException } from '../../../contexts/product/domain/exceptions/ProductNotCreatedException';
import { ProductNotFoundException } from '../../../contexts/product/domain/exceptions/ProductNotFoundException';
import { ProductFoundException } from '../../../contexts/product/domain/exceptions/ProductFoundException';
import { ProductNotUpdatedException } from '../../../contexts/product/domain/exceptions/ProductNotUpdatedException';

export class ProductExceptionFilter extends GenericExceptionList {
    resolveStatus(exception: HttpException): ResolveStatusInterface {
        const exceptions = [
            {
                instance: ProductFoundException,
                status: HttpStatus.BAD_REQUEST,
                code: HttpErrorCodesConstants.PRODUCT_FOUND,
            },
            {
                instance: ProductNotCreatedException,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                code: HttpErrorCodesConstants.PRODUCT_NOT_CREATED,
            },
            {
                instance: ProductNotFoundException,
                status: HttpStatus.NOT_FOUND,
                code: HttpErrorCodesConstants.PRODUCT_NOT_FOUND,
            },
            {
                instance: ProductNotUpdatedException,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                code: HttpErrorCodesConstants.PRODUCT_NOT_UPDATED,
            },
        ].concat(this.exceptions);
        const exceptionFound = exceptions.find(e => exception instanceof e.instance);
        return {
            status: exceptionFound ? exceptionFound.status : HttpStatus.INTERNAL_SERVER_ERROR,
            code: exceptionFound ? exceptionFound.code : HttpErrorCodesConstants.INTERNAL_SERVER_ERROR
        };
    }
}
