import { ApiController } from '../../../shared/config/ApiController';
import { Body, Controller, Logger, Post, UseFilters } from '@nestjs/common';
import { OrderPrefixConstant } from '../../config/OrderPrefixConstant';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../../contexts/shared/infrastructure/auth/Auth';
import { OrderExceptionFilter } from '../../config/OrderExceptionFilter';
import { CreateOrderPostControllerResponse } from './CreateOrderPostControllerResponse';
import { CreateOrderPostControllerRequest } from './CreateOrderPostControllerRequest';
import { IUserDecorator, User } from '../../../../contexts/shared/infrastructure/auth/UserDecorator';
import { CreateOrderCommand } from '../../../../contexts/order/application/create/CreateOrderCommand';

@Controller(OrderPrefixConstant.PREFIX)
@ApiTags(OrderPrefixConstant.SWAGGER_TAG)
@ApiBearerAuth()
export class CreateOrderPostController extends ApiController {

    logger: Logger = new Logger(CreateOrderPostController.name);

  @Post()
  @Auth()
  @UseFilters(OrderExceptionFilter)
  @ApiAcceptedResponse({type: CreateOrderPostControllerResponse })
    async execute(
      @Body() body: CreateOrderPostControllerRequest,
      @User() user: IUserDecorator,
    ): Promise<CreateOrderPostControllerResponse> {
        this.logger.log(`[${this.execute.name}] INIT ::`);
        const response = new CreateOrderPostControllerResponse();
        await this.dispatch(new CreateOrderCommand(
            user.userId,
            Number(body.year),
            Number(body.campaign),
        ));
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return response;
    }
}