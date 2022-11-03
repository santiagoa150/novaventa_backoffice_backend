import { HttpExceptionFilter } from './HttpExceptionFilter';
import {
    BadRequestException,
    ForbiddenException,
    HttpStatus,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import { HttpErrorCodesConstants } from '../../../contexts/shared/domain/constants/HttpErrorCodesConstants';
import { EmailNotValidException } from '../../../contexts/user/domain/exceptions/EmailNotValidException';
import { UserFoundException } from '../../../contexts/user/domain/exceptions/UserFoundException';
import { UserNotFoundException } from '../../../contexts/user/domain/exceptions/UserNotFoundException';
import {
    InvalidPaginationParamException
} from '../../../contexts/shared/domain/exceptions/InvalidPaginationParamException';
import { InvalidSearchParamException } from '../../../contexts/shared/domain/exceptions/InvalidSearchParamException';

export abstract class GenericExceptionList extends HttpExceptionFilter {
    public readonly exceptions = [
        {
            instance: BadRequestException,
            status: HttpStatus.BAD_REQUEST,
            code: HttpErrorCodesConstants.BAD_REQUEST
        },
        {
            instance: EmailNotValidException,
            status: HttpStatus.BAD_REQUEST,
            code: HttpErrorCodesConstants.EMAIL_NOT_VALID
        },
        {
            instance: ForbiddenException,
            status: HttpStatus.FORBIDDEN,
            code: HttpErrorCodesConstants.FORBIDDEN
        },
        {
            instance: InternalServerErrorException,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            code: HttpErrorCodesConstants.INTERNAL_SERVER_ERROR
        },
        {
            instance: InvalidPaginationParamException,
            status: HttpStatus.BAD_REQUEST,
            code: HttpErrorCodesConstants.INVALID_PAGINATION_PARAM,  
        },
        {
            instance: InvalidSearchParamException,
            status: HttpStatus.BAD_REQUEST,
            code: HttpErrorCodesConstants.INVALID_SEARCH_PARAM,
        },
        {
            instance: UnauthorizedException,
            status: HttpStatus.UNAUTHORIZED,
            code: HttpErrorCodesConstants.UNAUTHORIZED
        },
        {
            instance: UserFoundException,
            status: HttpStatus.BAD_REQUEST,
            code: HttpErrorCodesConstants.USER_FOUND
        },
        {
            instance: UserNotFoundException,
            status: HttpStatus.NOT_FOUND,
            code: HttpErrorCodesConstants.USER_NOT_FOUND
        }
    ];
}
