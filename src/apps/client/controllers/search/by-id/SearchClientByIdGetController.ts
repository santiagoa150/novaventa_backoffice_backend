import { ApiController } from '../../../../shared/config/ApiController';
import { Controller, Get, Logger, Query, UseFilters } from '@nestjs/common';
import { ClientPrefixConstant } from '../../../config/ClientPrefixConstant';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientExceptionFilter } from '../../../config/ClientExceptionFilter';
import { Auth } from '../../../../../contexts/shared/infrastructure/auth/Auth';
import { SearchClientByIdGetControllerResponse } from './SearchClientByIdGetControllerResponse';
import { SearchClientByIdGetControllerRequest } from './SearchClientByIdGetControllerRequest';
import { IUserDecorator, User } from '../../../../../contexts/shared/infrastructure/auth/UserDecorator';
import { SearchClientByIdQuery } from '../../../../../contexts/client/application/search/by-id/SearchClientByIdQuery';

@Controller(ClientPrefixConstant.PREFIX)
@ApiTags(ClientPrefixConstant.SWAGGER_TAG)
@ApiBearerAuth()
export class SearchClientByIdGetController extends ApiController {

    logger: Logger = new Logger(SearchClientByIdGetController.name);

  @Get('id')
  @Auth()
  @UseFilters(ClientExceptionFilter)
  @ApiAcceptedResponse({ type: SearchClientByIdGetControllerResponse })
    async execute(
      @Query() query: SearchClientByIdGetControllerRequest,
      @User() user: IUserDecorator,
    ): Promise<SearchClientByIdGetControllerResponse> {
        this.logger.log(`[${this.execute.name}] INIT ::`);
        const response = new SearchClientByIdGetControllerResponse();
        response.data = await this.query(new SearchClientByIdQuery(
            user.userId,
            query.clientId,
        ));
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return response;
    }
}