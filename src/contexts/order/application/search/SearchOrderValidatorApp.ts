import { Order } from '../../domain/Order';
import { IOptionsApp } from '../../../shared/domain/interfaces/IOptionsApp';
import { Logger } from '@nestjs/common';
import { HttpErrorMessagesConstants } from '../../../shared/domain/constants/HttpErrorMessagesConstants';
import { OrderFoundException } from '../../domain/exception/OrderFoundException';
import { OrderNotFoundException } from '../../domain/exception/OrderNotFoundException';

export class SearchOrderValidatorApp {
  
    static readonly logger: Logger = new Logger(SearchOrderValidatorApp.name);
  
    public static async validate(order: Order, options?: IOptionsApp): Promise<void>{
        this.logger.log(`[${this.validate.name}] INIT ::`);
        if (order && options && options.throwExceptionIfExists){
            this.logger.error(`[${this.validate.name}] ERROR :: ${HttpErrorMessagesConstants.ORDER_FOUND}`);
            throw new OrderFoundException(HttpErrorMessagesConstants.ORDER_FOUND);
        }
        if(!order && options && options.throwExceptionIfNoExists){
            this.logger.error(`[${this.validate.name}] ERROR :: ${HttpErrorMessagesConstants.ORDER_NOT_FOUND}`);
            throw new OrderNotFoundException(HttpErrorMessagesConstants.ORDER_NOT_FOUND);
        }
        this.logger.log(`[${this.validate.name}] FINISH ::`);
    }
}