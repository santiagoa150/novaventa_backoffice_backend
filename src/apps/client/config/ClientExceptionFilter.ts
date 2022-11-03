import { HttpException, HttpStatus } from '@nestjs/common';
import { ResolveStatusInterface } from '../../shared/config/ResolveStatusInterface';
import { GenericExceptionList } from '../../shared/config/GenericExceptionList';
import { HttpErrorCodesConstants } from '../../../contexts/shared/domain/constants/HttpErrorCodesConstants';
import { ClientNotCreatedException } from '../../../contexts/client/domain/exceptions/ClientNotCreatedException';
import { ClientNotFoundException } from '../../../contexts/client/domain/exceptions/ClientNotFoundException';
import { ClientFoundException } from '../../../contexts/client/domain/exceptions/ClientFoundException';

export class ClientExceptionFilter extends GenericExceptionList {
    resolveStatus(exception: HttpException): ResolveStatusInterface {
        const exceptions = [
            {
                instance: ClientFoundException,
                status: HttpStatus.BAD_REQUEST,
                code: HttpErrorCodesConstants.CLIENT_FOUND,
            },
            {
                instance: ClientNotCreatedException,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                code: HttpErrorCodesConstants.CLIENT_NOT_CREATED
            },
            {
                instance: ClientNotFoundException,
                status: HttpStatus.NOT_FOUND,
                code: HttpErrorCodesConstants.CLIENT_NOT_FOUND,
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
