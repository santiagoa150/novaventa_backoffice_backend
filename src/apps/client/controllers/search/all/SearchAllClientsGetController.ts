import { ApiController } from '../../../../shared/config/ApiController';
import { Controller, Get, Logger, Query, UseFilters } from '@nestjs/common';
import { ClientPrefixConstant } from '../../../config/ClientPrefixConstant';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchAllClientsGetControllerResponse } from './SearchAllClientsGetControllerResponse';
import { Auth } from '../../../../../contexts/shared/infrastructure/auth/Auth';
import { ClientExceptionFilter } from '../../../config/ClientExceptionFilter';
import { SearchAllClientsGetControllerRequest } from './SearchAllClientsGetControllerRequest';
import { IUserDecorator, User } from '../../../../../contexts/shared/infrastructure/auth/UserDecorator';
import { SearchAllClientsQuery } from '../../../../../contexts/client/application/search/all/SearchAllClientsQuery';

@Controller(ClientPrefixConstant.PREFIX)
@ApiTags(ClientPrefixConstant.SWAGGER_TAG)
@ApiBearerAuth()
export class SearchAllClientsGetController extends ApiController {

    logger: Logger = new Logger(SearchAllClientsGetController.name);

    @Get('all')
    @Auth()
    @UseFilters(ClientExceptionFilter)
    @ApiAcceptedResponse({type: SearchAllClientsGetControllerResponse})
    async execute(
      @Query() query: SearchAllClientsGetControllerRequest,
      @User() user: IUserDecorator,
    ): Promise<SearchAllClientsGetControllerResponse>{
        this.logger.log(`[${this.execute.name}] INIT ::`);
        const response = new SearchAllClientsGetControllerResponse();
        response.data = await this.query(new SearchAllClientsQuery(
            user.userId,
            Number(query.page),
            Number(query.limit),
        ));
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return response;
    }
}