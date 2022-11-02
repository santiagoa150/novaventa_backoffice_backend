import { HttpException, HttpStatus } from '@nestjs/common';
import { ResolveStatusInterface } from '../../shared/config/ResolveStatusInterface';
import { GenericExceptionList } from '../../shared/config/GenericExceptionList';
import { HttpErrorCodesConstants } from '../../../contexts/shared/domain/constants/HttpErrorCodesConstants';

export class ClientExceptionFilter extends GenericExceptionList {
    resolveStatus(exception: HttpException): ResolveStatusInterface {
        const exceptions = []
            .concat(this.exceptions);
        const exceptionFound = exceptions.find(e => exception instanceof e.instance);
        return {
            status: exceptionFound ? exceptionFound.status : HttpStatus.INTERNAL_SERVER_ERROR,
            code: exceptionFound ? exceptionFound.code : HttpErrorCodesConstants.INTERNAL_SERVER_ERROR,
        };
    }
}
