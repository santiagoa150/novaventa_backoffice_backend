import { ApiController } from '../../../shared/config/ApiController';
import { Body, Controller, Logger, Post, UseFilters } from '@nestjs/common';
import { ProductPrefixConstant } from '../../config/ProductPrefixConstant';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../../contexts/shared/infrastructure/auth/Auth';
import { ProductExceptionFilter } from '../../config/ProductExceptionFilter';
import { CreateProductPostControllerResponse } from './CreateProductPostControllerResponse';
import { CreateProductPostControllerRequest } from './CreateProductPostControllerRequest';
import { IUserDecorator, User } from '../../../../contexts/shared/infrastructure/auth/UserDecorator';
import { CreateProductCommand } from '../../../../contexts/product/application/create/CreateProductCommand';
import { ClientExceptionFilter } from '../../../client/config/ClientExceptionFilter';
import { OrderExceptionFilter } from '../../../order/config/OrderExceptionFilter';

@Controller(ProductPrefixConstant.PREFIX)
@ApiTags(ProductPrefixConstant.SWAGGER_TAG)
@ApiBearerAuth()
export class CreateProductPostController extends ApiController {

    logger: Logger = new Logger(CreateProductPostController.name);

  @Post()
  @Auth()
  @UseFilters(ProductExceptionFilter, ClientExceptionFilter, OrderExceptionFilter)
  @ApiAcceptedResponse({ type: CreateProductPostControllerResponse })
    async execute(
    @Body() body: CreateProductPostControllerRequest,
    @User() user: IUserDecorator
    ): Promise<CreateProductPostControllerResponse> {
        this.logger.log(`[${this.execute.name}] INIT ::`);
        const response = new CreateProductPostControllerResponse();
        await this.dispatch(new CreateProductCommand(
            user.userId,
            body.clientId,
            body.orderId,
            body.name,
            body.catalogPrice,
            body.listPrice,
            body.quantity,
            body.code,
            body.imageUrl
        ));
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return response;
    }
}