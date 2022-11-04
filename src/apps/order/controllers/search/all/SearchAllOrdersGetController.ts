import { ApiController } from '../../../../shared/config/ApiController';
import { OrderPrefixConstant } from '../../../config/OrderPrefixConstant';
import { Controller, Get, Logger, Query, UseFilters } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../../../contexts/shared/infrastructure/auth/Auth';
import { OrderExceptionFilter } from '../../../config/OrderExceptionFilter';
import { SearchAllOrdersGetControllerResponse } from './SearchAllOrdersGetControllerResponse';
import { SearchAllOrdersGetControllerRequest } from './SearchAllOrdersGetControllerRequest';
import { IUserDecorator, User } from '../../../../../contexts/shared/infrastructure/auth/UserDecorator';
import { SearchAllOrdersQuery } from '../../../../../contexts/order/application/search/all/SearchAllOrdersQuery';

@Controller(OrderPrefixConstant.PREFIX)
@ApiTags(OrderPrefixConstant.SWAGGER_TAG)
@ApiBearerAuth()
export class SearchAllOrdersGetController extends ApiController{
  
    logger: Logger = new Logger(SearchAllOrdersGetController.name);
  
  @Get('all')
  @Auth()
  @UseFilters(OrderExceptionFilter)
  @ApiAcceptedResponse({type: SearchAllOrdersGetControllerResponse})
    async execute(
      @Query() query: SearchAllOrdersGetControllerRequest,
      @User() user: IUserDecorator,
    ): Promise<SearchAllOrdersGetControllerResponse>{
        this.logger.log(`[${this.execute.name}] INIT ::`);
        const response = new SearchAllOrdersGetControllerResponse();
        response.data = await this.query(new SearchAllOrdersQuery(
            user.userId,
            Number(query.page),
            Number(query.limit),
        ));
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return response;
    }
}