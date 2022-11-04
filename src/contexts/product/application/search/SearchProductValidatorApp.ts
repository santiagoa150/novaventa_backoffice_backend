import { Logger } from '@nestjs/common';
import { Order } from '../../../order/domain/Order';
import { IOptionsApp } from '../../../shared/domain/interfaces/IOptionsApp';
import { HttpErrorMessagesConstants } from '../../../shared/domain/constants/HttpErrorMessagesConstants';
import { OrderFoundException } from '../../../order/domain/exception/OrderFoundException';
import { OrderNotFoundException } from '../../../order/domain/exception/OrderNotFoundException';
import { Product } from '../../domain/Product';
import { ProductFoundException } from '../../domain/exceptions/ProductFoundException';
import { ProductNotFoundException } from '../../domain/exceptions/ProductNotFoundException';

export class SearchProductValidatorApp{

    static readonly logger: Logger = new Logger(SearchProductValidatorApp.name);

    public static async validate(product: Product, options?: IOptionsApp): Promise<void>{
        this.logger.log(`[${this.validate.name}] INIT ::`);
        if (product && options && options.throwExceptionIfExists){
            this.logger.error(`[${this.validate.name}] ERROR :: ${HttpErrorMessagesConstants.PRODUCT_FOUND}`);
            throw new ProductFoundException(HttpErrorMessagesConstants.PRODUCT_FOUND);
        }
        if(!product && options && options.throwExceptionIfNoExists){
            this.logger.error(`[${this.validate.name}] ERROR :: ${HttpErrorMessagesConstants.PRODUCT_NOT_FOUND}`);
            throw new ProductNotFoundException(HttpErrorMessagesConstants.PRODUCT_NOT_FOUND);
        }
        this.logger.log(`[${this.validate.name}] FINISH ::`);
    }
}