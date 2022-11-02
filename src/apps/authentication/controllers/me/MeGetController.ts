import { ApiController } from '../../../shared/config/ApiController';
import { Controller, Get, Logger, UseFilters } from '@nestjs/common';
import { AuthenticationPrefixConstant } from '../../config/AuthenticationPrefixConstant';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationExceptionFilter } from '../../config/AuthenticationExceptionFilter';
import { MeGetControllerResponse } from './MeGetControllerResponse';
import { Auth } from '../../../../contexts/shared/infrastructure/auth/Auth';
import { IUserDecorator, User } from '../../../../contexts/shared/infrastructure/auth/UserDecorator';
import { MeQuery } from '../../../../contexts/authentication/application/me/MeQuery';

@Controller(AuthenticationPrefixConstant.PREFIX_ME)
@ApiTags(AuthenticationPrefixConstant.SWAGGER_TAG)
@ApiBearerAuth()
export class MeGetController extends ApiController{
  
    logger: Logger = new Logger(MeGetController.name);

    @Get()
    @Auth()
    @UseFilters(AuthenticationExceptionFilter)
    @ApiAcceptedResponse({type: MeGetControllerResponse})
    async meGetController( @User() user: IUserDecorator): Promise<MeGetControllerResponse> {
        const response = new MeGetControllerResponse();
        const query = new MeQuery(user.email);
        response.data = await this.query(query);
        return response;
    } 
}