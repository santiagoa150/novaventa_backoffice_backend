import { Body, Controller, Logger, Post, UseFilters } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../../../contexts/shared/infrastructure/auth/Auth';
import { ClientPrefixConstant } from '../../config/ClientPrefixConstant';
import { ClientExceptionFilter } from '../../config/ClientExceptionFilter';
import { CreateClientPostControllerResponse } from './CreateClientPostControllerResponse';
import { CreateClientPostControllerRequest } from './CreateClientPostControllerRequest';
import { ApiController } from '../../../shared/config/ApiController';
import { IUserDecorator, User } from '../../../../contexts/shared/infrastructure/auth/UserDecorator';
import { CreateClientCommand } from '../../../../contexts/client/application/create/CreateClientCommand';

@Controller(ClientPrefixConstant.PREFIX)
@ApiTags(ClientPrefixConstant.SWAGGER_TAG)
@ApiBearerAuth()
export class CreateClientPostController extends ApiController {

    logger: Logger = new Logger(CreateClientPostController.name);

  @Post()
  @Auth()
  @UseFilters(ClientExceptionFilter)
  @ApiAcceptedResponse({ type: CreateClientPostControllerResponse })
    async execute(
    @Body() body: CreateClientPostControllerRequest,
    @User() user: IUserDecorator
    ): Promise<CreateClientPostControllerResponse> {
        const response = new CreateClientPostControllerResponse();
        await this.dispatch(new CreateClientCommand(
            user.userId,
            body.name,
            body.phone,
            body.description
        ));
        return response;
    }
}