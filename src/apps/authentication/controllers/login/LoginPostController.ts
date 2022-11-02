import { ApiController } from '../../../shared/config/ApiController';
import { Body, Controller, Logger, Post, UseFilters, UseGuards } from '@nestjs/common';
import { AuthenticationPrefixConstant } from '../../config/AuthenticationPrefixConstant';
import { ApiAcceptedResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationExceptionFilter } from '../../config/AuthenticationExceptionFilter';
import { LoginPostControllerResponse } from './LoginPostControllerResponse';
import { LoginPostControllerRequest } from './LoginPostControllerRequest';
import { User } from '../../../../contexts/shared/infrastructure/auth/UserDecorator';
import { LocalAuthGuard } from '../../../../contexts/shared/infrastructure/auth/strategies/local/LocalAuthGuard';
import { BuildPayloadCommand } from '../../../../contexts/authentication/application/login/BuildPayloadCommand';

@Controller(AuthenticationPrefixConstant.PREFIX_LOGIN)
@ApiTags(AuthenticationPrefixConstant.SWAGGER_TAG)
export class LoginPostController extends ApiController {

    logger: Logger = new Logger(LoginPostController.name);

  @Post()
  @UseGuards(LocalAuthGuard)
  @UseFilters(AuthenticationExceptionFilter)
  @ApiAcceptedResponse({ type: LoginPostControllerResponse })
    async execute(
    @Body() body: LoginPostControllerRequest,
    @User() user: any
    ): Promise<LoginPostControllerResponse> {
        const response = new LoginPostControllerResponse();
        response.data = await this.dispatch(new BuildPayloadCommand(user));
        return response;
    }
}