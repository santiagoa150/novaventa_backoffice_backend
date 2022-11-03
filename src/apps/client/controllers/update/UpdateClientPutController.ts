import { ApiController } from '../../../shared/config/ApiController';
import { Body, Controller, Logger, Put, UseFilters } from '@nestjs/common';
import { ClientPrefixConstant } from '../../config/ClientPrefixConstant';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../../contexts/shared/infrastructure/auth/Auth';
import { ClientExceptionFilter } from '../../config/ClientExceptionFilter';
import { UpdateClientPutControllerResponse } from './UpdateClientPutControllerResponse';
import { UpdateClientPutControllerRequest } from './UpdateClientPutControllerRequest';
import { IUserDecorator, User } from '../../../../contexts/shared/infrastructure/auth/UserDecorator';
import { UpdateClientCommand } from '../../../../contexts/client/application/update/UpdateClientCommand';

@Controller(ClientPrefixConstant.PREFIX)
@ApiTags(ClientPrefixConstant.SWAGGER_TAG)
@ApiBearerAuth()
export class UpdateClientPutController extends ApiController {

    logger: Logger = new Logger(UpdateClientPutController.name);

  @Put('id')
  @Auth()
  @UseFilters(ClientExceptionFilter)
  @ApiAcceptedResponse({ type: UpdateClientPutControllerResponse })
    async execute(
      @Body() body: UpdateClientPutControllerRequest,
      @User() user: IUserDecorator,
    ): Promise<UpdateClientPutControllerResponse> {
        this.logger.log(`[${this.execute.name}] INIT ::`);
        const response = new UpdateClientPutControllerResponse();
        await this.dispatch(new UpdateClientCommand(
            user.userId,
            body.clientId,
            body.name,
            body.phone,
            body.description,
        ));
        this.logger.log(`[${this.execute.name}] FINISH ::`);
        return response;
    }
}