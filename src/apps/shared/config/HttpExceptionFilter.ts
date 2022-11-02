import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResolveStatusInterface } from './ResolveStatusInterface';

@Catch()
export abstract class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {

        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const request = context.getRequest<Request>();
        const data: ResolveStatusInterface = this.resolveStatus(exception);
        const message = HttpExceptionFilter.resolveException(exception);
        response.status(data.status).json({
            success: false,
            status: data.status,
            code: data.code,
            message: message,
            timestamp: new Date().toISOString(),
            path: request.url
        });
    }

    public static resolveException(exception): string {
        if (typeof exception === 'object') {
            if (exception.response) {
                if (Array.isArray(exception.response.message)) {
                    return exception.response.message[0];
                }
                return exception.response.message;
            }
            return exception.message;
        }
        if (typeof exception === 'string') {
            return exception;
        }
    }

    abstract resolveStatus(exception: HttpException): ResolveStatusInterface;
}
