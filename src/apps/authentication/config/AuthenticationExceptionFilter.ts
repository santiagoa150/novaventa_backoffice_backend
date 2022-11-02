import { HttpException, HttpStatus } from '@nestjs/common';
import { ResolveStatusInterface } from '../../shared/config/ResolveStatusInterface';
import { GenericExceptionList } from '../../shared/config/GenericExceptionList';
import { HttpErrorCodesConstants } from '../../../contexts/shared/domain/constants/HttpErrorCodesConstants';
import {
    InactiveUserException
} from '../../../contexts/authentication/domain/exceptions/InactiveUserException';

export class AuthenticationExceptionFilter extends GenericExceptionList {
    resolveStatus(exception: HttpException): ResolveStatusInterface {
        const exceptions = [
            {
                instance: InactiveUserException,
                status: HttpStatus.UNAUTHORIZED,
                code: HttpErrorCodesConstants.UNAUTHORIZED,
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
