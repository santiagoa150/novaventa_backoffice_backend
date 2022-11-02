import { HttpExceptionFilter } from './HttpExceptionFilter';
import {
    BadRequestException,
    ForbiddenException,
    HttpStatus,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import { HttpErrorCodesConstants } from '../../../contexts/shared/domain/constants/HttpErrorCodesConstants';

export abstract class GenericExceptionList extends HttpExceptionFilter {
    public readonly exceptions = [
        {
            instance: InternalServerErrorException,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            code: HttpErrorCodesConstants.INTERNAL_SERVER_ERROR,
        },
        {
            instance: UnauthorizedException,
            status: HttpStatus.UNAUTHORIZED,
            code: HttpErrorCodesConstants.UNAUTHORIZED,
        },
        {
            instance: ForbiddenException,
            status: HttpStatus.FORBIDDEN,
            code: HttpErrorCodesConstants.FORBIDDEN,
        },
        {
            instance: BadRequestException,
            status: HttpStatus.BAD_REQUEST,
            code: HttpErrorCodesConstants.BAD_REQUEST,
        },
    ];
}
